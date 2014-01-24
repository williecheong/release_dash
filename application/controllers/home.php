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
            $data[$product->key]['title'] = $product->title;

            //  Find branches that are currently active
            $by_product = array( 'product_id' => $product->id );
            $branches = $this->branch->retrieve( $by_product );
            
            foreach ( $branches as $branch ) {
                // Store a pretty title for this branch
                $data[$product->key][$branch->key]['title'] = $branch->title;

                //  Retrieve the stored Qb queries.
                $by_branch = array( 'branch_id' => $branch->id );
                $queries = $this->query->retrieve( $by_branch );

                foreach ( $queries as $query ) {
                    //  Replace soft timestamps with current time
                    //  Append the Qb queries and other meta-data into $data
                    $data[$product->key][$branch->key][$query->key]['title']    = $query->title;
                    $data[$product->key][$branch->key][$query->key]['qb_query'] = $query->query_qb;
                    $data[$product->key][$branch->key][$query->key]['is_plot']  = $query->is_plot;
                    $data[$product->key][$branch->key][$query->key]['is_number']= $query->is_number;
                }
            }
        }

        // Send the resulting data array into the view
        $this->load->view('dashboard_overview', array('data' => $data) );
	}

}