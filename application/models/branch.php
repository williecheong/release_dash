<?php

class branch extends CI_Model{
    
    function create( $data = array() ){
        $this->db->insert('branch', $data);
        return;
    }

    function retrieve( $data = array() ){
        $this->db->where($data);
        $query = $this->db->get('branch');
        return $query->result();
    }
    
    function update( $data = array() ){
        $this->db->where($data);
        $this->db->update('branch', $data);
    }
    
    function delete( $data = array() ){
        $this->db->where($data);
        $this->db->delete('branch');
    }

}

?>