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
            $source = base_url('/admin/update_cycle');
            $content = file_get_contents_via_curl( $source );
            if ( $content == 'Cycle created successfully' ) {
                return $this->get_current_cycle();
            } else {
                return $this->get_latest_cycle();
            }
        } else {
            // There should always only be one current cycle
            // Return the first one that is found.
            return $cycle[0];
        }  
    }

    // Similar to the above get_current_cycle()
    // This is a fail safe that will always return a cycle.
    function get_latest_cycle() {
        // Gets the latest date available
        $this->db->select_max('end');
        $this->db->from('cycle');
        $query = $this->db->get();

        $query_result = $query->result();
        $end = $query_result[0]->end;

        // Gets the full row based on the latest date found
        $this->db->where('end', $end);
        $query = $this->db->get('cycle');
        $query_result = $query->result();
        return $query_result[0];
    }

    // BEGIN BASIC CRUD FUNCTIONALITY

    function create( $data = array() ){
        $this->db->insert('cycle', $data);    
        return $this->db->insert_id();
    }

    function retrieve( $data = array() ){
        $this->db->where($data);
        $query = $this->db->get('cycle');
        return $query->result();
    }
    
    function update( $criteria = array(), $new_data = array() ){
        $this->db->where($criteria);
        $this->db->update('cycle', $new_data);
    }
    
    function delete( $data = array() ){
        $this->db->where($data);
        $this->db->delete('cycle');
    }

}

?>