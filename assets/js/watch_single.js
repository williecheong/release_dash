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
    ALL THINGS ABOUT ADDING GROUPS
*********************************/
    // Brings up the modal for adding a new group
    $('.btn#add-new-group').click(function(){
        $('.modal#new-group').modal('toggle');
    });

    var new_query_unique_counter = 0;
    $('.btn#new-query-template').click(function(){
        new_query_unique_counter++;

        $('.modal#new-group').find('form').append( templateNewGroup( number ));

        // Initializing remove button for this new item
        $('button#remove-new-query').click(function(){
            $(this).closest('div.new-query').remove();
        });
        // Initializing colorpicker for this new item
        $(".colourpicker[id='"+number+"']").spectrum({
            showInput: true,
            preferredFormat: 'hex6',
            clickoutFiresChange: true,
            showButtons: false,
            move: function(color) {
                $(".colourpicker[id='"+number+"']").css( 'color', color.toHexString() );
            }
        });
    });

    //onsave
    /*
        $.each( $('.new-query'), function(key, value){ 
            console.log(value.id); 
        });
    */

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
    VERY IMPORTANT FUNCTIONS
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
                $('.group-number #'+key).html('<h2 style="'+font_colour+'">' + value.es_data[value.es_data.length - 1].y + '</h2>');
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
                            '<i class="icon-remove"></i>'+
                        '</button>'+
                        '<div class="form-group">'+
                            '<label class="col-sm-3 control-label" for="new-query-name">Query Name</label>'+
                            '<div class="col-sm-9 input-group">'+
                                '<input type="text" class="form-control" id="new-query-name" placeholder="Description for this query.">'+
                                '<span class="input-group-btn">'+
                                    '<button class="btn btn-default colourpicker" type="button" id="'+number+'">'+
                                        '<i class="icon-tint icon-large"></i>'+
                                    '</button>'+
                                    '<em id="colorpicker-log"></em>'+
                                '</span>'+
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






