<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Overview extends CI_Controller {

    function __construct() {
        parent::__construct();
        // Autoloaded Config, Helpers, Models 
    }
    
	public function index() {
        // Initialize a data array that becomes coreData JSON
        // Stores all relevant details for product and version
        $data = array();

        //  Find a list of all products
        $products = $this->product->retrieve();
        foreach ( $products as $product ) {
            // Store a pretty title for this product
            $data[$product->tag]['title'] = $product->title;
            $data[$product->tag]['versions'] = array();

            //  Find versions that are currently active for this product
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