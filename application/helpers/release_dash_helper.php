<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('taggify')) {
    function taggify( $input_string = '' ) {
        if ( $input_string == '' ) {
            // Missing parameters
            return $input_string;
        } else {
            $input_string = preg_replace( '/[^a-z0-9]+/', '-', $input_string );
            $input_string = trim( $input_string, '-' );
            $input_string = strtolower( $input_string );
        }        
        return $input_string;
    }   
}

/***************************************
    FIND AND REPLACE TYPE OF FUNCTIONS
****************************************/

if ( ! function_exists('replace_version_attr') ) {
    function replace_version_attr( $input_string = '', $version = '' ) {
        if ( $input_string == '' || $version == '' ) {
            // Missing parameters
            return $input_string;
        
        } else {
            $input_string = str_replace("<version_tag>", $version->tag, $input_string);
            $input_string = str_replace("<version_title>", $version->title, $input_string);

        }        
        
        return $input_string;
    }   
}

if ( ! function_exists('replace_birthday') ) {
    function replace_birthday($input_string = '', $birthday = '') {
        if ( $input_string == '' || $birthday == '' ) {
            // Missing parameters
            return $input_string;
        
        } else {
            $birthday = strtotime($birthday) * 1000;
            $input_string = str_replace("<birthday>", $birthday, $input_string);
        }        
        
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
            // Some timestamp has been specified
            // Let's use that in our helper function.
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



