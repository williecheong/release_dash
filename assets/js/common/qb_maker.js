/******************
    Outputs a Qb query in JSON
    Based on BZ search HTML 
    With pre-filled params
******************/

    /*****************
        High level function that is being called
        Handles all the coordination and simple work
    *****************/
        function bzSearchToQb( html, start, end, cluster ){
            var qbQuery = {};

            qbQuery.from    = cluster;
            
            qbQuery.select  = {
                    "name": "num",
                    "value": "bug_id",
                    "aggregate": "count"
                };

            // Replace password fields with text fields in the HTML
            // Prevents false security errors from appearing in console
            html = html.replace('type="password"', 'type="text"');
            $extract = $('form#queryform', html);
            qbQuery.esfilter = parseBzSearch( $extract );

            qbQuery.edges = [{
                    "range": {
                        "min": "modified_ts",
                        "max": "expires_on"
                    },
                    "domain": {
                        "type": "date",
                        "min": start,
                        "max": end,
                        "interval": "day"
                    }
                }];

            return JSON.stringify( qbQuery, null, '\t' ).replace(/"@birthday"/g, '@birthday').replace(/"@timestamp"/g, "@timestamp");
        }

    /****************** 
        Applies jQuery to extract Bugzilla search params from HTML
    ******************/
        function parseBzSearch( $subject ){
            var esfilterObj = {};
            esfilterObj.and = [];
            var tempVal = '';

            /******************
                Parses top most summary input (needs regex filter)
            ******************/
                tempVal = $subject.find('div#summary_field input#short_desc').val() ;
                if ( tempVal ){
                    var tempOpr = $subject.find('div#summary_field select[name="short_desc_type"]').val();
                    var terms = fovQb( 'short_desc', tempOpr, tempVal );
                    esfilterObj.and.push( terms );
                }
            /******************
                End of parsing top most summary input (needs regex filter)
            ******************/


            /****************** 
                Parses the two rows of multi-select grids
            ******************/
                var search_field_grid = [ 
                    'classification', 
                    'product', 
                    'component', 
                    'bug_status', 
                    'resolution', 
                    'version', 
                    'target_milestone', 
                    'bug_severity', 
                    'priority', 
                    'rep_platform', 
                    'op_sys' 
                ];
                $.each( search_field_grid, function( key, gridName ){
                    tempVal = $subject.find('div#container_'+ gridName +' select#'+ gridName +' option:selected').map(function(){return $(this).val();}).get() ;  
                    if ( tempVal.length > 0 ){
                        var terms = {};
                        
                        // search works on lower case only
                        $.each( tempVal, function( key, value ){
                            tempVal[key] = value.toLowerCase();
                        });
                        
                        terms[gridName] = tempVal;
                        esfilterObj.and.push( { "terms" : terms } );
                    }
                });
            /****************** 
                End of parsing the two rows of multi-select grids
            ******************/


            /******************
                Parses the six rows directly below "Detailed Bug Information"
            ******************/
                var search_field_row = [ 'longdesc', 'bug_file_loc', 'status_whiteboard', 'keywords', 'bug_id', 'votes' ];
                $.each( search_field_row, function( key, rowName ){
                    tempVal = $subject.find('div.search_field_row').find('input#'+rowName).val() ;  
                    console.log($subject.find('div.search_field_row').find('input#'+rowName));
                    console.log("tempVal: "+tempVal);
                    if ( tempVal.length > 0 ){
                        var tempOpr = '';
                        if ( rowName == 'votes' ){
                            tempOpr = $subject.find('div.search_field_row').find('input[name="votes_type"]').val();
                        } else {
                            tempOpr = $subject.find('div.search_field_row').find('select[name="'+rowName+'_type"] option:selected').val();
                        }

                        var terms = fovQb( rowName, tempOpr, tempVal );
                        esfilterObj.and.push( terms );
                    }
                });
            /******************
                End of parsing the six rows directly below "Detailed Bug Information"
            ******************/


            /*********************
                Parses the email search fields
            *********************/
                var search_email_fields = [ 1, 2, 3 ];
                var roles = [ 'assigned_to', 'reporter', 'qa_contact', 'cc', 'longdesc' ];
                $.each( search_email_fields, function( key, col ){
                    tempVal = $subject.find('div.search_email_fields').find('input#email'+col).val() ;
                    if ( tempVal.length > 0 ){
                        var subObj = {};
                        subObj.or = [];

                        var tempOpr = $subject.find('div.search_email_fields').find('select[name="emailtype'+col+'"] option:selected').val();
                        $.each( roles, function( key, role ){
                            var isChecked = $subject.find('div.search_email_fields').find('input#email'+role+col+':checked').length;
                            if ( isChecked > 0 ){
                                subObj.or.push( fovQb(role, tempOpr, tempVal) );
                            }
                        });

                        esfilterObj.and.push( subObj );
                    }
                });
            /*********************
                End of parsing the email search fields
            *********************/


            /*********************
                Parses the change history fields
            *********************/
                chFlds = $subject.find('select[name="chfield"] option:selected').map(function(){return $(this).val();}).get() ;  
                if ( chFlds.length > 0 ) {
                    var chObj = {};
                    chObj.and = [];

                    var start = $subject.find('input[name="chfieldfrom"]').val();
                    start = makeESDates( start );
                    startObj = {};
                    startObj["range"] = { "expires_on" : {"gte":start} };
                    chObj.and.push( startObj );
                    
                    var end   = $subject.find('input[name="chfieldto"]').val();
                    end   = makeESDates( end );
                    endObj = {};
                    endObj["range"] = { "modified_ts" : {"lte":end} };
                    chObj.and.push( endObj );

                    tempVal   = $subject.find('input[name="chfieldvalue"]').val();
                    var nestedObj = { 
                                        "nested": {
                                             "path": "changes",
                                             "query": {
                                                "filtered":{
                                                    "query":{ "match_all":{} },
                                                    "filter":{
                                                        "and":[
                                                            {"terms": {"changes.field_name" : chFlds  } },
                                                            {"term" : {"changes.new_value"  : tempVal } }
                                                        ]
                                                    }
                                                }
                                            }
                                        }
                                    };
                    chObj.and.push( nestedObj );
                    esfilterObj.and.push( chObj );
                }
            /*********************
                End of parsing the change history fields
            *********************/


            /*********************
                Parses the custom search section
            *********************/
                var customParams = '';
                var $customSearch = $subject.find('div#custom_search_filter_section');
                var clause = getCustomClause( $customSearch, 'j_top' );
                customParams += '{"'+clause+'":[';
                
                var hasNegatives = [];
                var openedBrackets = 1;
                $customSearch.find('div.custom_search_condition').each(function( key ){
                    var isOpened = $(this).find('input[type="hidden"][value="OP"]').length;
                    var isClosed = $(this).find('input[type="hidden"][value="CP"]').length;
                    
                    if ( isOpened > 0 ) {
                        if ( customParams.trim().charAt(customParams.length - 1) != '[' ) {
                            customParams += ',';
                        }

                        var isNot = $(this).find('input.custom_search_form_field[type="checkbox"]:checked').length;
                        if ( isNot > 0 ) {
                            customParams += '{"not":' ;
                            hasNegatives.push( true );
                        } else {
                            hasNegatives.push( false );
                        }

                        var hasClause = $(this).find('div.any_all_select select[name^="j"]').length ;
                        if ( hasClause > 0 ) {
                            var clauseName = $(this).find('select[name^="j"]').attr('name');
                            clause = getCustomClause( $(this), clauseName ) ;
                            customParams += '{"'+clause+'":[';
                        }
                        
                        openedBrackets++;
                    
                    } else if ( isClosed > 0 ) {
                        customParams += ']}';

                        var hasNegative = hasNegatives.pop();
                        if ( hasNegative ) {
                            customParams += '}';
                        }

                        openedBrackets--;

                    } else {
                        var hasClause = $(this).find('div.any_all_select select[name^="j"]').length ;
                        if ( hasClause > 0 ) {
                            var clauseName = $(this).find('select[name^="j"]').attr('name');
                            clause = getCustomClause( $(this), clauseName ) ;
                            customParams += '{"'+clause+'":[';
                        }
                        
                        var tempFld = $(this).find('select[name^="f"] option:selected').val();
                        if ( typeof tempFld != 'undefined' && tempFld != 'noop' ) {
                            var tempOpr = $(this).find('select[name^="o"] option:selected').val();
                            var tempVal = $(this).find('input[name^="v"]').val();

                            var isNot = $(this).find('input[name^="n"]:checked').length;
                            var subObj = fovQb(tempFld, tempOpr, tempVal) ;
                            if ( isNot > 0 ) {
                                var subObj = { "not" : subObj } ;
                            }

                            if ( customParams.trim().charAt(customParams.length - 1) != '[' ) {
                                customParams += ',';
                            }
                            customParams += JSON.stringify( subObj );
                        }
                    }
                });
                
                while ( openedBrackets > 0 ){
                    customParams += "]}";
                    
                    if ( hasNegatives.length > 0 ) {    
                        hasNegative = hasNegatives.pop();
                        if ( hasNegative ) {
                            customParams += '}';
                        }
                    }
                    openedBrackets--;
                }

                // Sometimes we get end up with multiple commas
                customParams = customParams.replace(/[,]+/g , ",");
                console.log("customParams: "+customParams);

                try {
                    var customJson = JSON.parse(customParams);
                    customJson = deleteEmpty( customJson );
                    console.log("customJson: "+customJson);

                    if ( !$.isEmptyObject(customJson) ) {
                        esfilterObj.and.push( customJson );        
                    }


                } catch (e) {
                    alert( "Failed: Could not parse custom fields" );
                    console.log(customParams);
                    console.log(e);
                }
            /*********************
                End of parsing the custom search section
            *********************/

            return esfilterObj;
        }

    /*****************
        Takes in a field, operator and value as strings
        Converts them to an appropriate ES compatible filter object
        Reference: http://www.elasticsearch.org/guide/en/elasticsearch/reference/0.90/query-dsl-filters.html
    *****************/
        function fovQb( field, operator, value ){    
            /*********************
            // Possible values for operator
                x "exact"             => is (found in emailing columns)
                x "equals"            => is equal to
                x "notequals"         => is not equal to
                x "anyexact"          => is equal to any of the strings
                x "substring"         => contains the string
                x "casesubstring"     => contains the string (exact case)
                x "notsubstring"      => does not contain the string
                x "anywordssubstr"    => contains any of the strings
                x "allwordssubstr"    => contains all of the strings
                x "nowordssubstr"     => contains none of the strings
                x "regexp"            => matches regular expression
                x "notregexp"         => does not match regular expression
                x "lessthan"          => is less than
                x "lessthaneq"        => is less than or equal to
                x "greaterthan"       => is greater than
                x "greaterthaneq"     => is greater than or equal to
                x "anywords"          => contains any of the words
                x "allwords"          => contains all of the words
                x "nowords"           => contains none of the words
                x "changedbefore"     => changed before
                x "changedafter"      => changed after
                x "changedfrom"       => changed from
                x "changedto"         => changed to
                  "changedby"         => changed by
                x "matches"           => matches
                x "notmatches"        => does not match
                x "isempty"           => is empty
                x "isnotempty"        => is not empty
            // End of possible values for operator
            *********************/
            var outer = {};
            value = value.toLowerCase().trim();
            
            if ( operator == 'equals' || operator == 'notequals' || operator == 'exact' ) {
                var inner = {};

                inner[field] = value;
                outer["term"] = inner;
                if ( operator == 'notequals' ) {
                    outer = { "not" : outer };
                }

            } else if ( operator == 'anyexact' ) {
                var inner = {};
                
                value = value.replace(/ /g, '');
                value = value.replace(/(,)+/g, ',');
                value = value.replace(/(^,)|(,$)/g, '');
                value = value.split(',');

                inner[field] = value;
                outer["terms"] = inner;
                outer = { "not" : outer };

            } else if ( operator == 'substring' || operator == 'casesubstring' || operator == 'notsubstring' ) {
                var inner = {};
                
                if ( operator == 'casesubstring' ) {
                    inner[field] = '(' + value.replace(/\W+/g, "") + ')+';
                } else {
                    // Unable to use regex case insensitive => /.../i 
                    inner[field] = '(' + value.replace(/\W+/g, "") + ')+';
                }

                outer['regexp'] = inner;
                if ( operator == 'notsubstring' ) {
                    outer = { "not" : outer };
                }

            } else if ( operator == 'anywordssubstr' || operator == 'allwordssubstr' || operator == 'nowordssubstr' || operator == 'anywords' || operator == 'allwords' || operator == 'nowords' ) {
                value = value.replace(/ /g, '');
                value = value.replace(/(,)+/g, ',');
                value = value.replace(/(^,)|(,$)/g, '');
                value = value.split(',');

                var clause = 'and';
                if ( operator == 'anywordssubstr' || operator == 'anywords' ) {
                    clause = 'or';
                }
                outer[clause] = [];

                $.each( value, function(key, arrayValue){
                    var inner = {};
                    // Unable to use regex case insensitive => /.../i 
                    inner[field] = '(' + arrayValue.replace(/\W+/g, "") + ')+';
                    outer[clause].push( {"regexp" : inner} );
                });

                if ( operator == 'nowordssubstr' || operator == 'nowords' ) {
                    outer = { "not" : outer };
                }

            } else if ( operator == 'regexp' || operator == 'matches' || operator == 'notregexp' || operator == 'notmatches' ) {
                var inner = {};
                
                inner[field] = value.replace(/\W+/g, "");
                outer["regexp"] = inner;
                if ( operator == 'notregexp' || operator == 'notmatches' ) {
                    outer = { "not" : outer };
                }

            } else if ( operator == 'greaterthan' || operator == 'greaterthaneq' || operator == 'lessthan' || operator == 'lessthaneq' ) {
                var inner = {};
                
                if ( operator == 'greaterthan' ) {
                    operator = 'gt';
                } else if ( operator == 'greaterthaneq' ) {
                    operator = 'gte';
                } else if ( operator == 'lessthan' ) {
                    operator = 'lt';
                } else if ( operator == 'lessthaneq' ) {
                    operator = 'lte';
                } 
                inner[operator] = value;
                outer[field] = inner;
                outer = { "range" : outer };

            } else if ( operator == 'changedbefore' || operator == 'changedafter' ) {
                var inner = {};
                
                value = makeESDates( value );
                if ( operator == 'changedafter' ) {
                    inner = { "expires_on" : {"gte":value} };
                } else {
                    inner = { "modified_ts" : {"lte":value} };
                }
                outer["range"] = inner;
            } else if ( operator == 'changedto' || operator == 'changedfrom' ) {
                var inner = {};
                
                inner = { "term" : {"changes.new_value":value} };
                if ( operator == 'changedfrom' ) {
                    inner = { "term" : {"changes.old_value":value} };
                }

                outer = { 
                            "nested": {
                                 "path": "changes",
                                 "query": {
                                    "filtered":{
                                        "query":{ "match_all":{} },
                                        "filter":{
                                            "and":[
                                                {"term": {"changes.field_name" : field  } },
                                                inner
                                            ]
                                        }
                                    }
                                }
                            }
                        };

            } else if ( operator == 'isempty' || operator == 'isnotempty' ) {
                var inner = {};
                
                inner["field"] = field ;
                outer["missing"] = inner;
                if ( operator == 'isnotempty' ) {
                    outer = { "not" : outer };
                }
            } else {
                var inner = {};
                
                // This should never happen
                inner[field] = value;
                outer[operator] = inner;
            }
            
            return outer;
        }


    /*****************
        Traverses through a json object and removes empty values and arrays
        Reference: http://stackoverflow.com/questions/15451290/remove-element-from-json-object
    *****************/    
        function deleteEmpty( obj ){
            $.each( obj, function(key, value){
                if ( typeof value == "object" && value.length > 0 ) {
                    deleteEmpty( value ); 
                } else if ( value.length == 0 ) {
                    delete obj[key];
                }
            });
            return obj;
        }

    /*****************
        Receives a date input extracted from Bugzilla
        Parses and converts to ES compatible 
        I.e. Milliseconds since epoch
        Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    *****************/
        function makeESDates( date ) {
            var dateValue = 0;

            if ( date == 'Now' ) {
                dateValue = new Date().getTime();
            } else {
                date = date.split('-');
                var year    = parseInt( date[0] );
                var month   = parseInt( date[1] ) - 1;
                var day     = parseInt( date[2] );
                dateValue = Date.UTC( year, month, day, 0, 0, 0 );
            }

            return parseInt( dateValue );
        }


    /*****************
        Extract selections from dropdown fields
        Where users are asked to choose whether to apply all or any (and / or)
    *****************/
        function getCustomClause( $subject, identifier ){
            var $clause = $subject.find('div.any_all_select select#'+identifier+' option:selected');
            var clauseValue = '';
            
            if ( $clause.length == 0 ) {
                clauseValue = 'and';
            } else {
                if ( $clause.val().toLowerCase() != 'or' ){ // Watch out for "and_g"
                    clauseValue = 'and';
                } else {
                    clauseValue = 'or';
                }
            }
            
            return clauseValue;
        }
