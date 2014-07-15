<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Overview extends CI_Controller {

    function __construct() {
        parent::__construct();
        // Autoloaded Config, Helpers, Models 
    }
    
	public function index() {
        // Initialize a data array that becomes coreData JSON
        // Stores all relevant details for product and version
        log_message('info', 'Accessing controller function in /overview.php/index');
        $data = array();


        //  Find a list of all products
        $products = $this->product->retrieve();
        foreach ( $products as $product ) {
            // Store a pretty title for this product
            $data[$product->tag]['id']    = $product->id;
            $data[$product->tag]['title'] = $product->title;
            $data[$product->tag]['versions_all'] = $this->version->retrieve( 
                array(
                    'product_id' => $product->id
                )
            );
            $data[$product->tag]['versions'] = array();
            $data[$product->tag]['groups'] = array();

            //  Find versions that are currently active for this product
            $versions = $this->version->get_active_by_product( $product->id );
            foreach ( $versions as $version ) {
                // Store a pretty title for this version
                $data[$product->tag]['versions'][$version->tag]['title'] = $version->title;
                $data[$product->tag]['versions'][$version->tag]['channel'] = $version->channel_id;

                // Has a release readiness score been recorded before?
                $score = $this->score->retrieve( 
                    array(
                        'version_id' => $version->id
                    )
                );
                
                if (count($score) > 0){
                    $data[$product->tag]['versions'][$version->tag]['score'] = $score[0]->score_colour;
                    $data[$product->tag]['versions'][$version->tag]['last_updated'] = $score[0]->last_updated;
                } else {
                    $data[$product->tag]['versions'][$version->tag]['score'] = '';
                    $data[$product->tag]['versions'][$version->tag]['last_updated'] = 'never';
                }
            }

            // Find default groups belonging to this product
            $groups = $this->group->retrieve( array( 'entity' => 'product',
                                                     'entity_id'   => $product->id ) );
            foreach( $groups as $group ) {
                $data[$product->tag]['groups'][$group->id]['title'] = $group->title;
                $data[$product->tag]['groups'][$group->id]['is_plot']  = ($group->is_plot == '1') ? true : false ;
                $data[$product->tag]['groups'][$group->id]['is_number'] = ($group->is_number == '1') ? true : false ;
                $data[$product->tag]['groups'][$group->id]['is_default'] = true;
                $data[$product->tag]['groups'][$group->id]['category'] = $group->category;
                $data[$product->tag]['groups'][$group->id]['queries'] = array();

                // Retrieve the stored Qb queries in this group.
                $by_group = array( 'group_id' => $group->id );
                $queries = $this->query->retrieve( $by_group );

                foreach ( $queries as $query ) {
                    if ( is_null($query->references) || empty($query->references) ){
                        // This query is a standard non-reference one
                        // Append the Qb query and other meta-data into $data
                        $data[$product->tag]['groups'][$group->id]['queries'][$query->id]['title']    = $query->title;
                        $data[$product->tag]['groups'][$group->id]['queries'][$query->id]['colour']   = $query->colour;
                        $data[$product->tag]['groups'][$group->id]['queries'][$query->id]['qb_query'] = $query->query_qb;
                        $data[$product->tag]['groups'][$group->id]['queries'][$query->id]['bz_query'] = $query->query_bz;

                        // Determine the query data source
                        $data[$product->tag]['groups'][$group->id]['queries'][$query->id]['source']   = $this->_query_source( $data[$product->tag]['groups'][$group->id]['queries'][$query->id] );        

                    } else {
                        // This query is a reference one. It references a parent query.
                        // Append referenced version's ID as a property to parent query's object in $data
                        $reference = explode(',', $query->references);
                        $parent_id = $reference[0];
                        $ref_version_id = $reference[1];
                        $data[$product->tag]['groups'][$group->id]['queries'][$parent_id]['reference'] = $ref_version_id;           
                    }
                }
            }
        }
        // Adding the list of categories
        $data['categories'] = array();
        $groups = $this->group->retrieve();
        
        foreach ($groups as $group) {
            // Add the category to the categories if not in it already
            if (empty($data['categories']) || !in_array($group->category, $data['categories'])) {
                array_push($data['categories'], $group->category);
            }
        }

        // Send the resulting data array into the view
        $this->blade->render('overview', 
            array(
                'data' => $data
            )
        );
    }

    // returns the determined source of the query
    private function _query_source( $query = array() ) {
        $source = 'bugzilla';
        if (!is_null(json_decode($query['qb_query']))) {
            if (property_exists(json_decode($query['qb_query']), 'source')) {
                $source = json_decode($query['qb_query'])->source;
            }
        }
        return $source;
    }
}