/*********************************
    JUST SETTING UP THE PAGE HERE
*********************************/
    // Initializing duckster gridster
    var gridsterWidth = $('.gridster').width();
    $(".gridster ul").gridster({
        widget_margins: [ gridsterWidth*0.01, gridsterWidth*0.01 ],
        widget_base_dimensions: [ gridsterWidth*0.104, gridsterWidth*0.104 ]
    });

    // Initializes the #new-group modal
    $('#new-group').modal({
        show : false
    });

    // Toggles whatever element is inside "data-toggler"
    $('[data-mytoggler]').click(function(){
        var toToggle = $(this).data('mytoggler');
        $( toToggle ).toggle('slow');
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

        $.each( $('.new-query'), function(key, value){ 
            saveGroup.group_queries[value.id] = {
                query_title : $.trim( $('.new-query#'+value.id).find('input#new-query-name').val() ),
                query_colour : $('.new-query#'+value.id).find('button.colourpicker').css('color'),
                query_query_bz : $('.new-query#'+value.id).find('input#new-query-bz').val(),
                query_query_qb : $('.new-query#'+value.id).find('textarea#new-query-qb').val()
            };

            // Validation for the group queries' input values
            if ( saveGroup.group_queries[value.id].query_title == '' ) {
                alert( 'Query name cannot be empty.' );
                $this.removeClass('disabled');
                return false;
            }
            /*
            var json = $.parseJSON( saveGroup.group_queries[value.id].query_query_qb );
            if( typeof json != 'object' ) {
                alert( 'Qb Query is not in JSON format.' );
                $this.removeClass('disabled');
                return false;      
            } 
            */
        });

        $.ajax({
            url: '/api/groups',
            type: 'POST',
            data: saveGroup,
            success: function(response) {
                if ( response == 'OK' ) {
                    $this.addClass('previousSuccess');
                    $this.html('<i class="fa fa-ok"></i> Success');
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
        var groupTag = $(this).data('groupTag');
        var thisGroup = coreData.query_groups[groupTag];

        // Cleaning up the modal from prior use
        $('.modal#old-group').find('form div.old-query').remove();
        $('.btn#delete-old-group').removeClass('disabled');
        $('.btn#delete-old-group').html('<i class="fa fa-times"></i> Delete');
        // End of cleaning up the modal from prior use

        // Setting the values inside the modal's form fields
        $('.modal#old-group').find('input#group-id').val( thisGroup.group_id );
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
            $('.modal#old-group').find('form').append( templateOldGroup( value ) );
        });

        $('.btn#delete-old-group').attr( 'data-group-id', thisGroup.group_id );
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
                    $this.html('<i class="fa fa-ok"></i> Success');
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

/*************************************
    ES RETRIEVAL
*************************************/
    $(document).ready(function(){
        // Need Thread to be fully loaded before we can startLoading()
        // The call is made at the bottom of ESQueryRunner.js as a callback
    });

    function startLoading() {
        $.each( coreData.query_groups, function( group_key, group_value ) {
            $.each( group_value.queries, function( query_key, query_value ) {
                ESQueryRunner( 
                    $.parseJSON( query_value.qb_query ), 
                    function( response ){ // Executes after data is returned from ES.
                        var tempStore = new Array();
                        $.each( response.cube, function( key, value ) {
                            // Put the data we have in an array for plotting {date, count}
                            var d = response.edges[0]['domain'].partitions[key].value.getTime() / 1000;
                            tempStore.push( { x: d , y: value } );
                        });
                        coreData.query_groups[group_key].queries[query_key]['es_data'] = tempStore;
                        if ( coreData.query_groups[group_key].is_plot == 1 )    { 
                            executePlot( group_key ); 
                        }
                        if ( coreData.query_groups[group_key].is_number == 1 )  { 
                            executeNumber( group_key ); 
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
    function executePlot( group_key ) {
        // Searches through the group we are interested in for esData.
        var dataMissing = false;
        $.each( coreData.query_groups[group_key].queries, function( key, value ) {
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
            $.each( coreData.query_groups[group_key].queries, function( key, value ) {
                
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
                element: document.querySelector('.plot#'+group_key),
                width: $('.group#' + group_key).width() * 0.80,
                height: $('.group#' + group_key).width() * 0.40,
                renderer: 'line',
                series: rickshawData
            });
           
            var x_axis = new Rickshaw.Graph.Axis.Time( { graph: graph } );
            var y_axis = new Rickshaw.Graph.Axis.Y({
                graph: graph,
                orientation: 'left',
                tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
                element: document.querySelector('.y-axis#'+group_key)
            });
            
            var hoverDetail = new Rickshaw.Graph.HoverDetail( { graph: graph } );
            
            removeLoader( group_key );
            graph.render();
            // End of graphing

        } else {
            // Do nothing
            // We are probably still retrieving data
            console.log("Not all data is ready for plotting "+group_key+".");
        }
    }

    function executeNumber( group_key ) {
        // Searches through the group we are interested in for esData.
        var dataMissing = false;
        $.each( coreData.query_groups[group_key].queries, function( key, value ) {
            if( value.es_data === undefined ) {
                dataMissing = true;
            }
        });

        if ( dataMissing === false ) {
            $.each( coreData.query_groups[group_key].queries, function( key, value ) {
                var font_colour = '#000000';
                if ( value.colour ) { font_colour = value.colour; }
                $('.group-number #'+key).html('<h2 style="color:'+font_colour+';">' + value.es_data[value.es_data.length - 1].y + '</h2>');
            });

            removeLoader( group_key );
        
        } else {
            // Do nothing
            // We are probably still retrieving data
            console.log("Not all data is ready for logging "+group_key+".");
        }
    }

/*****************************
    MAKE LIFE AWESOME FUNCTIONS
*****************************/
    function removeLoader( group_key ) {
        $('.group-title#'+group_key+' img.load-status').remove();
    }

    function templateNewGroup ( number ) {
        var html = '<div class="new-query" id="'+ number +'">'+
                        '<button type="button" class="btn btn-xs btn-default" id="remove-new-query">'+
                            '<i class="fa fa-times"></i>'+
                        '</button>'+
                        '<div class="form-group">'+
                            '<label class="col-sm-3 control-label" for="new-query-name">Query Name</label>'+
                            '<div class="col-sm-9 input-group">'+
                                '<input type="text" class="form-control" id="new-query-name" placeholder="Description for this query.">'+
                                '<span class="input-group-btn">'+
                                    '<button class="btn btn-default colourpicker" type="button" id="'+number+'">'+
                                        '<i class="fa fa-tint fa-lg"></i> Color'+
                                    '</button>'+
                                    '<em id="colorpicker-log"></em>'+
                                '</span>'+
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

    function templateOldGroup ( query ) {
        var html = '<div class="old-query" id="'+ query.query_id +'">'+
                        '<div class="form-group">'+
                            '<input type="hidden" class="form-control" id="query-id">'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label class="col-sm-3 control-label" for="query-name">Query Name</label>'+
                            '<div class="col-sm-9 input-group">'+
                                '<input type="text" class="form-control" id="query-name" placeholder="Description for this query." value="'+query.title+'">'+
                                '<span class="input-group-btn">'+
                                    '<button class="btn btn-default colourpicker" type="button" id="'+query.query_id+'" style="color:'+query.colour+';">'+
                                        '<i class="fa fa-tint fa-lg"></i> Color'+
                                    '</button>'+
                                    '<em id="colorpicker-log"></em>'+
                                '</span>'+
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



