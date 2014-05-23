<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*********************** 
    Referenced from: 
    https://github.com/EllisLab/CodeIgniter/wiki/Persona-Login
***********************/

class Authentication {

    private $CI;
    private $email;

    function __construct() {
        // get super object
        $this->CI =& get_instance();

        // set email
        $this->email = $this->CI->session->userdata('email');
    }

    /** get email
     *
     * \return  email address if set, otherwise false
     */
    public function get_email() {
        return $this->email;
    }

    public function login($assertion) {
        // verify assertion
        $result = $this->verify_assertion($assertion);
        
        // check for success
        if ($result->status === 'okay') {
            $this->email = $result->email;
            $this->CI->session->set_userdata(array('email' => $result->email));
        } else {
            $result = $this->verify_assertion($assertion, 'http://');
            
            if ( $result->status === 'okay' ) {
                $this->email = $result->email;
                $this->CI->session->set_userdata(array('email' => $result->email));
            } else {
                log_message('error', 'Persona '.$result->status.': '.$result->reason);
                return $result->reason;
            }
        }
    }

    public function logout() {
        // logout
        $this->email = false;
        $this->CI->session->sess_destroy();
    }

    private function verify_assertion($assertion, $head = 'https://') {
        $audience = $head . $_SERVER['SERVER_NAME'];
        $postdata = 'assertion=' . urlencode($assertion) . '&audience=' . urlencode($audience);
        
        $this->CI->load->helper('post');
        $result = post_request('https://verifier.login.persona.org/verify',$postdata);
        return json_decode($result);
    }
}