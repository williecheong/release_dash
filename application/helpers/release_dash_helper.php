<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('replace_soft_timestamps')) {
    // By default, soft timestamps <timestamp> are replaced with current timestamp
    // If a second parameter is specified, that timestamp will be used instead
    // ElasticSearch works on milliseconds since epoch (GMT).
    // For example, 1389453465000 == 11-Jan-2014 15:17:45 (GMT)
    function replace_soft_timestamps($input_string = '', $timestamp = '') {
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

