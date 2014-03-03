<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require(APPPATH.'/libraries/REST_Controller.php');

class Misc extends REST_Controller {
    
    function __construct() {
        parent::__construct();
        // Autoloaded Config, Helpers, Models 
    }

    public function exthtml_post() {
        if ( isset($_POST['source']) ) {
            $source = $_POST['source'];
            echo file_get_contents_via_curl( $source );
        }
        return;
    }
}