<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Overview extends CI_Controller {

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
                $data[$product->tag]['versions'][$version->tag]['queries'] = array();

                //  Retrieve the stored Qb queries.
                $by_version = array( 'version_id' => $version->id );
                $queries = $this->query->retrieve( $by_version );

                foreach ( $queries as $query ) {
                    //  Replace soft timestamps with timestamp of version deprecation
                    $transformed_query = replace_soft_timestamps($query->query_qb, $version->deprecate);

                    //  Append the Qb queries and other meta-data into $data
                    $data[$product->tag]['versions'][$version->tag]['queries'][$query->tag]['title']    = $query->title;
                    $data[$product->tag]['versions'][$version->tag]['queries'][$query->tag]['qb_query'] = $transformed_query;
                    $data[$product->tag]['versions'][$version->tag]['queries'][$query->tag]['is_plot']  = $query->is_plot;
                    $data[$product->tag]['versions'][$version->tag]['queries'][$query->tag]['is_number']= $query->is_number;
                }
            }
        }
      
        // Send the resulting data array into the view
        $this->load->view('dashboard_overview', array('data' => $data) );
	}

    public function single( $product='', $version='' ){
        echo $product . '<br>';
        echo $version;
    }
}