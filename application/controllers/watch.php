<?php // if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Watch extends CI_Controller {

    function __construct() {
        parent::__construct();
        // Autoloaded Config, Helpers, Models 
    }
    
    public function single( $product_tag = '', $version_tag = '' ) {    
        // Validate Product and Version 
        // Return lost page if either are not found in the DB
        // If all is well, we have 2 objects for product and version
        log_message('info', 'Accessing controller function in /watch.php/single');
        
            $product = $this->product->retrieve( 
                array( 
                    'tag' => $product_tag 
                ) 
            );
            
            if ( empty($product) ) {
                $this->load->view('templates/404_not_found');
                return; 
            } else {
                $product = $product[0];    
            }

            $by_version_tag = array( 
                    'tag' => $version_tag, 
                    'product_id' => $product->id );
            $version = $this->version->retrieve( $by_version_tag );
            if ( empty($version) ) {
                $this->load->view('templates/404_not_found'); 
                return;
            } else {
                $version = $version[0];
            }
        // End of validation. 
        // $product and $version are available now

        // Initializing a data variable that becomes coreData JSON
        $data = array();
        $data['id'] = $version->id;
        $data['title'] = $version->title;
        $data['product'] = array(   
            'id' => $product->id,
            'tag'        => $product->tag,
            'title'      => $product->title,
            'components' => $product->components,
            'versions'   => $this->version->retrieve( array(
                    'product_id' => $product->id
                )
            )
        );
        $data['channel'] = $this->channel->for_version( $version->id );
        $data['groups'] = array();

        // Adding the list of categories
        $data['categories'] = array();
        
        // Retrieving default groups by product
        $by_product = array( 
            'entity'    => 'product',
            'entity_id' => $product->id 
        );
        
        $groups_by_product = $this->group->retrieve( $by_product );
        $data = $this->_groups_to_data( $data, $version, $groups_by_product, true );


        $groups_all = $this->group->retrieve();

        foreach ( $groups_all as $group ) {
            // Add the category to the categories if not in it already
            if (empty($data['categories']) || !in_array($group->category, $data['categories'])) {
                array_push($data['categories'], $group->category);
            }

        }

        // Retrieving custom groups by version
        $by_version = array( 
            'entity'    => 'version',
            'entity_id' => $version->id 
        );
        

        $groups_by_version = $this->group->retrieve( $by_version );
        $data = $this->_groups_to_data( $data, $version, $groups_by_version );
        

        $this->blade->render('watch_single', 
            array(
                'data' => $data,
                'comments' => $this->comment->retrieve(
                    array(
                        "version_id" => $version->id
                    )
                )
            )
        );
    }

    // Receives an existing data array
    // Appends version + group data before returning that data array
    // Takes care of both default groups and custom groups, specify in fourth parameter
    private function _groups_to_data( $data = array(), $version = array(), $groups = array(), $is_default = false ) {
        $hard_refresh = 0;
        if ( isset($_GET['refresh']) ) {
            $hard_refresh = $_GET['refresh'];
        }
        
        foreach ( $groups as $group ) {
            $group_title = replace_version_attr( $group->title, $version );

            $data['groups'][$group->id]['title'] = $group_title; // Change this as needed
            $data['groups'][$group->id]['is_plot']  = ($group->is_plot == '1') ? true : false ;
            $data['groups'][$group->id]['is_number'] = ($group->is_number == '1') ? true : false ;
            $data['groups'][$group->id]['has_rule'] = file_exists( FCPATH.'assets/rules/rule_'.$group->id.'.js' );
            $data['groups'][$group->id]['queries'] = array();    

            if ( $is_default ) {
                $data['groups'][$group->id]['is_default'] = true;
            } else {
                $data['groups'][$group->id]['is_default'] = false;    
            }
            
            // Retrieve the stored Qb queries in this group.
            $by_group = array( 
                'group_id' => $group->id 
            );
            
            $queries = $this->query->retrieve( $by_group );

            $count_main_queries = 0;

            foreach ( $queries as $query ) {
                $query_title = '';
                $query_bugzilla = '';
                $transformed_query = '';

                if ( is_null($query->references) || empty($query->references) ){
                    // This query is a standard non-reference one
                    // Append the Qb query and other meta-data into $data
                    $query_title = replace_version_attr( $query->title, $version );
                    $query_bugzilla = replace_version_attr( $query->query_bz, $version );

                    // Replace soft timestamps with current timestamp and birthday
                    $transformed_query = $query->query_qb;
                    $transformed_query = replace_version_attr( $transformed_query, $version );
                        
                    $birthday = $this->version->get_birthday( $version->id );
                    $shipday = $this->version->get_shipday( $version->id );
                    $transformed_query = replace_birthday( $transformed_query, $birthday );
                    $transformed_query = replace_timestamp( $transformed_query, $shipday );

                    //  Append the Qb queries and other meta-data into $data
                    $data['groups'][$group->id]['queries'][$query->id]['is_reference']= false;
                    $data['groups'][$group->id]['queries'][$query->id]['raw']         = array(
                        'title' => $query->title,
                        'qb_query' => $query->query_qb,
                        'bz_query' => $query->query_bz
                    );
                    
                    $count_main_queries++;

                } else {
                    // This query is a reference one. It references a parent query.
                    // Retrieve the parent query to inherit the Qb query (soft tagged)
                    // Soft tags on the inherited Qb replaced by referenced version's data
                    // Append the reference query as an individual query on the group object in $data
                    $references = explode(',', $query->references) ;
                    $parent_id  = $references[0];
                    $ref_version_id = $references[1];

                    // Grabbing the parent query
                    $parent_query = $this->query->retrieve( 
                        array(
                            'id' => $parent_id
                        )
                    );
                    
                    $parent_query = $parent_query[0];

                    // Grabbing the a referenced past version.
                    $ref_version = $this->version->retrieve( 
                        array(
                            'id' => $ref_version_id
                        )
                    );
                    
                    $ref_version = $ref_version[0];
                    // $ref_version = 1;

                    $query_title = replace_version_attr( $query->title, $ref_version );
                    
                    // Replace soft timestamps with referenced versions' birthday and last shipday
                    $transformed_query = $parent_query->query_qb;
                    $transformed_query = replace_version_attr( $transformed_query, $ref_version );
                        
                    $birthday = $this->version->get_birthday( $ref_version->id );
                    // $birthday = 1 ;

                    $shipday = $this->version->get_shipday( $ref_version->id );
                    // $shipday = 1 ;

                    $transformed_query = replace_birthday( $transformed_query, $birthday );
                    $transformed_query = replace_timestamp( $transformed_query, $shipday );

                    // Append the Qb queries and other meta-data into $data
                    $data['groups'][$group->id]['queries'][$query->id]['is_reference']= true;                    
                    $data['groups'][$group->id]['queries'][$query->id]['ref_query']   = $parent_id;
                    $data['groups'][$group->id]['queries'][$query->id]['ref_version'] = $ref_version_id;
                }
                
                // Append the data prepared from the above IF ELSE statement
                $data['groups'][$group->id]['queries'][$query->id]['title']       = $query_title;
                $data['groups'][$group->id]['queries'][$query->id]['colour']      = $query->colour;
                $data['groups'][$group->id]['queries'][$query->id]['qb_query']    = $transformed_query;
                $data['groups'][$group->id]['queries'][$query->id]['bz_query']    = $query_bugzilla;
                $data['groups'][$group->id]['queries'][$query->id]['es_data']     = ($hard_refresh == 1) ? '' : $this->cache_es_data->retrieve_valid_cache($query->id,$version->id);
                
                // Determine the query data source
                $data['groups'][$group->id]['queries'][$query->id]['source']      = $this->_query_source( $data['groups'][$group->id]['queries'][$query->id] );        

            }
            // Done looping and loading the queries into the group
            // If group only has one query (excluding any references), enable component breakdown view
            $data['groups'][$group->id]['enableComponents'] = ($count_main_queries == 1) ? true : false ;

            // Use the databse category as the category
            $data['groups'][$group->id]['category'] = $group->category; 


        }



        return $data;
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