<?php

class cycle extends CI_Model{
    
    function get_current_cycle() {
        $current = date('Y-m-d H:i:s', time());
        $conditions = "`start`<'".$current."' AND `end`>'".$current."'";
        
        $cycle = $this->retrieve($conditions);
        if ( empty($cycle) ){
            return $cycle;
        } else {
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