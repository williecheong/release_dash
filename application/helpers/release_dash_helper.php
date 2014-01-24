<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('replace_soft_timestamps')) {
    // By default, soft timestamps are replaced with current timestamp
    // If a second parameter is specified, that timestamp will be used instead
    function replace_soft_timestamps($string = '', $timestamp = '') {
        
        return $string;
    }   
}

if ( ! function_exists('convert_timestamp_to_epoch')) {
    // Takes in regular timestamps and
    // Converts them into milliseconds since epoch (GMT).
    // For example, 1389453465000 == 11-Jan-2014 15:17:45 (GMT)
    function epoch_converter($timestamp = '') {
        
        return $epoch_timestamp;
    }   
}
