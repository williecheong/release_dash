<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Main extends CI_Controller {

    function __construct() {
        parent::__construct();
        
        // Load configs
        $this->load->database();

        // Load models for playing with local data 
        $this->load->model('branch');
        $this->load->model('product');
        $this->load->model('query');

        // Load some helpers for convenience
        $this->load->helper('date');
    }
    
	public function index() {
        $this->load->view('dashboard_overview');
	}

	public function lost() {
		$this->load->view('templates/404_not_found');
	}

}