<?php

class channel extends CI_Model{

    // Finds the channel that this version is currently on
    // Returns an empty array if channel is not found
    function for_version( $version_id = 0 ) {
        // Also jumpstarts automatic check for latest cycles if needed
        $current_cycle = $this->cycle->get_current_cycle();
        $cycle_id = $current_cycle->id;

        $mapping = $this->version_channel_cycle->retrieve( array( 'version_id' => $version_id,
                                                                  'cycle_id'   => $cycle_id  ) );
        if ( count($mapping) > 0 ) {
            $mapping = $mapping[0];
            $channel_id = $mapping->channel_id;
            $channel = $this->channel->retrieve( array( 'id' => $channel_id ) );
            
            return $channel[0];
        
        } else {
            // No channel found for this version at this time
            return array();
        }
    } 

    // BEGIN BASIC CRUD FUNCTIONALITY

    function create( $data = array() ){
        $this->db->insert('channel', $data);    
        return $this->db->insert_id();
    }

    function retrieve( $data = array() ){
        $this->db->where($data);
        $query = $this->db->get('channel');
        return $query->result();
    }
    
    function update( $criteria = array(), $new_data = array() ){
        $this->db->where($criteria);
        $this->db->update('channel', $new_data);
    }
    
    function delete( $data = array() ){
        $this->db->where($data);
        $this->db->delete('channel');
    }

}

?>