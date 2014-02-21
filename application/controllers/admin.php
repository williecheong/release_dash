<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Admin extends CI_Controller {

    function __construct() {
        parent::__construct();
        // Autoloaded Config, Helpers, Models 
        $this->load->model('administrative');
    }

    public function index() {
        $this->load->view('templates/404_not_found');
    }

    public function login() {
        echo 'Coming soon';
        return;
    }

    public function update_cycle() {
        // Grab all of the HTML content from this source.
        $source = "https://wiki.mozilla.org/Template:CURRENT_CYCLE";
        $content = file_get_contents( $source );
        if( $content === false ) {
            $data = array( 'message' => 'Failed to access: '.$source );
            $this->load->view('update_cycle', $data);
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
        $check_cycle = $this->cycle->retrieve( array( 'start' => $start,
                                                      'end'   => $end    ) );
        if ( count($check_cycle) > 0 ) {
            echo 'Cycle already exists (ID = '.$check_cycle[0]->id.').';
            return;
        }

        // Corner case:
        // In event where ship date is delayed:
        $check_cycle = $this->cycle->retrieve( array( 'start'    => $start,
                                                      'end !='   => $end    ) );
        if ( count($check_cycle) > 0 ) {
            $this->cycle->update( array( 'id' => $check_cycle[0]->id ), 
                                  array( 'end'=> $end )                 );
            echo 'Changes in current cycle successfully updated.';
            return;
        }

        // This new cycle is not captured in DB. Capture it
        $cycle_id = $this->cycle->create( array( 'start' => $start,
                                                 'end'   => $end    ) );
        
        // New cycle now exists. 
        // Find the previous cycle. The ID is needed
        // Using the version_channel_cycle that were active in the previous cycle.
        $previous_cycle = $this->cycle->retrieve( array( 'end' => $start ) );

        // Start looping through all products
        $products = $this->product->retrieve();
        foreach ( $products as $product ) {
            //  Find versions that are previously active for this product
            $versions = $this->version->get_active_by_product( $product->id, $previous_cycle[0]->id );
            
            foreach ( $versions as $version ) {
                if ( $product->id == 3 ) { 
                    // Check to see if this version already has 2 mappings on this channel
                    $check_mappings = $this->administrative->retrieve_map( 
                                                                array( 'version_id' => $version->id,
                                                                       'channel_id' => $version->channel_id ));
                    if ( count($check_mappings) > 1 ) {
                        // End of cycle for B2G, bump 
                        $this->_bump_channel( $product, $version, $cycle_id ); 
                    } else {
                        // Mid-cycle, extend this version on this channel for another cycle
                        $map_id = $this->administrative->create_map( $version->id, $version->channel_id, $cycle_id );
                    }
                } else {    
                    // Regular firefox/fennec
                    $this->_bump_channel( $product, $version, $cycle_id ); 
                }
            }
        }

        echo 'Cycle updated successfully.';
        return;
    }

    private function _bump_channel( $product, $version, $cycle_id ) {
        // Get the channel details
        $channel = $this->channel->retrieve( array( 'id' => $version->channel_id ) );
        $channel = $channel[0];

        if ( $channel->next_channel != 0 ) {
            // Bump this version into the next channel for current cycle
            $map_id = $this->administrative->create_map( $version->id, $channel->next_channel, $cycle_id );
        } 

        if ( $channel->is_first != 0 ) { 
            // A new version needs to board train on this channel. Create and map.
            $new_version_id = $this->administrative->make_new_version_for_product( $product, $version );
            $map_id = $this->administrative->create_map( $new_version_id, $channel->id, $cycle_id );
        }

        return true;   
    }
}