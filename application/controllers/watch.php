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
        $this->load->helper('url');
        $this->load->helper('date');
        $this->load->helper('release_dash');
    }
    
    public function single( $product_tag = '', $version_tag = '' ) {
        
        // Validate Product and Version 
        // Return lost page if either are not found in the DB
        // If all is well, we have 2 objects for product and version
        $product = $this->product->retrieve( array( 'tag' => $product_tag ) );
        if ( empty($product) ) {
            $this->load->view('templates/404_not_found');
            return; 
        } else {
            $product = $product[0];    
        }

        $by_version_tag = array( 
                'tag' => $version_tag, 
                'product_id' => $product->id );
        $version = $this->version->retrieve( $by_version_tag );
        if ( empty($version) ) {
            $this->load->view('templates/404_not_found'); 
            return;
        } else {
            $version = $version[0];
        }
        // OK. Product and version found.
        // $product and $version are available now

        // Initializing a main data variable before we begin
        $data = array();
        $data[$version->tag]['title'] = $version->title;
                
        // Now retrieve the stored Qb queries.
        $by_version = array( 'version_id' => $version->id );
        $queries = $this->query->retrieve( $by_version );
        
        foreach ( $queries as $query ) {
            //  Replace soft timestamps with timestamp of version deprecation
            $transformed_query = replace_soft_timestamps($query->query_qb, $version->deprecate);

            //  Append the Qb queries and other meta-data into $data
            $data[$version->tag]['queries'][$query->tag]['title']    = $query->title;
            $data[$version->tag]['queries'][$query->tag]['qb_query'] = $transformed_query;
            $data[$version->tag]['queries'][$query->tag]['is_plot']  = $query->is_plot;
            $data[$version->tag]['queries'][$query->tag]['is_number']= $query->is_number;
        }

        $this->load->view('watch_single', array('data' => $data) );   

    }

}