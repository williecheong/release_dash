<?php

class version extends CI_Model{

    function get_birthday( $version_id = 0 ) { 
        if ($version_id == 0) { return array(); }

        $this->db->select_min('start');
        $this->db->from('version_channel_cycle');
        $this->db->join('cycle', 'cycle.id = version_channel_cycle.cycle_id');
        $this->db->where( array( 'version_channel_cycle.version_id' => $version_id ) );
        $query = $this->db->get();

        return $query->result()[0]->start;
    }

    function get_actives_by_product( $product_id = 0 ) {
        // Check that a product_id is specified
        if ($product_id == 0) { return array(); }

        // Check that a current cycle is present
        $cycle = $this->cycle->get_current_cycle();
        if ( empty($cycle) ) { return array(); }

        // Get all channels for this product_id
        $channels = $this->channel->retrieve( 
            array('product_id' => $product_id) );
        
        // Build out the query in this cycle for these channels
        $conditions = "`cycle_id` = '" . $cycle->id . "'" ;
        foreach ($channels as $key => $channel) {
            if ( $key == 0 ) {
                $conditions .= " AND (";
            } else {
                $conditions .= " OR";
            }

            $conditions .= " `channel_id` = '" . $channel->id . "'";

            if ( $key == count($channels) - 1 ) {
                $conditions .= " )";
            }
        }
        // Query has been built. 

        // Pulling the active versions from the DB now.
        $this->db->from('version_channel_cycle');
        $this->db->join('version', 'version.id = version_channel_cycle.version_id');
        $this->db->where( $conditions );
        $query = $this->db->get();

        return $query->result();
    }

    // BEGIN BASIC CRUD FUNCTIONALITY
    function create( $data = array() ){
        $this->db->insert('version', $data);
        return;
    }

    function retrieve( $data = array() ){
        $this->db->where($data);
        $query = $this->db->get('version');
        return $query->result();
    }
    
    function update( $data = array() ){
        $this->db->where($data);
        $this->db->update('version', $data);
    }
    
    function delete( $data = array() ){
        $this->db->where($data);
        $this->db->delete('version');
    }

}

?>