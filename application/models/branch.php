<?php

class branch extends CI_Model{

    function retrieve_actives( $data = array() ){
        $conditions = '';
        $current = date('Y-m-d H:i:s', time());
        
        if ( !is_null( $data['product_id'] ) ) {
            
            $conditions = "(`product_id` = ".$data['product_id'].") AND "; 
            
            if ( $data['product_id'] == 3 ) { //B2G alert!!!
                $conditions .= "((`b2g_functional_complete`<'".$current."' AND `b2g_code_freeze`>'".$current."') OR 
                    (`b2g_code_freeze`<'".$current."' AND `deprecate`>'".$current."'))";    
            } else {
                $conditions .= "((`central`<'" . $current . "' AND `aurora`>'" . $current . "') OR 
                    (`aurora`<'" . $current . "' AND `beta`>'" . $current . "') OR 
                    (`beta`<'" . $current . "' AND `release`>'" . $current . "') OR 
                    (`release`<'" . $current . "' AND `deprecate`>'" . $current . "'))";
            }
        } 
        return $this->retrieve($conditions);
    }


    // BEGIN BASIC CRUD FUNCTIONALITY
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