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

        $('.modal#component-breakdowns').modal({
            show : false
        });

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

            // validateGroup returns false if OK
            // Returns a message string if not OK
            var groupError = validateGroup( saveGroup, 'new' );
            if ( groupError ) {
                alert( groupError );
                $this.removeClass('disabled');
                return false;
            }
            // End of validation for the new group's input values

            // Looping through the input queries to retrieve and check them
            var queryError = [];
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

                if ( typeof saveGroup.group_queries[value.id].ref_version == 'undefined' ) {
                    saveGroup.group_queries[value.id].query_query_references = 'none';
                }

                // Validation for the group query's input values
                var tempError = validateQuery( saveGroup.group_queries[value.id] );
                if ( tempError ) {
                    queryError.push( tempError );
                }
                // End of validation for group query's input values
            });

            // Return if there was failed checks while looping through queries
            if ( queryError.length > 0 ) {
                alert( queryError.join("\n") );
                $this.removeClass('disabled');
                return false;
            }
            
            var r = confirm("Confirm saving this group?");
            if ( r == true ) {
                // User clicked OK
                // Proceed to save this group
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
            } else {
                $this.removeClass('disabled');               
            }
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
                    
                    // Initializing colorpicker for this new item
                    $(".colourpicker[id='q"+key+"']").spectrum({
                        showInput: false,
                        preferredFormat: 'hex6',
                        clickoutFiresChange: true,
                        showButtons: false,
                        move: function(color) {
                            $(".colourpicker[id='q"+key+"']").css( 'color', color.toHexString() );
                        }
                    });
                }
            });

            $('.btn#delete-old-group').data( 'group-id', groupID );
            $('.btn#update-old-group').data( 'group-id', groupID );
            // End of setting values in the modal form

            // Fields are populated and disabled. Show modal.
            $('.modal#old-group').modal('toggle');
        });
        
        // Proceed to update the group
        $('.btn#update-old-group').click(function(){
            $this = $(this);
            $this.addClass('disabled');
            var groupID = $this.data('group-id');

            // Retrieving input group values into saveGroup
            var saveGroup = {};
            saveGroup = {
                group_id : groupID,
                group_title : $.trim( $('#group-name').val() ),
                group_is_plot : $('#group-is-plot:checked').length,
                group_is_number : $('#group-is-number:checked').length,
                group_queries : {} 
            };
            // End of retrieving input group values into saveGroup

            // validateGroup returns false if OK
            // Returns a message string if not OK
            var groupError = validateGroup( saveGroup, 'old' );
            if ( groupError ) {
                alert( groupError );
                $this.removeClass('disabled');
                return false;
            }
            // End of validation for the group's input values

            // Looping through the input queries to retrieve and check them
            var queryError = [];
            $.each( $('.old-query'), function(key, value){ 
                // Retrieving input group query's values into saveGroup
                var tempColor = rgb2hex( $('.old-query#'+value.id).find('button.colourpicker').css('color') );
                saveGroup.group_queries[value.id] = {
                    query_title     : $.trim( $('.old-query#'+value.id).find('input#query-name').val() ),
                    query_colour    : tempColor,
                    query_query_bz  : $('.old-query#'+value.id).find('input#query-bz').val(),
                    query_query_qb  : $('.old-query#'+value.id).find('textarea#query-qb').val()
                };
                // End of retrieving input group query's values into saveGroup

                if ( typeof saveGroup.group_queries[value.id].ref_version == 'undefined' ) {
                    saveGroup.group_queries[value.id].query_query_references = 'none';
                }

                // Validation for the group query's input values
                var tempError = validateQuery( saveGroup.group_queries[value.id] );
                if ( tempError ) {
                    queryError.push( tempError );
                }
                // End of validation for group query's input values
            });

            // Return if there was failed checks while looping through queries
            if ( queryError.length > 0 ) {
                alert( queryError.join("\n") );
                $this.removeClass('disabled');
                return false;
            }

            var r = confirm("Confirm saving this group?");
            if ( r == true ) {
                // User clicked OK
                // Proceed to save this group
                $.ajax({
                    url: '/api/groups',
                    type: 'PUT',
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
            } else {
                $this.removeClass('disabled');               
            }

        });

        // Proceed to execute and delete the group
        $('.btn#delete-old-group').click(function(){
            $this = $(this);
            $this.addClass('disabled');
            var groupID = $this.data('group-id');

            var r = confirm("Confirm deleting this group?");
            if ( r == true ) {
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
            } else {
                $this.removeClass('disabled');               
            }
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

    /*********************************
        GETTING THE COMPONENT BREAKDOWN FOR GROUP
    *********************************/
        var breakdown_groupID ;
        // Brings up the modal with the component breakdowns
        $('.btn#get-component-breakdowns').click(function(){
            var groupID = $(this).data('group-id');
            breakdown_groupID = groupID
            // Setting up the component breakdown modal
            $('span#breakdown-group-title').html( coreData.groups[groupID].title );
            $('.breakdown-graph .breakdown-y-axis').html('');
            $('.breakdown-graph .breakdown-plot').html('');
            $('.breakdown-table').addClass('text-center').addClass('not-ready').html('<img src="/assets/img/mozchomp.gif"><div class="breakdown-loading"></div>');
            // End of setting up the component breakdown modal

            $('.modal#component-breakdowns').modal('toggle');
            
        });

        $('.modal#component-breakdowns').on('shown.bs.modal', function(e) {
            initializeBreakdown(breakdown_groupID);           
        });


        $('.modal#component-breakdowns').on('hidden.bs.modal', function(e) {
            $('span#breakdown-group-title').html('');
            $('.breakdown-graph .breakdown-y-axis').html('');
            $('.breakdown-graph .breakdown-plot').html('');
            $('.breakdown-table').removeClass('text-center').removeClass('not-ready').html('');               
        });

    /*****************************
        HANDLING THE COMMENT MODAL FOR VERSION
    *****************************/
        $('.btn#save-comment').click(function(){
            $this = $(this);
            $this.addClass('disabled');
            
            var r = confirm("Confirm saving this comment?");
            if ( r == true ) {
                $.ajax({
                    url: '/api/comments',
                    type: 'POST',
                    data: {
                        version_id : coreData['id'],
                        version_comment : $('textarea.input-comment').val()
                    },
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
            } else {
                $this.removeClass('disabled');               
            }
        });        

    /*****************************
        MAKE LIFE AWESOME FUNCTIONS
    *****************************/
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
