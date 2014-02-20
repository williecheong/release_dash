<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Admin extends CI_Controller {

    function __construct() {
        parent::__construct();
        // Autoloaded Config, Helpers, Models 
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
            echo "Failed to access: " . $source;
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
        $conditions = array( 'start' => $start,
                             'end'   => $end    );
        $check_cycle = $this->cycle->retrieve( $conditions );
        if ( count($check_cycle) > 0 ) {
            echo "Cycle already exists (ID = ".$check_cycle[0]->id.").";
            return;
        }

        // This cycle is not captured in DB. Capture it
        $cycle_id = $this->cycle->create( $conditions );

        return;
    }
}