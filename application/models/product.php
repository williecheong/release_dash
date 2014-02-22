<?php

class product extends CI_Model{
    
    // BEGIN BASIC CRUD FUNCTIONALITY

    function create( $data = array() ){
        $this->db->insert('product', $data);
        return $this->db->insert_id();
    }
    
    function retrieve( $data = array() ){
        $this->db->where($data);
        $query = $this->db->get('product');
        return $query->result();
    }
    
    function update( $criteria = array(), $new_data = array() ){
        $this->db->where($criteria);
        $this->db->update('product', $new_data);
    }
    
    function delete( $data = array() ){
        $this->db->where($data);
        $this->db->delete('product');
    }

}

?>