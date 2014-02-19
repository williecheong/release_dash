<?php

class cycle extends CI_Model{
    
    // Returns the current cycle as an object
    // Attributes are fields in DB::cycle table
    function get_current_cycle() {
        // Get current timestamp in the specified format
        // In terms of SQL, conditions define the WHERE clause
        // Then use the CRUD specified below to retrieve current cycle
        $current = date( 'Y-m-d H:i:s', time() );
        $conditions = "`start`<'".$current."' AND `end`>'".$current."'";
        $cycle = $this->retrieve($conditions);

        if ( empty($cycle) ) {
            // Empty array is retrieved when no cycle is found
            // Simply return that empty array for now
            return $cycle;
        } else {
            // There should always only be one current cycle
            // Return the first one that is found.
            return $cycle[0];
        }  
    }

    // BEGIN BASIC CRUD FUNCTIONALITY

    function create( $data = array() ){
        $this->db->insert('cycle', $data);    
        return;
    }

    function retrieve( $data = array() ){
        $this->db->where($data);
        $query = $this->db->get('cycle');
        return $query->result();
    }
    
    function update( $data = array() ){
        $this->db->where($data);
        $this->db->update('cycle', $data);
    }
    
    function delete( $data = array() ){
        $this->db->where($data);
        $this->db->delete('cycle');
    }

}

?>