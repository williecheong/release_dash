jQuery(document).ready(function($) {

    /*********************************
        JUST SETTING UP THE PAGE HERE
    *********************************/
        // Initializing duckster gridster
        var gridsterWidth = $('.gridster').width();
        if ( gridsterWidth  < 600 ){
            // Mobile sized grids for single columns
            $(".gridster ul").gridster({
                widget_margins: [ gridsterWidth*0.027, gridsterWidth*0.027 ],
                widget_base_dimensions: [ gridsterWidth*0.2775, gridsterWidth*0.2775 ]
            });
        } else {
            // Desktop big screens for triple columns
            $(".gridster ul").gridster({
                widget_margins: [ gridsterWidth*0.009, gridsterWidth*0.009 ],
                widget_base_dimensions: [ gridsterWidth*0.0925, gridsterWidth*0.0925 ]
            });
        }

        // Initializes the bootstrap modals
        $('.modal#new-group').modal({
            show : false 
        });
        
        $('.modal#old-group').modal({ 
            show : false
        });
        
        $('.modal#rule-boilerplate').modal({
            show : false
        });

        // Contains all group specific options for aggregating release readiness score
        //      Object index is set to use group_id
        var aggregateOptions = {};

    /*********************************
        SAVING NEW GROUPS AND QUERIES
    *********************************/
        // Brings up the modal for adding a new group
        $('.btn#add-new-group').click(function(){
            $('.modal#new-group').modal('toggle');
        });

        // Append a new HTML query template for the group
        var new_query_unique_counter = 0;
        $('.btn#new-query-template').click( function() {
            new_query_unique_counter++;
            var thisNum = new_query_unique_counter;
            $('.modal#new-group').find('form').append( templateNewGroup( thisNum ));

            // Initializing remove button for this new item
            $('button#remove-new-query').click(function(){
                $(this).closest('div.new-query').remove();
            });
            // Initializing colorpicker for this new item
            $(".colourpicker[id='"+thisNum+"']").spectrum({
                showInput: false,
                preferredFormat: 'hex6',
                clickoutFiresChange: true,
                showButtons: false,
                move: function(color) {
                    $(".colourpicker[id='"+thisNum+"']").css( 'color', color.toHexString() );
                }
            });
        });

        // Proceed to execute and save the group
        $('.btn#save-new-group').click(function(){
            $this = $(this);
            $this.addClass('disabled');

            // Retrieving input group values into saveGroup
            var saveGroup = {};
            saveGroup = {
                group_entity : "version",
                group_entity_id : coreData['id'],
                group_title : $.trim( $('#new-group-name').val() ),
                group_is_plot : $('#new-group-is-plot:checked').length,
                group_is_number : $('#new-group-is-number:checked').length,
                group_queries : {} 
            };
            // End of retrieving input group values into saveGroup

            // Validation for the new group's input values
            if ( saveGroup['group_title'] == '' ) {
                alert( "Group name cannot be empty." );
                $this.removeClass('disabled');
                return false;
            }
            
            if ( (saveGroup['group_is_plot'] + saveGroup['group_is_number']) == 0 ) {
                alert( "Group has to be either a plot or number." );
                $this.removeClass('disabled');
                return false;
            }
            
            if ( $('.new-query').length == 0 ) {
                // Checks that there is at least one new query
                alert( "No queries found." );
                $this.removeClass('disabled');
                return false;
            } 
            // End of validation for the new group's input values

            // Looping through the input queries to retrieve and check them
            var queryError = false;
            $.each( $('.new-query'), function(key, value){ 
                // Retrieving input group query's values into saveGroup
                var tempColor = rgb2hex( $('.new-query#'+value.id).find('button.colourpicker').css('color') );
                saveGroup.group_queries[value.id] = {
                    query_title     : $.trim( $('.new-query#'+value.id).find('input#new-query-name').val() ),
                    query_colour    : tempColor,
                    query_query_bz  : $('.new-query#'+value.id).find('input#new-query-bz').val(),
                    query_query_qb  : $('.new-query#'+value.id).find('textarea#new-query-qb').val(),
                    ref_version     : $('.new-query#'+value.id).find('select#new-query-reference option:selected').val(),
                    ref_colour       : shadeColor(tempColor, 45)
                };
                // End of retrieving input group query's values into saveGroup

                // Validation for the group query's input values
                if ( saveGroup.group_queries[value.id].query_title == '' ) {
                    alert( 'Query name cannot be empty.' );
                    queryError = true;
                }

                if ( typeof saveGroup.group_queries[value.id].ref_version == 'undefined' ) {
                    saveGroup.group_queries[value.id].query_query_references = 'none';
                }

                var isJSON = validateJSON( saveGroup.group_queries[value.id].query_query_qb );
                if ( !isJSON ) {
                    alert("Qb query must be JSON");
                    queryError = true;
                }
                // End of validation for group query's input values
            });

            // Return if there was failed checks while looping through queries
            if ( queryError ) {
                $this.removeClass('disabled');
                return false;
            }

            $.ajax({
                url: '/api/groups',
                type: 'POST',
                data: saveGroup,
                success: function(response) {
                    if ( response == 'OK' ) {
                        $this.html('<i class="fa fa-check"></i> Success');
                        setTimeout(function() {
                            // Refresh page after 1.5 seconds
                            $this.html('<i class="fa fa-refresh"></i> Refreshing');
                            location.reload();
                        }, 1500);
                    }

                    console.log(response);
                }, 
                error: function(response) {
                    alert('Fail: API could not be reached.');
                    $this.removeClass('disabled');
                    console.log(response);
                }
            });
        });

    /*****************************************
        EDITING EXISTING GROUPS AND QUERIES
    *****************************************/
        // Brings up the modal for adding a new group
        $('.btn#edit-old-group').click(function(){
            var groupID = $(this).data('group-id');
            var thisGroup = coreData.groups[groupID];

            // Clean up modal from prior viewing of existing groups
            $('.modal#old-group').find('div.old-query').remove();

            // Setting the values inside the modal's form fields
            $('.modal#old-group').find('input#group-id').val( groupID );
            $('.modal#old-group').find('input#group-name').val( thisGroup.title );

            if ( thisGroup.is_plot ) {
                $('.modal#old-group').find('input#group-is-plot').prop( "checked", true );
            } else {
                $('.modal#old-group').find('input#group-is-plot').prop( "checked", false );
            }

            if ( thisGroup.is_number ) {
                $('.modal#old-group').find('input#group-is-number').prop( "checked", true );
            } else {
                $('.modal#old-group').find('input#group-is-number').prop( "checked", false );
            }
            
            $.each( thisGroup.queries, function( key, value ){
                if ( value.is_reference ){
                    setTimeout(function(){
                        $('.modal#old-group').find('div.old-query#q'+value.ref_query).find('select#old-query-reference option[value="'+value.ref_version+'"]').prop("selected", true);
                    }, 100);
                } else {
                    // Append the html for each query
                    $('.modal#old-group').find('form').append( templateOldGroup( key, value ) );
                }
            });

            $('.btn#delete-old-group').data( 'group-id', groupID );
            // End of setting values in the modal form

            // Disable all the fields here
            $('.modal#old-group').find('input').attr('disabled', true);
            $('.modal#old-group').find('select').attr('disabled', true);
            $('.modal#old-group').find('textarea').attr('disabled', true);

            // Fields are populated and disabled. Show modal.
            $('.modal#old-group').modal('toggle');
        });
        
        // Proceed to execute and delete the group
        $('.btn#delete-old-group').click(function(){
            $this = $(this);
            $this.addClass('disabled');
            var groupID = $this.data('group-id');

            $.ajax({
                url: '/api/groups/index/' + groupID ,
                type: 'DELETE',
                success: function(response) {
                    if ( response == 'OK' ) {
                        $this.html('<i class="fa fa-check"></i> Success');
                        setTimeout(function() {
                            // Refresh page after 1.5 seconds
                            $this.html('<i class="fa fa-refresh"></i> Refreshing');
                            location.reload();
                        }, 1500);
                    }

                    console.log(response);
                }, 
                error: function(response) {
                    alert('Fail: API could not be reached.');
                    $this.removeClass('disabled');
                    console.log(response);
                }
            });
        });

    /*********************************
        GETTING THE RULES BOILERPLATE FOR GROUP
    *********************************/
        // Brings up the modal with the rules boilerplate
        $('.btn#get-rule-boilerplate').click(function(){
            var groupID = $(this).data('group-id');
            
            // Setting up the rule boilerplate modal
            $('span#rule-group-title').html( coreData.groups[groupID].title );
            $('.form-control-static#rule-file-name').html( '/assets/rules/rule_'+groupID+'.js' );
            $('textarea#rule-script').html( templateRuleBoilerplate( groupID ) );
            // End of setting up the rule boilerplate modal

            $('.modal#rule-boilerplate').modal('toggle');
        });

    /*****************************
        MAKE LIFE AWESOME FUNCTIONS
    *****************************/

        function templateNewGroup ( number ) {
            var refOptions = '';
            $.each( coreData.product.versions, function(key, version){
                if ( parseInt(version.id) < parseInt(coreData.id) ) {
                    refOptions += '<option value="'+version.id+'">'+version.title+'</option>';
                }
            });

            var html = '<div class="new-query" id="q'+ number +'">'+
                            '<button type="button" class="btn btn-xs btn-default" id="remove-new-query">'+
                                '<i class="fa fa-times"></i>'+
                            '</button>'+
                            '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="new-query-name">Query Name</label>'+
                                '<div class="col-sm-9 controls">'+
                                    '<div class="input-group">'+
                                        '<input type="text" class="form-control" id="new-query-name" placeholder="Description for this query.">'+
                                        '<span class="input-group-btn">'+
                                            '<button class="btn btn-default colourpicker" type="button" id="'+number+'">'+
                                                '<i class="fa fa-tint fa-lg"></i> Color'+
                                            '</button>'+
                                            '<em id="colorpicker-log"></em>'+
                                        '</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="new-query-reference">References</label>'+
                                '<div class="col-sm-9 controls">'+
                                   '<select class="form-control" id="new-query-reference">'+
                                        '<option value="none">None</option>'+
                                        refOptions+
                                    '</select>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="new-query-bz">Bugzilla URL</label>'+
                                '<div class="col-sm-9">'+
                                    '<input class="form-control" id="new-query-bz" placeholder="URL that links to this query in Bugzilla.">'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="new-query-qb">Qb Query</label>'+
                                '<div class="col-sm-9">'+
                                    '<textarea class="form-control" rows="3" id="new-query-qb" placeholder="Query in Qb format as a json object."></textarea>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
            return html;
        }

        function templateOldGroup ( query_id, query ) {
            var refOptions = '';
            $.each( coreData.product.versions, function(key, version){
                if ( parseInt(version.id) < parseInt(coreData.id) ) {
                    refOptions += '<option value="'+version.id+'">'+version.title+'</option>';
                }
            });

            var html = '<div class="old-query" id="q'+ query_id +'">'+
                            '<div class="form-group">'+
                                '<input type="hidden" class="form-control" id="query-id">'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="query-name">Query Name</label>'+
                                '<div class="col-sm-9 controls" >'+
                                    '<div class="input-group">'+
                                        '<input type="text" class="form-control" id="query-name" placeholder="Description for this query." value="'+query.title+'">'+
                                        '<span class="input-group-btn">'+
                                            '<button class="btn btn-default colourpicker" type="button" id="q'+query_id+'" style="color:'+query.colour+';">'+
                                                '<i class="fa fa-tint fa-lg"></i> Color'+
                                            '</button>'+
                                            '<em id="colorpicker-log"></em>'+
                                        '</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="old-query-reference">References</label>'+
                                '<div class="col-sm-9 controls">'+
                                   '<select class="form-control" id="old-query-reference">'+
                                        '<option value="none">None</option>'+
                                        refOptions+
                                    '</select>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="query-bz">Bugzilla URL</label>'+
                                '<div class="col-sm-9">'+
                                    '<input class="form-control" id="query-bz" value="'+query.bz_query+'" placeholder="URL that links to this query in Bugzilla.">'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="query-qb">Qb Query</label>'+
                                '<div class="col-sm-9">'+
                                    '<textarea class="form-control" rows="3" id="query-qb" placeholder="Query in Qb format as a json object.">'+query.qb_query+'</textarea>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
            return html;
        }

        function templateRuleBoilerplate ( group_id ) {
            var tempNames = ["alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa", "lambda", "mu"];

            var variables = '';
            var i = 0;
            $.each( coreData.groups[group_id].queries, function( query_id, query ){
                variables += ''+
                '        // Data for Query: ' + query.title + '\n' +
                '    var '+tempNames[i]+' = coreData.groups['+group_id+'].queries['+query_id+'].es_data;\n';
                i++;
            });
            
            var html = ''+
                '/**************************\n'+
                'Options to determine how this group will aggregate into release readiness score for this version\n'+
                '**************************/\n'+
                'aggregateOptions['+group_id+'] = {\n'+
                '    "isInsignificant"  : false,   // if set to true, version score will not be affected by this group\n'+
                '    "isShipwrecker"    : false    // if set to true, version is immediately red if this group is red\n'+     
                '};\n'+
                '\n'+
                '/**************************\n'+
                'Warning: Do not change the function name\n'+
                '**************************/\n'+
                'function rule_'+group_id+'() {\n'+
                '    // Gets the channel tag e.g. release, beta, aurora, etc \n'+
                '    var channel = coreData.channel.tag;\n'+
                '\n'+
                '    // Defining the data available in this group\n'+
                '    // Rename the variables to better fit your context\n'+
                variables +
                '\n'+
                '    // Write scripts to manipulate group data here.\n'+
                '\n'+
                '    // Set the conditions that determine what to return\n'+
                '    // Recognized return values = [green", "yellow", "red"]\n'+
                '    // OR return any preferred custom colours in a valid CSS format\n'+
                '    if ( false ) {\n'+
                '        return "red";\n'+
                '    } else if ( false ) { \n'+
                '        return "yellow"\n'+
                '    } else {\n'+
                '        return "green";\n'+
                '    } \n'+
                '}\n'+
                '\n'+
                '/****************\n'+
                'Optional: Custom helper functions to use above\n'+
                'To prevent conflicts with other functions on this dashboard\n'+
                'Please follow this naming convention - rule_'+group_id+'_whateverYouWant()\n'+
                '****************/\n'+
                '\n'+
                '\n';
            return html;
        }
});
