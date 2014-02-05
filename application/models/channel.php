<?php

class channel extends CI_Model{

    // BEGIN BASIC CRUD FUNCTIONALITY

    function create( $data = array() ){
        $this->db->insert('channel', $data);    
        return;
    }

    function retrieve( $data = array() ){
        $this->db->where($data);
        $query = $this->db->get('channel');
        return $query->result();
    }
    
    function update( $data = array() ){
        $this->db->where($data);
        $this->db->update('channel', $data);
    }
    
    function delete( $data = array() ){
        $this->db->where($data);
        $this->db->delete('channel');
    }

}

?>