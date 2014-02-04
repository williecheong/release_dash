<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Watch extends CI_Controller {

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
        $data['title'] = $version->title;
        $data['query_groups'] = array();

        // Now retrieve the groups of Qb queries.
        $by_version = array( 'version_id' => $version->id );
        $groups = $this->group->retrieve( $by_version );
        
        foreach ( $groups as $group ) {
            $data['query_groups'][$group->tag]['title'] = $group->title;
            $data['query_groups'][$group->tag]['is_plot']  = $group->is_plot;
            $data['query_groups'][$group->tag]['is_number']= $group->is_number;
            $data['query_groups'][$group->tag]['queries'] = array();    

            // Retrieve the stored Qb queries in this group.
            $by_group = array( 'group_id' => $group->id );
            $queries = $this->query->retrieve( $by_group );

            foreach ( $queries as $query ) {
                //  Replace soft timestamps with timestamp of version deprecation
                $transformed_query = replace_soft_timestamps($query->query_qb, $version->deprecate);

                //  Append the Qb queries and other meta-data into $data
                $data['query_groups'][$group->tag]['queries'][$query->tag]['title']    = $query->title;
                $data['query_groups'][$group->tag]['queries'][$query->tag]['qb_query'] = $transformed_query;
            }
        }

        $this->load->view('watch_single', array('data' => $data) );   

    }

}