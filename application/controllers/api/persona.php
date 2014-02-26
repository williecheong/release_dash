<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require(APPPATH.'/libraries/REST_Controller.php');

class Persona extends REST_Controller {
    
    function __construct() {
        parent::__construct();
        // Autoloaded Config, Helpers, Models 
    }

    public function index_get() {
        redirect('/admin');
    }

    public function login_post() {
        if ( isset($_POST['assertion']) ) {
            $this->authentication->login($_POST['assertion']);
        }

        if ( $this->session->userdata('email') ) {
            $admins = $this->administrator->retrieve(array('email' => $this->session->userdata('email')));
            if ( count($admins) < 1 ) {
                $this->authentication->logout();
                echo "Not administrator";
            } else {
                echo "OK";
            }
        }

        return;
    }

    public function logout_post() {
        $this->authentication->logout();
    }
}