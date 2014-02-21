<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Admin extends CI_Controller {

    function __construct() {
        parent::__construct();
        // Autoloaded Config, Helpers, Models 
        $this->load->model('administrative');
    }

    public function login() {
        echo 'Coming soon';
        return;
    }

    public function easy_qb() {
        $this->load->view('easy_qb');
    }

    public function update_cycle() {
        // Grab all of the HTML content from this source.
        $source = "https://wiki.mozilla.org/Template:CURRENT_CYCLE";
        $content = file_get_contents( $source );
        if( $content === false ) {
            echo 'Failed to access: '.$source;
            return;
        }

        // Extract the dates that we want and make it an array
        preg_match("/<p>(.*?)<\/p>/s", $content, $match);
        $dates = explode( '-', trim($match[1]) );

        // Assign formatted values to contextually appropriate variables
        // Retrieved end date represents the last day of cycle
        // +1 day to set timestamp to 12am of the next day
        $start = date( 'Y-m-d H:i:s', strtotime($dates[0]) );
        $end   = date( 'Y-m-d H:i:s', strtotime($dates[1] + "1 day") );

        // Try and retrieve this cycle from the DB
        // If it exists, there is no new cycle to insert
        $same_cycle = $this->cycle->retrieve( array( 'start' => $start,
                                                      'end'  => $end    ));
        if ( count($same_cycle) > 0 ) {
            echo 'Cycle ID = '.$same_cycle[0]->id;
            return;
        }

        // Corner case:
        // In event where ship date is delayed:
        $delayed_cycle = $this->cycle->retrieve( array( 'start'    => $start,
                                                        'end !='   => $end  ));
        if ( count($delayed_cycle) > 0 ) {
            $this->cycle->update( array( 'id' => $delayed_cycle[0]->id ), 
                                  array( 'end'=> $end  ));
            echo 'Delays in current cycle successfully updated';
            return;
        }
        
        // Find the previous cycle. The ID is needed
        // Also capture newly extracted cycle in the DB.
        $previous_cycle = $this->cycle->get_latest_cycle();
        $new_cycle_id = $this->cycle->create( array( 'start' => $start,
                                                     'end'   => $end  ));

        $previous_maps = $this->administrative->retrieve_map( array('cycle_id'=>$previous_cycle->id) );

        // Start looping through all products
        $products = $this->product->retrieve();
        foreach ( $products as $product ) {
            // Find previously active versions for this product, loop through
            // If version is B2G, check for cycle periods and bump/extend as needed.
            $versions = $this->version->get_active_by_product( $product->id, $previous_cycle->id );
            foreach ( $versions as $version ) {
                if ( $product->id == 3 ) { 
                    // Check if B2G version already has 2 mappings on this channel
                    $check_mappings = $this->administrative->retrieve_map( 
                                                                array( 'version_id' => $version->id,
                                                                       'channel_id' => $version->channel_id ));
                    if ( count($check_mappings) > 1 ) {
                        // End of cycle for B2G, do bump 
                        $this->_bump_channel_by_version( $version, $new_cycle_id, $product ); 
                    } else {
                        // Mid-cycle for B2G
                        // Map this version on this channel for another cycle
                        $map_id = $this->administrative->create_map( $version->id, $version->channel_id, $new_cycle_id );
                    }
                } else {    
                    // Regular firefox/fennec, just bump as usual
                    $this->_bump_channel_by_version( $version, $new_cycle_id, $product ); 
                }
            }
        }

        echo 'Cycle created successfully';
        return;
    }

    // Bumps a version up to it's next channel for the new cycle
    // Creates and maps latest version if this version was in first channel
    // Note: Version is deprecated by not mapping it to a new (current) cycle
    // Clarification: 
    //  Nothing is done if specified version is on the last channel
    //  Simple map is done if version is on an in between channel like Aurora and Beta
    //  Both bump this version AND create latest version if this version is on first channel
    private function _bump_channel_by_version( $version, $new_cycle_id, $product ) {
        // Get the channel details
        $channel = $this->channel->retrieve( array( 'id' => $version->channel_id ) );
        $channel = $channel[0];

        if ( $channel->next_channel != 0 ) {
            // This is not a channel that leads into version deprecation
            // Bump this version into the next channel for this new (current) cycle
            $map_id = $this->administrative->create_map( $version->id, $channel->next_channel, $new_cycle_id );
        } 

        if ( $channel->is_first != 0 ) { 
            // This is a channel that is the first in product line.
            // It will not be expected to have any existing versions entering.
            // A new version needs to board train on this channel. Create and map.
            $new_version_id = $this->administrative->make_new_version_for_product( $version, $product );
            $map_id = $this->administrative->create_map( $new_version_id, $channel->id, $new_cycle_id );
        }

        return true;   
    }
}