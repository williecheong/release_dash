<?php

class comment extends CI_Model{
    
    // BEGIN BASIC CRUD FUNCTIONALITY

    function create( $data = array() ){
        $this->db->insert('comment', $data);    
        return;
    }

    function retrieve( $data = array() ){
        $this->db->where($data);
        $query = $this->db->get('comment');
        return $query->result();
    }
    
    function update( $data = array() ){
        $this->db->where($data);
        $this->db->update('comment', $data);
    }
    
    function delete( $data = array() ){
        $this->db->where($data);
        $this->db->delete('comment');
    }

}

?>