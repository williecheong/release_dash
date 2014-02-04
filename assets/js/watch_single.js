/*********************************
    JUST SETTING UP THE PAGE HERE
*********************************/
    // Initializing duckster gridster
    var gridsterWidth = $('.gridster').width();
    $(".gridster ul").gridster({
        widget_margins: [ gridsterWidth*0.01, gridsterWidth*0.01 ],
        widget_base_dimensions: [ gridsterWidth*0.313, gridsterWidth*0.313 ]
    });

    // Toggles whatever element is inside "data-toggler"
    $('[data-mytoggler]').click(function(){
        var toToggle = $(this).data('mytoggler');
        $( toToggle ).toggle('slow');
    });

/*************************************
    ES RETRIEVAL
*************************************/
    $(document).ready(function(){
        // Need Thread to be fully loaded before this can start
        // startLoading();
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
                        executePlot( group_key );
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
                rickshawData.push({
                    name: value['title'],
                    data: value['es_data'],
                    color: palette.color()
                });
            });

            // Start the plot
            var graph = new Rickshaw.Graph({
                element: document.querySelector('.group#'+group_key+' #group-graph div .plot'),
                width: $('.graph#main-plot').width() * 0.90,
                height: $('.graph#main-plot').width() * 0.55,
                renderer: 'line',
                series: rickshawData
            });
           
            var x_axis = new Rickshaw.Graph.Axis.Time( { graph: graph } );
            var y_axis = new Rickshaw.Graph.Axis.Y({
                graph: graph,
                orientation: 'left',
                tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
                element: document.querySelector('.group#'+group_key+' #group-graph div .y-axis')
            });
            
            var hoverDetail = new Rickshaw.Graph.HoverDetail( { graph: graph } );
            /*
            var legend = new Rickshaw.Graph.Legend( {
                graph: graph,
                element: document.querySelector('.group#'+group_key+' .group-graph #legend')
            });
            */
            var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
                graph: graph
            });

            $('.group#'+group_key+' #group-title img.load-status').remove();
            graph.render();
            // End of graphing

        } else {
            // Do nothing
            // We are probably still retrieving data
            console.log("Not all data is ready.");
        }
    }

/*****************************
    MAKE LIFE AWESOME FUNCTIONS
*****************************/
    // None yet







