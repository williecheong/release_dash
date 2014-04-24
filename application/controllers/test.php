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

        // Stores the newly created entries in the db for using and eventually deleting
        // Array is a set of key value pairs for "entity" => "id" e.g. "product" => "4"
        $this->test_entries = array();

        try {
            $this->_test_version_models();;           
        } catch (Exception $e) {
            $this->_handle_exceptions($e);
        }
        
        try {
            $this->_test_helpers();
        } catch (Exception $e) {            
            $this->_handle_exceptions($e);
        }

        // Put at the very end to make sure we delete everything
        // Removes all of the garbage test data that we just created for testing with
        $this->_delete_creations();

        echo "<style>th{width:20%;}</style>";
        echo $this->unit->report();
        return;
    }

    private function _test_version_models() { // Follows CRUD (Create Retrieve Update Delete)
        $this->test_entries['version'] = $this->version->create(
            array(
                'tag' => 'test_tag',
                'product_id' => '1',
                'title' => 'Test Title for Version'
            )
        ); 

        $versions = $this->version->retrieve(
            array(
                'id' => $this->test_entries['version']
            )
        );

        $title = 'Model: $this->version->create()';
        $notes = 'Testing to see if we have an array of 1 object right after retrieving the created version.';
        $this->unit->run( count($versions), 1, $title, $notes);

        $title = 'Model: $this->version->retrieve()';
        $notes = 'Testing to see if we have an array right after retrieving versions.';
        $this->unit->run( $versions, 'is_array', $title, $notes);
        $notes = 'Testing to see if we have an array of objects after retrieving versions.';    
        $this->unit->run( $versions[0], 'is_object', $title, $notes);

        $this->var_version = $versions[0];

        $title = 'Model: $this->version->retrieve()';
        $notes = 'Testing to see if we actually stored the right values in the test version.';
        $this->unit->run( $this->var_version->tag, 'test_tag', $title, $notes);
        
        return;
    }

    private function _handle_exceptions( $e ) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
    }

    private function _delete_creations() {
        foreach ($this->test_entries as $entity => $id) {
            try {
                $this->{$entity}->delete(
                    array(
                        'id' => $id
                    )
                );
                echo 'Successfully deleted test <strong>'.$entity.'</strong>: ID = '.$id."\n";
            } catch (Exception $e) {
                echo 'IMPORTANT: Failed to delete test entry from <strong>' . $entity . '</strong> table (ID = '.$id.')';
            }
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