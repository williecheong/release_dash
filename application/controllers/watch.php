<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Watch extends CI_Controller {

    function __construct() {
        parent::__construct();
        
        // Load configs
        $this->load->database();

        // Load models for playing with local data 
        $this->load->model('product');
        $this->load->model('version');
        $this->load->model('query');

        // Load some helpers for convenience
        $this->load->helper('date');
        $this->load->helper('release_dash');
    }
    
    public function single( $product = '', $version = '' ) {
        echo $product . '<br>';
        echo $version;
    }
}