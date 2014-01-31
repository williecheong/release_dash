/*********************************
    JUST SETTING UP THE PAGE HERE
*********************************/
    $('#branch_overview').modal({
        show : false
    });

    //Toggles the view of channels on each product
    $('.toggler').click(function(){
        $( '.channels#' + $(this).attr('id') ).toggle('slow');
    });


/*************************************
    MODAL GENERATION AND ES RETRIEVAL
*************************************/
    var product = '';
    var branch = '';
    //var totalQueries = 0;
    //var completedRetrievals = 0;

    $('.channel').click(function(){
        clearDiv();
        product = $(this).closest('.channels').attr('id');
        branch = $(this).attr('id');

        $('span.descriptor#product-channel').html( coreData[product].branches[branch]['title'] );

        // Put Zillaboy on the modal and show the modal. 
        $('#misc-text').html('<img src="/assets/img/mozchomp.gif"><br>... chomp chomp DATA!');
        $('#branch_overview').modal('show');

        // Zillaboy now entertaining user. 
        // Grabbing data starts right after the modal has displayed
        // Neccessary because we are inheriting width of the modal for plot.
    });

    $('#branch_overview').on('shown.bs.modal', function (e) {
        // Looping through the queries for this product branch.
        $.each( coreData[product].branches[branch].queries, function( key, value ) {
            if( coreData[product].branches[branch].queries[key]['es_data'] === undefined ) {
                // Retrieve the data for this query if it is not done yet
                ESQueryRunner( 
                    $.parseJSON( coreData[product].branches[branch].queries[key].qb_query ), 
                    function( response ){ 
                        // Executes after data is returned from ES.
                        var tempStore = new Array();
                        $.each( response.cube, function( key, value ) {
                            // Put the data we have in an array for plotting {date, count}
                            var d = response.edges[0]['domain'].partitions[key].value.getTime() / 1000;
                            tempStore.push( { x: d , y: value } );
                        });

                        coreData[product].branches[branch].queries[key]['es_data'] = tempStore;
                        executePlot();
                    }
                );
            } else {
                // Data is here already. 
                // Let's execute the plot.
                executePlot();
            }
        });
    });

/************************
    VERY IMPORTANT FUNCTIONS
************************/
    // Note that this does not generate a plot everytime it is called
    // All queries inside the branch are checked for retrieved elasticsearch data
    // If any one of the data sets are missing, we escape the function.
    // And wait for this to be called again when new data arrives.
    function executePlot() {
        if ( product !== '' && branch !== '' ) { 
            // Searches through the product branch we are interested in for esData.
            var dataMissing = false;
            $.each( coreData[product].branches[branch].queries, function( key, value ) {
                if( coreData[product].branches[branch].queries[key]['es_data'] === undefined ) {
                    dataMissing = true;
                }
            });

            if ( dataMissing === false ) {
                // OK all data present. Let's roll!
                    // View graphing documentation here
                    // https://github.com/shutterstock/rickshaw

                clearDiv();
                // Building up an array for each line that goes into the plot
                var rickshawData = new Array() ; 
                var palette = new Rickshaw.Color.Palette(); 
                $.each( coreData[product].branches[branch].queries, function( key, value ) {
                    rickshawData.push({
                        name: value['title'],
                        data: value['es_data'],
                        color: palette.color()
                    });
                });

                // Start the plot
                var graph = new Rickshaw.Graph({
                    element: document.querySelector(".graph#main-plot"),
                    width: $('.graph#main-plot').width() * 0.90,
                    height: $('.graph#main-plot').width() * 0.60,
                    renderer: 'line',
                    series: rickshawData
                });
                
                var x_axis = new Rickshaw.Graph.Axis.Time( { graph: graph } );
                var y_axis = new Rickshaw.Graph.Axis.Y({
                    graph: graph,
                    orientation: 'left',
                    tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
                    element: document.querySelector('.graph#y-axis'),
                });
                
                var hoverDetail = new Rickshaw.Graph.HoverDetail( { graph: graph } );
                var legend = new Rickshaw.Graph.Legend( {
                    graph: graph,
                    element: document.querySelector('.graph#legend')
                });
                var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
                    graph: graph,
                    legend: legend
                });

                graph.render();
                // End of graphing

                // Reset checkers for next modal
                product = '';
                branch = '';

            } else {
                // Do nothing
                // We are probably still retrieving data
                console.log("Not all data is ready.");
            }
        } else {
            console.log("Product and branch not specified.");
            alert("Error: Check console.");
        }
    }

/*****************************
    MAKE LIFE AWESOME FUNCTIONS
*****************************/
    function clearDiv(){
        $('.js-clear').html('');
    }







