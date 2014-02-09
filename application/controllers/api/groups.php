<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require(APPPATH.'/libraries/REST_Controller.php');

class Groups extends REST_Controller {
    
    function __construct() {
        parent::__construct();
        
        // Load configs
        $this->load->database();

        // Load models for playing with local data 
        $this->load->model('product');
        $this->load->model('channel');
        $this->load->model('version');
        $this->load->model('group');
        $this->load->model('query');
        $this->load->model('cycle');
        //$this->load->model('comment');

        // Load some helpers for convenience
        $this->load->helper('url');
        $this->load->helper('date');
        $this->load->helper('release_dash');
    }

    public function index_get() {
        echo time() * 1000;
    }

    public function index_post() {
        echo "OK";
    }

}
