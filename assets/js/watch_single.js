/*********************************
    JUST SETTING UP THE PAGE HERE
*********************************/
    // Initializing duckster gridster
    var gridsterWidth = $('.gridster').width();
    $(".gridster ul").gridster({
        widget_margins: [ gridsterWidth*0.01, gridsterWidth*0.01 ],
        widget_base_dimensions: [ gridsterWidth*0.104, gridsterWidth*0.104 ]
    });

    // Initializes the modals
    $('.modal#new-group').modal({
        show : false
    });
    $('.modal#old-group').modal({
        show : false
    });
    $('.modal#rule-boilerplate').modal({
        show : false
    });

    // Toggles whatever element is inside "data-toggler"
    $('[data-mytoggler]').click(function(){
        var toToggle = $(this).data('mytoggler');
        $( toToggle ).toggle('fast');
    });

/*********************************
    SAVING NEW GROUPS AND QUERIES
*********************************/
    // Brings up the modal for adding a new group
    $('.btn#add-new-group').click(function(){
        // Cleaning up the new group modal if previous was successful
        if ( $('.btn#save-new-group').hasClass('previousSuccess') ) {
            $('.modal#new-group').find('input').val('');
            $('.modal#new-group').find('input[type="checkbox"]').prop('checked', false);
            $('.modal#new-group').find('div.new-query').remove();
            $('.modal#new-group').find('.btn#save-new-group').html('<i class="fa fa-save"></i> Save');
            $('.modal#new-group').find('.btn#save-new-group').removeClass('disabled');
            $('.modal#new-group').find('.btn#save-new-group').removeClass('previousSuccess');       
        }
        // End of cleaning up the new group modal

        $('.modal#new-group').modal('toggle');
    });

    // Append a new HTML query template for the group
    var new_query_unique_counter = 0;
    $('.btn#new-query-template').click(function(){
        new_query_unique_counter++;
        var thisNum = new_query_unique_counter;

        $('.modal#new-group').find('form').append( templateNewGroup( thisNum ));

        // Initializing remove button for this new item
        $('button#remove-new-query').click(function(){
            $(this).closest('div.new-query').remove();
        });
        // Initializing colorpicker for this new item
        $(".colourpicker[id='"+thisNum+"']").spectrum({
            showInput: true,
            preferredFormat: 'hex6',
            clickoutFiresChange: true,
            showButtons: false,
            move: function(color) {
                $(".colourpicker[id='"+thisNum+"']").css( 'color', color.toHexString() );
            }
        });
    });

    // Proceed to save the group
    $('.btn#save-new-group').click(function(){
        $this = $(this);
        $this.addClass('disabled');
        var saveGroup = {};

        saveGroup = {
            group_entity : "version",
            group_entity_id : coreData['id'],
            group_title : $.trim( $('#new-group-name').val() ),
            group_is_plot : $('#new-group-is-plot:checked').length,
            group_is_number : $('#new-group-is-number:checked').length,
            group_queries : {} 
        };

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
            alert( "No queries found." );
            $this.removeClass('disabled');
            return false;
        } 

        var queryError = false;
        $.each( $('.new-query'), function(key, value){ 
            saveGroup.group_queries[value.id] = {
                query_title     : $.trim( $('.new-query#'+value.id).find('input#new-query-name').val() ),
                query_colour    : $('.new-query#'+value.id).find('button.colourpicker').css('color'),
                query_query_bz  : $('.new-query#'+value.id).find('input#new-query-bz').val(),
                query_query_qb  : $('.new-query#'+value.id).find('textarea#new-query-qb').val()
            };

            // Validation for the group queries' input values
            if ( saveGroup.group_queries[value.id].query_title == '' ) {
                alert( 'Query name cannot be empty.' );
                $this.removeClass('disabled');
                queryError = true;
            }
        });
        if ( queryError ) {
            return false;
        }

        $.ajax({
            url: '/api/groups',
            type: 'POST',
            data: saveGroup,
            success: function(response) {
                if ( response == 'OK' ) {
                    $this.addClass('previousSuccess');
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
        var thisGroup = coreData.query_groups[groupID];

        // Cleaning up the modal from prior use
        $('.modal#old-group').find('form div.old-query').remove();
        $('.btn#delete-old-group').removeClass('disabled');
        $('.btn#delete-old-group').html('<i class="fa fa-times"></i> Delete');
        // End of cleaning up the modal from prior use

        // Setting the values inside the modal's form fields
        $('.modal#old-group').find('input#group-id').val( groupID );
        $('.modal#old-group').find('input#group-name').val( thisGroup.title );

        if ( thisGroup.is_plot == '1' ) {
            $('.modal#old-group').find('input#group-is-plot').prop( "checked", true );
        } else {
            $('.modal#old-group').find('input#group-is-plot').prop( "checked", false );
        }

        if ( thisGroup.is_number == '1' ) {
            $('.modal#old-group').find('input#group-is-number').prop( "checked", true );
        } else {
            $('.modal#old-group').find('input#group-is-number').prop( "checked", false );
        }
        
        $.each( thisGroup.queries, function( key, value ){
            // Append the html for each query
            $('.modal#old-group').find('form').append( templateOldGroup( key, value ) );
        });

        $('.btn#delete-old-group').attr( 'data-group-id', groupID );
        // End of setting values in the modal form

            // ONLY TEMPORARY DISABLER
                $('.modal#old-group').find('input').attr('disabled', true);
                $('.modal#old-group').find('textarea').attr('disabled', true);
            // END OF TEMPORARY DISABLER

        // Fields are populated now.
        // Bring out that modal.
        $('.modal#old-group').modal('toggle');
    });
    
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
        $('span#rule-group-title').html( coreData.query_groups[groupID].title );
        $('.form-control-static#rule-file-name').html( '/assets/rules/rule_'+groupID+'.js' );
        $('textarea#rule-script').html( templateRuleBoilerplate( groupID ) );
        // End of setting up the rule boilerplate modal

        $('.modal#rule-boilerplate').modal('toggle');
    });

/*************************************
    ES RETRIEVAL
*************************************/
    function startLoading() {
        $.each( coreData.query_groups, function( group_id, group_value ) {
            $.each( group_value.queries, function( query_id, query_value ) {
                ESQueryRunner( 
                    $.parseJSON( query_value.qb_query ), 
                    function( response ){ // Executes after data is returned from ES.
                        var tempStore = new Array();
                        $.each( response.cube, function( key, value ) {
                            // Put the data we have in an array for plotting {date, count}
                            var d = response.edges[0]['domain'].partitions[key].value.getTime() / 1000;
                            tempStore.push( { x: d , y: value } );
                        });
                        coreData.query_groups[group_id].queries[query_id]['es_data'] = tempStore;
                        if ( coreData.query_groups[group_id].is_plot == 1 )    { 
                            executePlot( group_id ); 
                        }
                        if ( coreData.query_groups[group_id].is_number == 1 )  { 
                            executeNumber( group_id ); 
                        }    
                    }
                );
            });
        });
    }

/************************
    EXECUTES PLOT AND NUMBER PRINTING
************************/
    // Note that this does not generate a plot everytime it is called
    // All queries inside the version are checked for retrieved elasticsearch data
    // If any one of the data sets are missing, we escape the function.
    // And wait for this to be called again when new data arrives.
    function executePlot( group_id ) {
        // Searches through the group we are interested in for esData.
        var dataMissing = false;
        $.each( coreData.query_groups[group_id].queries, function( key, value ) {
            if( value.es_data === undefined ) {
                dataMissing = true;
            }
        });

        if ( dataMissing === false ) {
            // OK all data present in group. Let's roll!
                // View graphing documentation here
                // https://github.com/shutterstock/rickshaw

            // Building up an array for each line that goes into the plot
            var rickshawData = new Array() ; 
            var palette = new Rickshaw.Color.Palette(); 
            $.each( coreData.query_groups[group_id].queries, function( key, value ) {
                
                var plot_colour;
                if ( value.colour ) {
                    plot_colour = value.colour;
                } else {
                    plot_colour = palette.color();
                }

                rickshawData.push({
                    name: value['title'],
                    data: value['es_data'],
                    color: plot_colour
                });
            });

            // Start the plot
            var graph = new Rickshaw.Graph({
                element: document.querySelector('.plot#g'+group_id),
                width: $('.group#g' + group_id).width() * 0.80,
                height: $('.group#g' + group_id).width() * 0.40,
                renderer: 'line',
                series: rickshawData
            });
           
            var x_axis = new Rickshaw.Graph.Axis.Time( { graph: graph } );
            var y_axis = new Rickshaw.Graph.Axis.Y({
                graph: graph,
                orientation: 'left',
                tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
                element: document.querySelector('.y-axis#g'+group_id)
            });
            
            var hoverDetail = new Rickshaw.Graph.HoverDetail( { graph: graph } );
            
            removeLoader( 'g' + group_id );

            if ( coreData.query_groups[group_id].has_rule ) {
                applyStatus( group_id );
            }

            graph.render();
            // End of graphing

        } else {
            // Do nothing
            // We are probably still retrieving data
            console.log("Not all data is ready for plotting Group "+group_id+".");
        }
    }

    function executeNumber( group_id ) {
        // Searches through the group we are interested in for esData.
        var dataMissing = false;
        $.each( coreData.query_groups[group_id].queries, function( key, value ) {
            if( value.es_data === undefined ) {
                dataMissing = true;
            }
        });

        if ( dataMissing === false ) {
            $.each( coreData.query_groups[group_id].queries, function( key, value ) {
                var font_colour = '#000000';
                if ( value.colour ) { font_colour = value.colour; }
                $('.group-number #q'+key).html('<h2 style="color:'+font_colour+';">' + value.es_data[value.es_data.length - 1].y + '</h2>');
            });

            removeLoader( 'g' + group_id );
            
            if ( coreData.query_groups[group_id].has_rule ) {
                applyStatus( group_id );
            }

        } else {
            // Do nothing
            // We are probably still retrieving data
            console.log("Not all data is ready for logging Group "+group_id+".");
        }
    }

/*****************************
    MAKE LIFE AWESOME FUNCTIONS
*****************************/
    function removeLoader( group_key ) {
        $('.group-title#'+group_key+' img.load-status').remove();
    }

    function applyStatus( group_id ) {
        var ruled = eval( 'rule_' + group_id + '()' );
        var status_colour = '';
        
        if ( ruled == 'green' ) {
            status_colour = 'lightgreen';

        } else if ( ruled == 'yellow' ) {
            status_colour = 'lightyellow';
        
        } else if ( ruled == 'red' ) {
            status_colour = 'lightpink';
        } else {
            status_colour = ruled;
        }

        $('.group-title#g'+group_id).css('background', status_colour);
    }

    function templateNewGroup ( number ) {
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
        $.each( coreData.query_groups[group_id].queries, function( query_id, query ){
            variables += ''+
            '    var '+tempNames[i]+' = coreData.query_groups['+group_id+'].queries['+query_id+'].es_data;\n';
            i++;
        });
        
        var html = ''+
            '/**************************\n'+
            'Do not change the function name, or Javascript errors will occur\n'+
            '**************************/\n'+
            'function rule_'+group_id+'() {\n'+
            '    /**************************************\n'+
            '    Defining the data available in this group\n'+
            '    Rename the variables to better fit your context\n'+
            '    Do not change the values in the variable\n'+
            '    **************************************/\n'+
            variables +
            '\n'+
            '    /**************************************\n'+
            '    Write scripts to manipulate group data here.\n'+
            '    **************************************/\n'+
            '\n'+
            '\n'+
            '    /**************************************\n'+
            '    Set the conditions that determine what to return\n'+
            '    Recognized return values = [green", "yellow", "red"]\n'+
            '    OR return any preferred custom colours in a valid CSS format\n'+
            '    **************************************/\n'+
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
            '****************/';

        return html;
    }

