<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

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
        // Find branches that are currently active.

        // Foreach branch, 
        //  Retrieve the stored Qb queries.
        //  Replace soft timestamps to the deprecated/current time
        //  Append the Qb queries into the JSON object


        // Output the resulting JSON object into the view (DOM)
        $this->load->view('dashboard_overview');
	}
}