<?php

class product extends CI_Model{
    
    function create( $data = array() ){
        $this->db->insert('product', $data);
        return;
    }
    
    function retrieve( $data = array() ){
        $this->db->where($data);
        $query = $this->db->get('product');
        return $query->result();
    }
    
    function update( $data = array() ){
        $this->db->where($data);
        $this->db->update('product', $data);
    }
    
    function delete( $data = array() ){
        $this->db->where($data);
        $this->db->delete('product');
    }

}

?>