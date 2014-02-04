<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Overview extends CI_Controller {

    function __construct() {
        parent::__construct();
        
        // Load configs
        $this->load->database();

        // Load models for playing with local data 
        $this->load->model('product');
        $this->load->model('version');
        $this->load->model('group');
        $this->load->model('query');
        $this->load->model('comment');

        // Load some helpers for convenience
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
            $by_product = array( 'product_id' => $product->id );
            $versions = $this->version->retrieve_actives( $by_product );
            
            foreach ( $versions as $version ) {
                // Store a pretty title for this version
                $data[$product->tag]['versions'][$version->tag]['title'] = $version->title;
                
                // To be implemented: 
                // Retrieve and set comments for this version
                $by_version = array( 'entity' => 'version',
                                     'entity_id' => $version->id );
                $comments = $this->comment->retrieve( $by_version );

                foreach ( $comments as $key => $comment ) {
                    $data[$product->tag]['versions'][$version->tag]['comments'][$key]['comment'] = $comment->comment;
                    $data[$product->tag]['versions'][$version->tag]['comments'][$key]['comment'] = $comment->created_on; 
                }
            }
        }
      
        // Send the resulting data array into the view
        $this->load->view('overview', array('data' => $data) );
	}
}