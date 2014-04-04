<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require(APPPATH.'/libraries/REST_Controller.php');

class Caches extends REST_Controller {
    
    function __construct() {
        parent::__construct();
        // Autoloaded Config, Helpers, Models
    }

    // Used to create a new group in the DB
    public function es_data_post() {
        $data = $this->post();
        
        if ( isset($data['query_id']) && isset($data['query_es_data']) ){
            $query_id   = $data['query_id'];
            $version_id = $data['version_id'];
            $es_data    = $data['query_es_data']; 

            $availability = $this->cache_es_data->retrieve( array(
                'version_id'    => $version_id,
                'query_id'      => $query_id) ); 
            
            if ( count($availability) > 0 ) {
                // Query already has a cache. Do update
                $this->cache_es_data->update( array('query_id'      => $query_id,
                                                    'version_id'    => $version_id ),
                                              array('es_data'       => $es_data,
                                                    'last_updated'  => null)  );
                echo 'OK - es_data updated for query_id='.$query_id.'.';
            } else {
                // Query does not have a cache yet. Do insert
                $new_cache = array( 'query_id'    => $query_id,
                                    'version_id'  => $version_id,
                                    'es_data'     => $es_data  );
                $cache_id = $this->cache_es_data->create( $new_cache );
                echo 'OK - Cached es_data insert for query='.$query_id.'.';
            }
        } else {
            log_message('error', 'Missing query_id or cached es_data parameters in /api/caches.php/es_data_post');
            echo 'Missing query_id or cached es_data parameters.';
        }

        return;
    }
}

