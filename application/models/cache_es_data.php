<?php

class cache_es_data extends CI_Model{

    function retrieve_valid_cache( $query_id = '', $version_id = '' ){
        $conditions = array( 'query_id' => $query_id );
        if ( $version_id !== '' ){
            $conditions['version_id'] = $version_id;
        }

        $cached = $this->retrieve( $conditions );
        if ( count($cached) > 0 ){
            $cached = $cached[0];
            $last_updated = strtotime( $cached->last_updated );
            
            // Find the time elapsed since last update
            $current = time();
            $time_elapsed = $current - $last_updated;
            
            // 7200 seconds in 2 hours
            $cache_period = 7200;

            // Return cached es_data if cached data is not too old (2 hours)
            if ( $time_elapsed < $cache_period ) {
                return $cached->es_data;
            } else {
                return '';
            }
        } else {
            return '';
        }
    }
    
    // BEGIN BASIC CRUD FUNCTIONALITY

    function create( $data = array() ){
        $this->db->insert('cache_es_data', $data);    
        return $this->db->insert_id();
    }

    function retrieve( $data = array() ){
        $this->db->where($data);
        $query = $this->db->get('cache_es_data');
        return $query->result();
    }
    
    function update( $criteria = array(), $new_data = array() ){
        $this->db->where($criteria);
        $this->db->update('cache_es_data', $new_data);
    }
    
    function delete( $data = array() ){
        $this->db->where($data);
        $this->db->delete('cache_es_data');
    }

}

?>