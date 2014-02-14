<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Watch extends CI_Controller {

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
        $data['id'] = $version->id;
        $data['title'] = $version->title;
        $data['query_groups'] = array();

        /********************************************
            Retrieving groups and queries by product
        *********************************************/
        $by_product = array( 
            'entity'    => 'product',
            'entity_id' => $product->id );
        $groups_by_product = $this->group->retrieve( $by_product );
        $data = $this->_groups_to_data( $data, $version, $groups_by_product, true );
       

        /********************************************
            Retrieving groups and queries by version
        *********************************************/
        $by_version = array( 
            'entity'    => 'version',
            'entity_id' => $version->id );
        $groups_by_version = $this->group->retrieve( $by_version );
        $data = $this->_groups_to_data( $data, $version, $groups_by_version );
        

        $this->load->view('watch_single', array('data' => $data) );   

    }

    private function _groups_to_data( $data = array(), $version = array(), $groups = array(), $is_default = false ) {
        foreach ( $groups as $group ) {
            $group_title = replace_version_attr( $group->title, $version );

            $data['query_groups'][$group->id]['title'] = $group_title;
            $data['query_groups'][$group->id]['is_plot']  = $group->is_plot;
            $data['query_groups'][$group->id]['is_number'] = $group->is_number;
            $data['query_groups'][$group->id]['queries'] = array();    

            if ( $is_default ) {
                $data['query_groups'][$group->id]['is_default'] = '1';
            } else {
                $data['query_groups'][$group->id]['is_default'] = '0';    
            }
            
            // Retrieve the stored Qb queries in this group.
            $by_group = array( 'group_id' => $group->id );
            $queries = $this->query->retrieve( $by_group );

            foreach ( $queries as $query ) {
                $query_title = replace_version_attr( $query->title, $version );
                $query_bugzilla = replace_version_attr( $query->query_bz, $version );

                // Replace soft timestamps with current timestamp and birthday
                $transformed_query = $query->query_qb;
                $transformed_query = replace_version_attr( $transformed_query, $version );
                    
                    $birthday = $this->version->get_birthday( $version->id );
                $transformed_query = replace_birthday( $transformed_query, $birthday );
                    $shipday = $this->version->get_shipday( $version->id );
                $transformed_query = replace_timestamp( $transformed_query, $shipday );


                //  Append the Qb queries and other meta-data into $data
                $data['query_groups'][$group->id]['queries'][$query->id]['title']       = $query_title;
                $data['query_groups'][$group->id]['queries'][$query->id]['colour']      = $query->colour;
                $data['query_groups'][$group->id]['queries'][$query->id]['qb_query']    = $transformed_query;
                $data['query_groups'][$group->id]['queries'][$query->id]['bz_query']    = $query_bugzilla;
            }
        }

        return $data;
    }
}