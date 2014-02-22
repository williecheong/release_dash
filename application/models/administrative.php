<?php

class administrative extends CI_Model{

    function check_admin_rights( $email = '' ) {
        $this->db->where('email', $email);
        $query = $this->db->get('administrator');
        $query_result = $query->result();

        if ( empty($query_result) ) {
            return false;
        } else {
            return true;
        }
    }

    // Requires two parameters for product and the latest version
    // Automatically generates a new version for this product in the DB
    // Returns the ID of the new version that was created.
    function make_new_version_for_product( $version = array(), $product = array() ) {
        // Set the tag and part of the title
        $new_version_tag = '';        
        $new_version_number = '';
        if ( $version->product_id == 3 ) {
            // B2G alert
            $break_tag = explode('_', $version->tag);
            $break_tag[1]++;
            $new_version_tag = implode('_', $break_tag);
            $new_version_number = implode('.', $break_tag);
        } else {
            $new_version_tag = $version->tag + 1;
            $new_version_number = $version->tag + 1;
        }

        if ( empty($product) ) {
            $product = $this->product->retrieve( array('id'=>$version->product_id) );
            $product = $product[0];
        }

        $new_version_title = $product->title . " " . $new_version_number;

        $data = array( 'tag'    => $new_version_tag,
                       'title'  => $new_version_title,
                       'product_id' => $product->id     );

        $new_version_id = $this->version->create( $data );

        return $new_version_id;
    }

    // Maps a version, to a channel, to a cycle
    // All 3 parameters are required for this to work
    function create_map( $version_id, $channel_id, $cycle_id ) {
        $data = array(  'version_id' => $version_id,
                        'channel_id' => $channel_id,
                        'cycle_id'   => $cycle_id    );
        $this->db->insert('version_channel_cycle', $data);
        return $this->db->insert_id();
    }

    function retrieve_map( $data = array() ) {
        $this->db->where($data);
        $query = $this->db->get('version_channel_cycle');
        return $query->result();
    }
}