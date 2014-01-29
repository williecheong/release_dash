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
            $data[$product->tag]['title'] = $product->title;
            $data[$product->tag]['branches'] = array();

            //  Find branches that are currently active
            $by_product = array( 'product_id' => $product->id );
            $branches = $this->branch->retrieve_actives( $by_product );
            

            foreach ( $branches as $branch ) {
                // Store a pretty title for this branch
                $data[$product->tag]['branches'][$branch->tag]['title'] = $branch->title;
                $data[$product->tag]['branches'][$branch->tag]['queries'] = array();

                //  Retrieve the stored Qb queries.
                $by_branch = array( 'branch_id' => $branch->id );
                $queries = $this->query->retrieve( $by_branch );

                foreach ( $queries as $query ) {
                    //  Replace soft timestamps with current time
                    $transformed_query = replace_soft_timestamps($query->query_qb);

                    //  Append the Qb queries and other meta-data into $data
                    $data[$product->tag]['branches'][$branch->tag]['queries'][$query->tag]['title']    = $query->title;
                    $data[$product->tag]['branches'][$branch->tag]['queries'][$query->tag]['qb_query'] = $transformed_query;
                    $data[$product->tag]['branches'][$branch->tag]['queries'][$query->tag]['is_plot']  = $query->is_plot;
                    $data[$product->tag]['branches'][$branch->tag]['queries'][$query->tag]['is_number']= $query->is_number;
                }
            }
        }
      
        // Send the resulting data array into the view
        $this->load->view('dashboard_overview', array('data' => $data) );
	}

}