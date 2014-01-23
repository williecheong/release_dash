<?php

class query extends CI_Model{
    
    function create( $data = array() ){
        $this->db->insert('query', $data);    
        return;
    }

    function retrieve( $data = array() ){
        $this->db->where($data);
        $query = $this->db->get('query');
        return $query->result();
    }
    
    function update( $data = array() ){
        $this->db->where($data);
        $this->db->update('query', $data);
    }
    
    function delete( $data = array() ){
        $this->db->where($data);
        $this->db->delete('query');
    }

}

?>