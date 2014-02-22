<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require(APPPATH.'/libraries/REST_Controller.php');

class Users extends REST_Controller {
    
    function __construct() {
        parent::__construct();
        // Autoloaded Config, Helpers, Models 
    }

    public function index_get() {
        redirect('/admin/login');
    }

    public function login_post() {
        if ( isset($_POST['assertion']) ) {
            $this->authentication->login($_POST['assertion']);
        }

        if ( $this->session->userdata('email') ) {
            $is_admin = $this->administrative->check_admin_rights( $this->session->userdata('email') );
            if ( !$is_admin ) {
                $this->authentication->logout();
            }
        }
    }

    public function logout_post() {
        $this->authentication->logout();
    }
}
