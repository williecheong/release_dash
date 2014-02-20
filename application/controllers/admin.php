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
        $source = "https://wiki.mozilla.org/Template:CURRENT_CYCLE";
        $content = file_get_contents( $source );
        if( $content === false ) {
            echo "Failed to access: " . $source;
            return;
        }

        preg_match("/<p>(.*?)<\/p>/s", $content, $match);
        $dates = explode( '-', trim($match[1]) );

        $start = date( 'Y-m-d H:i:s', strtotime($dates[0]) );
        $end   = date( 'Y-m-d H:i:s', strtotime($dates[1]) );

        return;
    }
}