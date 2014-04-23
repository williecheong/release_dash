<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Test extends CI_Controller {

    function __construct() {
        parent::__construct();
        // Autoloaded Config, Helpers, Models 
        $this->load->library('unit_test');
    }

    public function index() {
        // Run the unit tests and print results at the end.
        //  Format: $this->unit->run( test, expected result, 'test name', 'notes');
        //  More information http://ellislab.com/codeigniter/user-guide/libraries/unit_testing.html 
        $this->unit->set_test_items(
            array(
                'result',
                'test_name', 
                'notes'
            )
        );

        $this->_test_version_models();
        $this->_test_helpers();

        echo "<style>th{width:20%;}</style>";
        echo $this->unit->report();
        return;
    }

    private function _test_version_models() {
        $versions = $this->version->retrieve();
        if ( count($versions) > 0 ) {
            $title = 'Model: $this->version->retrieve()';
                $notes = 'Testing to see if we have an array right after retrieving versions.';
                    $this->unit->run( $versions, 'is_array', $title, $notes);
                $notes = 'Testing to see if we have an array of objects after retrieving versions.';    
                    $this->unit->run( $versions[0], 'is_object', $title, $notes);
            
            $this->var_version = $versions[0];
        } else {
            $title = 'Model: $this->version->retrieve()';
                $notes = 'No versions stored in the database yet, although highly unlikely.';
                    $this->unit->run( $versions, array(), $title, $notes);
            
            echo "No versions currently stored in the database.";
            die();
        }

        return;
    }

    private function _test_helpers() {
        $title = 'Helpers: replace_version_attr()';
            $notes = 'Testing for replacement of the version soft-tags if a version is correctly passed into the function.';
                $this->unit->run( replace_version_attr('<version_tag>', $this->var_version), $this->var_version->tag, $title, $notes); 

        $title = 'Helpers: replace_birthday()';
            $notes = 'Testing for unsuccessful replacement of the @birthday soft-tag if a timestamp parameter is not specified.';
                $this->unit->run( replace_birthday('@birthday'), '@birthday', $title, $notes); 
            $notes = 'Testing for successful replacement with a specific birthday (in the form of a timestamp) if a timestamp parameter is specified.';
                $this->unit->run( replace_birthday('@birthday', date('Y-m-d H:i:s', time()) ), time()*1000, $title, $notes);    

        $title = 'Helpers: replace_timestamp()';
            $notes = 'Testing for successful replacement with current timestamp if no timestamp parameter is specified.';
                $this->unit->run( replace_timestamp('@timestamp', ''), time()*1000, $title, $notes);    
            $notes = 'Testing for successful replacement with specific timestamp if a timestamp parameter is specified.';
                $this->unit->run( replace_timestamp('@timestamp', date('Y-m-d H:i:s', time()) ), time()*1000, $title, $notes);

        return;
    }
}