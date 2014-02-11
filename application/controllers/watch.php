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
        
        foreach ( $groups_by_product as $group ) {
            $group_tag = replace_version_attr( $group->tag, $version );
            $group_title = replace_version_attr( $group->title, $version );

            $data['query_groups'][$group_tag]['title'] = $group_title;
            $data['query_groups'][$group_tag]['group_id']  = $group->id;
            $data['query_groups'][$group_tag]['is_plot']  = $group->is_plot;
            $data['query_groups'][$group_tag]['is_number'] = $group->is_number;
            $data['query_groups'][$group_tag]['is_rule'] = '1';
            $data['query_groups'][$group_tag]['queries'] = array();    

            // Retrieve the stored Qb queries in this group.
            $by_group = array( 'group_id' => $group->id );
            $queries = $this->query->retrieve( $by_group );

            foreach ( $queries as $query ) {
                $query_tag = replace_version_attr( $query->tag, $version );
                $query_title = replace_version_attr( $query->title, $product, $version );

                // Replace soft timestamps with current timestamp and birthday
                $transformed_query = $query->query_qb;

                $transformed_query = replace_version_attr( $transformed_query, $version );
                    $birthday = $this->version->get_birthday( $version->id );
                $transformed_query = replace_birthday( $transformed_query, $birthday );
                    $shipday = $this->version->get_shipday( $version->id );
                $transformed_query = replace_timestamp( $transformed_query, $shipday );

                    
                //  Append the Qb queries and other meta-data into $data
                $data['query_groups'][$group_tag]['queries'][$query_tag]['title']       = $query_title;
                $data['query_groups'][$group_tag]['queries'][$query_tag]['query_id']    = $query->id;
                $data['query_groups'][$group_tag]['queries'][$query_tag]['colour']      = $query->colour;
                $data['query_groups'][$group_tag]['queries'][$query_tag]['qb_query']    = $transformed_query;
            }
        }

        /********************************************
            Retrieving groups and queries by version
        *********************************************/
        $by_version = array( 
            'entity'    => 'version',
            'entity_id' => $version->id );
        $groups_by_version = $this->group->retrieve( $by_version );
        
        foreach ( $groups_by_version as $group ) {
            $data['query_groups'][$group->tag]['title'] = $group->title;
            $data['query_groups'][$group->tag]['group_id']  = $group->id;
            $data['query_groups'][$group->tag]['is_plot']  = $group->is_plot;
            $data['query_groups'][$group->tag]['is_number'] = $group->is_number;
            $data['query_groups'][$group->tag]['is_rule'] = '0';
            $data['query_groups'][$group->tag]['queries'] = array();    

            // Retrieve the stored Qb queries in this group.
            $by_group = array( 'group_id' => $group->id );
            $queries = $this->query->retrieve( $by_group );

            foreach ( $queries as $query ) {
                // Replace soft timestamps with current timestamp and birthday
                $transformed_query = $query->query_qb;
                
                $shipday = $this->version->get_shipday( $version->id );
                $transformed_query = replace_timestamp( $transformed_query, $shipday );

                $birthday = $this->version->get_birthday( $version->id );
                $transformed_query = replace_birthday( $transformed_query, $birthday );

                //  Append the Qb queries and other meta-data into $data
                $data['query_groups'][$group->tag]['queries'][$query->tag]['title']       = $query->title;
                $data['query_groups'][$group->tag]['queries'][$query->tag]['query_id']    = $query->id;
                $data['query_groups'][$group->tag]['queries'][$query->tag]['colour']      = $query->colour;
                $data['query_groups'][$group->tag]['queries'][$query->tag]['qb_query']    = $transformed_query;
            }
        }
        // End of retrieving groups and queries by version
        /*************************************************/

        $this->load->view('watch_single', array('data' => $data) );   

    }

}