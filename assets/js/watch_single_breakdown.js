/*************************************
    STARTS DATA LOADING 
    PLOTS MAIN CHART FOR GROUP
*************************************/
    function initializeBreakdown( group_id ) {
        // Start querying ElasticSearch for the component data
        // Note: We are loading one set of queries for each components.
        // In other words, this may take quite a while to finish loading
        loadComponentData(group_id);   

        // View graphing documentation here
        // https://github.com/shutterstock/rickshaw
        
        // Building up an array for each line that goes into the plot
        var rickshawData = []; 
        $.each( coreData.groups[group_id].queries, function( key, value ) { 
            var plot_colour = value.colour;
            var plot_data = [];
            if (value.is_reference) {
                // Reference plot only, use corresponding dates from main plot
                $.each( coreData.groups[group_id].queries[value.ref_query].es_data , function( esIndex, esValue ){
                    if ( value['es_data'][esIndex] ){
                        plot_data[esIndex] = { x: esValue.x , y: value['es_data'][esIndex].y } ;    
                    }                    
                });
            } else {
                var today = todayIndex( value.es_data );
                for (var i = 0; i < value.es_data.length; i++) {
                    if ( i < today + 1 ) { 
                        plot_data[i] = { x: value.es_data[i].x, y: value.es_data[i].y };
                    } else {
                        plot_data[i] = { x: value.es_data[i].x, y: undefined };
                    }
                };
            }

            rickshawData.push({
                name: value['title'],
                data: plot_data,
                color: plot_colour
            });
        });

        // Start the plot
        var graph = new Rickshaw.Graph({
            element: document.querySelector('.breakdown-graph .breakdown-plot'),
            width: $('.breakdown-graph').width(),
            height: $('.breakdown-graph').width() * 0.40,
            renderer: 'line',
            series: rickshawData
        });

        var time = new Rickshaw.Fixtures.Time().unit('month');
        var x_axis = new Rickshaw.Graph.Axis.Time({ 
            graph       : graph, 
            timeUnit    : time 
        });

        var y_axis = new Rickshaw.Graph.Axis.Y({
            graph       : graph,
            orientation : 'right',
            tickFormat  : Rickshaw.Fixtures.Number.formatKMBT,
            element     : document.querySelector('.breakdown-graph .breakdown-y-axis')
        });

        var hoverDetail = new Rickshaw.Graph.HoverDetail({ 
            graph: graph,
            xFormatter: function(x){
                return new Date( x * 1000 ).toDateString();
            }
        });
        
        graph.onUpdate(function(){
            // User has clicked on the chart. Do something.
            $('.breakdown-plot svg').click(function(){
                if ( $('.breakdown-table').hasClass('not-ready') ) {
                    // Do nothing, component data not done loading yet
                    alert('Loading component data');
                } else {
                    // Component data is here. Let's get that table loaded
                    var dated = $('.breakdown-plot.rickshaw_graph .detail .x_label').html();
                    runBreakdown(dated);
                }
            });
        });

        graph.render();
        // End of graphing
    }

/*************************************
    HANDLES DATA LOADING 
    PROVIDES INDICATION WHEN COMPLETED
*************************************/
    function loadComponentData( group_id ){
        // Temporarily missing
        setTimeout(function() {
            $('.breakdown-table').removeClass('not-ready').html('<span class="lead">READY</span>')
        }, 7000);
    }

/*************************************
    HANDLES ALL DATA PROCESSING AND 
    FINALLY APPENDS BREAKDOWN TABLE TO VIEW
*************************************/
    function runBreakdown( selectDate ){
        alert(selectDate);
    }