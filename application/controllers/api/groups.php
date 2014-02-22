<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require(APPPATH.'/libraries/REST_Controller.php');

class Groups extends REST_Controller {
    
    function __construct() {
        parent::__construct();
        // Autoloaded Config, Helpers, Models 
    }

    public function index_get() {
        $time = date( 'Y/m/d h:i:s') ;
        echo $time;
    }

    // Used to create a new group in the DB
    public function index_post() {
        if ( $this->session->userdata('email') ) {
            $data = $this->post();
            
            $new_group = array( 
                    'title'     => isset($data['group_title'])     ? $data['group_title']     : '' ,
                    'entity'    => isset($data['group_entity'])    ? $data['group_entity']    : '' ,
                    'entity_id' => isset($data['group_entity_id']) ? $data['group_entity_id'] : '' ,
                    'is_plot'   => isset($data['group_is_plot'])   ? $data['group_is_plot']   : '' ,
                    'is_number' => isset($data['group_is_number']) ? $data['group_is_number'] : ''  ); 
            
            $group_id = $this->group->create( $new_group );

            foreach ( $data['group_queries'] as $html_id => $query ) {
                $new_query = array(
                        'title'     => isset($query['query_title'])    ? $query['query_title']    : '' ,
                        'group_id'  => isset($group_id)                ? $group_id                : '' ,
                        'query_qb'  => isset($query['query_query_qb']) ? $query['query_query_qb'] : '' ,
                        'query_bz'  => isset($query['query_query_bz']) ? $query['query_query_bz'] : '' ,
                        'colour'    => isset($query['query_colour'])   ? $query['query_colour']   : ''  );
                
                $query_id = $this->query->create( $new_query );
            }

            echo 'OK';
            
        } else {
            echo 'Failed: Unauthorized to create group';
        }

        return;
    }

    // Used to delete an existing group from the DB
    public function index_delete( $group_id = '' ) {
        if ( $this->session->userdata('email') ) {
            // Check that a group has been specified
            if ( $group_id == '' ) { return ; }

            // Check if group is available to delete
            //  Note: product groups are default and cannot be deleted here
            $availability = $this->group->retrieve( 
                        array(  'id'     => $group_id,
                                'entity' => 'version'   )); 

            if ( count($availability) > 0 ) {
                // Group is available to delete
                // Delete the queries first, then the group
                $this->query->delete( array( 'group_id' => $group_id ) ); 
                $this->group->delete( array( 'id' => $group_id) );
                echo 'OK';
            } else { 
                // Group not available to delete 
                echo 'Delete failed - group not found';     
            }
        } else {
            echo 'Failed: Unauthorized to delete group';
        }
        
        return;
    }
}
