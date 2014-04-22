<?php

class version extends CI_Model{

    // Requires two parameters for product and the latest version
    // Automatically generates a new version for this product in the DB
    // Returns the ID of the new version that was created.
    function make_new_for_product( $version = array(), $product = array() ) {
        // Set the tag and part of the title
        $new_version_tag = '';        
        $new_version_number = '';
        if ( $version->product_id == 3 ) {
            // B2G alert
            $source = "https://wiki.mozilla.org/Template:B2G_DEV_VERSION";
            $content = file_get_contents_via_curl( $source );
            if( $content === false ) {
                // Failed to retrieve external version tag
                // Manually calculate for next B2G version number
                log_message('error', 'Failed to access: '.$source);
                
                $break_tag = explode('_', $version->tag);
                $break_tag[1]++;
                $new_version_tag = implode('_', $break_tag);
                $new_version_number = implode('_', $break_tag);
            } else {
                // Extract externally retrieved version tag
                preg_match("/<p>(.*?)<\/p>/s", $content, $match);
                $new_version_tag =  str_replace('.', '_', trim($match[1]) );    
                $new_version_number = str_replace('.', '_', trim($match[1]) );
            }
        } else {
            // Firefox / Fennec alert
            $source = 'https://wiki.mozilla.org/Template:CENTRAL_VERSION';
            $content = file_get_contents_via_curl( $source );
            if( $content === false ) {
                // Failed to retrieve external version tag
                // Manually calculate for nightly version number
                log_message('error', 'Failed to access: '.$source);
            
                $new_version_tag = $version->tag + 1;
                $new_version_number = $version->tag + 1;
            } else {
                // Extract externally retrieved version tag
                preg_match("/<p>(.*?)<\/p>/s", $content, $match);
                $new_version_tag = trim( $match[1] );    
                $new_version_number = trim( $match[1] );
            }
        }

        // Get the product if it was not specified
        // We need the product title for creating the new version
        if ( empty($product) ) {
            $product = $this->product->retrieve( 
                array(
                    'id' => $version->product_id
                )
            );
            
            $product = $product[0];
        }

        // Define the values for the new version to be created
        $new_version_title = $product->title . " " . $new_version_number;
        $data = array( 
            'tag'    => $new_version_tag,
            'title'  => $new_version_title,
            'product_id' => $product->id     
        );
        
        // Proceed to create that new version in the database
        $new_version_id = $this->version->create( $data );

        return $new_version_id;
    }
    
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
        $this->db->where( array( 
            'version_channel_cycle.version_id' => $version_id 
            )
        );
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
            $current_cycle = $this->cycle->retrieve( 
                array(
                    'id' => $cycle_id
                )
            );
            
            if ( empty($current_cycle) ) { 
                return array(); 
            } else {
                $current_cycle = $current_cycle[0];
            }
        }

        // Get all channels for this product_id
        $channels = $this->channel->retrieve( 
            array(
                'product_id' => $product_id
            )
        );
        
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
    
    function update( $criteria = array(), $new_data = array() ){
        $this->db->where($criteria);
        $this->db->update('version', $new_data);
    }
    
    function delete( $data = array() ){
        $this->db->where($data);
        $this->db->delete('version');
    }

}

?>