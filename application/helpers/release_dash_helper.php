<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('admin_easy_qb_cmp') ) {
    function admin_easy_qb_cmp($a, $b) {
        $a['description'] = strtolower( $a['description'] ) ;
        $b['description'] = strtolower( $b['description'] ) ;

        if ($a['description'] == $b['description']) {
            return 0;
        }
        return ($a['description'] < $b['description']) ? -1 : 1;
    }
}

/***************************************
    FIND AND REPLACE TYPE OF FUNCTIONS
****************************************/

if ( ! function_exists('replace_version_attr') ) {
    // When executing default groups on a specific version
    // Use this for decoding <version_tag> and <version_title> on strings
    // A second parameter containing the target version object must be specified
    function replace_version_attr( $input_string = '', $version = '' ) {
        // Check for missing parameters
        if ( $input_string == '' || $version == '' ) { return $input_string; }
        
        // Replace soft <version_tag> with the actual tag of specified version
        $input_string = str_replace("<version_tag>", $version->tag, $input_string);
        // Replace soft <version_title> with the actual title of specified version
        $input_string = str_replace("<version_title>", $version->title, $input_string);
        
        return $input_string;
    }   
}

if ( ! function_exists('replace_birthday') ) {
    // Soft birthdays <birthday> are replaced with a birthday timestamp
    // CodeIgniter helper functions cannot perform database transactions
    //      ,', A second parameter for the version's birthday must be specified
    // ElasticSearch works on milliseconds since epoch (GMT).
    // For example, 1389453465000 == 11-Jan-2014 15:17:45 (GMT)
    function replace_birthday($input_string = '', $birthday = '') {
        // Check for missing parameters
        if ( $input_string == '' || $birthday == '' ) { return $input_string; }
        
        $birthday = strtotime($birthday) * 1000;
        $input_string = str_replace("<birthday>", $birthday, $input_string);
    
        return $input_string;
    }   
}

if ( ! function_exists('replace_timestamp') ) {
    // By default, soft timestamps <timestamp> are replaced with current timestamp
    // If a second parameter is specified, that timestamp will be used instead
    // ElasticSearch works on milliseconds since epoch (GMT).
    // For example, 1389453465000 == 11-Jan-2014 15:17:45 (GMT)
    function replace_timestamp($input_string = '', $timestamp = '') {
        if ( $timestamp !== '' ) {
            // Use the specified custom timestamp
            $timestamp = strtotime($timestamp) * 1000;
            $input_string = str_replace("<timestamp>", $timestamp, $input_string);
        } else {
            // No timestamp specified, use current timestamp
            $current_epoch = time() * 1000;
            $input_string = str_replace("<timestamp>", $current_epoch, $input_string);
        }
        
        return $input_string;
    }   
}



