<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require(APPPATH.'/libraries/REST_Controller.php');

class Groups extends REST_Controller {
    
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

    public function index_get() {
        $time = date( 'Y/m/d h:i:s') ;
        echo $time;
    }

    public function index_post() {
        $data = $this->post();
        $new_group = array( 
                'title'     => $data['group_title'],
                'entity'    => $data['group_entity'],
                'entity_id' => $data['group_entity_id'],
                'is_plot'   => $data['group_is_plot'],
                'is_number' => $data['group_is_number'] 
            ); 
        $group_id = $this->group->create( $new_group );

        foreach ( $data['group_queries'] as $html_id => $query ) {
            $new_query = array(
                    'title'     => $query['query_title'],
                    'group_id'  => $group_id,
                    'query_qb'  => $query['query_query_qb'],
                    'query_bz'  => $query['query_query_bz'],
                    'colour'    => $query['query_colour']
                );
            $query_id = $this->query->create( $new_query );
        }

        echo 'OK';
        return;
    }

    public function index_delete( $group_id = '' ) {
        if ( $group_id == '' ) {
            return ;
        }

        // Check if group is available to delete
        //  Note: product groups are default and cannot be deleted here
        $availability = $this->group->retrieve( 
                    array(  'id'     => $group_id,
                            'entity' => 'version'   )); 

        if ( count($availability) > 0 ) {
            // Group is available to delete
            $this->query->delete( 
                array( 'group_id' => $group_id ) ); 
            $this->group->delete( 
                array( 'id' => $group_id) );

            echo 'OK';
        } else { 
            // Group not available to delete 
            echo 'Delete failed - group not found';     
        }

        return;
    }
}
