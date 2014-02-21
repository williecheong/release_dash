<?php

class version extends CI_Model{

    // Returns the SQL timestamp of a version's next shipday
    // Version ID must be specified as the only input parameter
    function get_shipday( $version_id = 0 ) { 
        // Verify that a version ID has been specified
        if ($version_id == 0) { return array(); }

        // Query database for highest end date for this version
        $this->db->select_max('end');
        $this->db->from('version_channel_cycle');
        $this->db->join('cycle', 'cycle.id = version_channel_cycle.cycle_id');
        $this->db->where( array( 'version_channel_cycle.version_id' => $version_id ) );
        $query = $this->db->get();

        // Return that end in timestamp format
        $query_result = $query->result();
        return $query_result[0]->end;
    }

    // Returns the SQL timestamp of a version's birthday
    // Version ID must be specified as the only input parameter    
    function get_birthday( $version_id = 0 ) { 
        // Verify that a version ID has been specified
        if ($version_id == 0) { return array(); }

        // Query database for lowest start date for this version
        $this->db->select_min('start');
        $this->db->from('version_channel_cycle');
        $this->db->join('cycle', 'cycle.id = version_channel_cycle.cycle_id');
        $this->db->where( array( 'version_channel_cycle.version_id' => $version_id ) );
        $query = $this->db->get();

        // Return that start in timestamp format
        $query_result = $query->result();
        return $query_result[0]->start;
    }

    // Requires a single parameter of product ID
    // Optional to specify a cycle ID as the second parameter
    // If none specified, current cycle will be detected and used
    // Function should return an array of 
    //    Currently active versions for each product
    //      4 version objects for Firefox
    //      4 version objects for Fennec
    //      2 version objects for B2G
    function get_active_by_product( $product_id = 0, $cycle_id = 0 ) {
        // Check that a product_id is specified
        // Also check that a current cycle is present
        if ($product_id == 0) { return array(); }
        
        $current_cycle;
        if ($cycle_id == 0) { 
            $current_cycle = $this->cycle->get_current_cycle();
            if ( empty($current_cycle) ) { return array(); }
        } else {
            $current_cycle = $this->cycle->retrieve( array('id' => $cycle_id) );
                if ( empty($current_cycle) ) { 
                    return array(); 
                } else {
                    $current_cycle = $current_cycle[0];
                }
        }

        // Get all channels for this product_id
        $channels = $this->channel->retrieve( 
            array('product_id' => $product_id) );
        
        // Build out the query conditions
        // WHERE cycle = current cycle AND ( channels = central OR beta OR ... )
        $conditions = "`cycle_id` = '" . $current_cycle->id . "'" ;
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
        } // End of building the query conditions. 

        // Pulling the active versions from the DB based on above conditions
        // Also join with version table because other version data is wanted
        $this->db->from('version_channel_cycle');
        $this->db->join('version', 'version_channel_cycle.version_id = version.id');
        $this->db->where( $conditions );
        $query = $this->db->get();

        return $query->result();
    }
    

    // BEGIN BASIC CRUD FUNCTIONALITY
    function create( $data = array() ){
        $this->db->insert('version', $data);
        return $this->db->insert_id();
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