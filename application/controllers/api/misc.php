<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require(APPPATH.'/libraries/REST_Controller.php');

class Misc extends REST_Controller {
    
    function __construct() {
        parent::__construct();
        // Autoloaded Config, Helpers, Models 
    }

    // Used to retrieve the external HTML via AJAX request
    public function exthtml_post() {
        if ( isset($_POST['source']) ) {
            $source = $_POST['source'];
            echo file_get_contents_via_curl( $source );
        }
        return;
    }

    // Referenced from:
    //  https://github.com/EllisLab/CodeIgniter/wiki/Persona-Login
public function login_post() {
        $login_result = '';
        if ( isset($_POST['assertion']) ) {
            $login_result = $this->authentication->login($_POST['assertion']);
        }
        if ( $this->session->userdata('email') ) {
            $admins = $this->administrator->retrieve(array('email' => $this->session->userdata('email')));
            if ( count($admins) < 1 ) {
                log_message('error', 'Unauthorized '.$this->session->userdata('email').' attempted to login.');
                $this->authentication->logout();
                echo "Not administrator";
            } else {
                echo "OK";
            }
        } else {
            log_message('error', 'No session was created in /api/misc.php/login_post');
            echo $login_result;
        }
        return;
    }

    // Referenced from:
    //  https://github.com/EllisLab/CodeIgniter/wiki/Persona-Login
    public function logout_post() {
        $this->authentication->logout();
    }
}