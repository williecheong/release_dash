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
        
        $this->_test_models();
        $this->_test_helpers();

        echo $this->unit->report();
        return;
    }

    private function _test_models() {
        $this->unit->run( 'test1', 'expected result', 'test name1', 'notes');
    }
    
    private function _test_helpers() {
        $this->unit->run( 'test1', 'expected result', 'test name2', 'notes');    
    }
}