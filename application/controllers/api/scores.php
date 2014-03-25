<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require(APPPATH.'/libraries/REST_Controller.php');

class Scores extends REST_Controller {
    
    function __construct() {
        parent::__construct();
        // Autoloaded Config, Helpers, Models
    }

    // Used to create a new group in the DB
    public function index_post() {
        $data = $this->post();
        
        if ( isset($data['version_id']) && isset($data['version_score']) ){
            $version_id = $data['version_id'];
            $score      = $data['version_score']; 

            $availability = $this->score->retrieve( array('version_id' => $version_id) ); 
            
            if ( count($availability) > 0 ) {
                // Version already has a score. Do update
                $this->score->update( array('version_id'    => $version_id),
                                      array('score_colour'  => $score,
                                            'last_updated'  => null)  );
                echo 'OK - Score updated to '.$score.' for version_id='.$version_id.'.';
            } else {
                // Version does not have a score yet. Do insert
                $new_score = array( 'version_id'    => $version_id,
                                    'score_colour'  => $score  );
                $score_id = $this->score->create( $new_score );
                echo 'OK - Score of '.$score.' insert for version_id='.$version_id.'.';
            }
        } else {
            echo 'Missing version_id or score parameters.';
        }

        return;
    }
}