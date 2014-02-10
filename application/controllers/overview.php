<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Overview extends CI_Controller {

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
    
	public function index() {
        // Initialize a data array
        // That will store ALL of the goods.
        $data = array();

        //  Find a list of all products
        $products = $this->product->retrieve();
        
        foreach ( $products as $product ) {
            // Store a pretty title for this product
            $data[$product->tag]['title'] = $product->title;
            $data[$product->tag]['versions'] = array();

            //  Find versions that are currently active
            $versions = $this->version->get_actives_by_product( $product->id );

            foreach ( $versions as $version ) {
                // Store a pretty title for this version
                $data[$product->tag]['versions'][$version->tag]['title'] = $version->title;
            }
        }
      
        // Send the resulting data array into the view
        $this->load->view('overview', array('data' => $data) );
	}
}