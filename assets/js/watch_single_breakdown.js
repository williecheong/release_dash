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
                    $('div.breakdown-loading').html('Loading component data');
                } else {
                    // Component data is here. Let's get that table loaded
                    var dated = $('.breakdown-plot.rickshaw_graph .detail .x_label').html();
                    var dated = new Date( dated.trim() ).getTime();
                    runBreakdown(group_id, dated);
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
        // Component modals were only enabled for groups with one query.
        // First we find that main query for the group then grab the qb_query
        var main_query_id = findMainQuery( group_id );   
        var components = coreData['product'].components.split(',');
        if ( typeof coreData.groups[group_id].by_components === 'undefined' ){
            coreData.groups[group_id].by_components = {};
        }

        $.each(components, function(key, component){
            if ( typeof coreData.groups[group_id].by_components[component] === 'undefined' ) {
                // Component data does not exist. Load from ES and put into the array.
                var qb_query = JSON.parse( coreData.groups[group_id].queries[main_query_id].qb_query );
                qb_query.esfilter.and.push({ 
                    term: { 
                        "component" : component.toLowerCase()
                    } 
                });
                
                ESQueryRunner( 
                    qb_query,
                    function( response ){ // Executes after data is returned from ES.
                        var tempStore = new Array();
                        $.each( response.cube, function( key, value ) {
                            // Put the data we have in an array for plotting {date, count}
                            var d = response.edges[0]['domain'].partitions[key].value.getTime() / 1000;
                            tempStore.push( { x: d , y: value } );
                        });
                        coreData.groups[group_id].by_components[component] = tempStore;  
                        // Alright this component data has been transformed and stored into coreData

                        var dataMissing = false;
                        $.each( components, function( key, component_name ) {
                            if( !coreData.groups[group_id].by_components[component_name] ) { 
                                dataMissing = true; 
                            }
                        });

                        if ( dataMissing === false ) {
                            // OK all data present in group. Let's roll!
                            $('.breakdown-table').removeClass('not-ready').html('<span class="lead">READY</span>');
                        }
                    }
                );

            } else {
                // Component data exists. No need for ES loading
                var dataMissing = false;
                $.each( components, function( key, component_name ) {
                    if( !coreData.groups[group_id].by_components[component_name] ) { 
                        dataMissing = true; 
                    }
                });

                if ( dataMissing === false ) {
                    // OK all data present in group. Let's roll!
                    $('.breakdown-table').removeClass('not-ready').html('<span class="lead">READY</span>');
                    return;
                }
            }
        });
    
    }

/*************************************
    HANDLES ALL DATA PROCESSING AND 
    FINALLY APPENDS BREAKDOWN TABLE TO VIEW
*************************************/
    function runBreakdown( group_id, selectDate ){
        var main_query_id = findMainQuery( group_id );
        var chosenIndex = 0; 
        for (var i = 0; i < coreData.groups[group_id].queries[main_query_id].es_data.length; i++) {
            if ( coreData.groups[group_id].queries[main_query_id].es_data[i + 1] ) {
                if ( selectDate/1000 < coreData.groups[group_id].queries[main_query_id].es_data[i + 1].x ){
                    chosenIndex = i;
                    break;
                }
            } else {
                chosenIndex = i;
                break;
            }
        };
        
        // Extract bug count on each component for the specified time period
        // Link the extracted bug count to the component name in the component_table object
        var component_table = {};
        $.each(coreData.groups[group_id].by_components, function(component_name, component_data){
            component_table[component_name] = component_data[chosenIndex].y;
        });
        
        // Get the total count for using to compute percentage in table
        totalCount = coreData.groups[group_id].queries[main_query_id].es_data[chosenIndex].y;
        
        // Build the table using the templating function and append to view
        $('.breakdown-table').removeClass('text-center').html( templateBreakdownTable(component_table, selectDate, totalCount) );           
        
        // Make the newly appended table sortable
        sorttable.makeSortable( document.getElementById("sortable") );
    }

/*************************************
    HELPER FUNCTIONS
*************************************/
    function findMainQuery( group_id ) {
        var main_query_id = 0;
        $.each(coreData.groups[group_id].queries, function(query_id, query){
            if ( !query.is_reference ) {
                main_query_id = query_id;
            }
        });
        return main_query_id;
    }

    function templateBreakdownTable( component_table, selectDate, totalCount ) {
        var rows = '';
        $.each(component_table, function(component_name, component_data){
            var percentage = (component_data / totalCount) * 100;
            rows += '<tr>'+
                    '    <td>'+component_name+'</td>'+
                    '    <td>'+component_data+'</td>'+
                    '    <td>'+percentage.toFixed(1)+'%</td>'+
                    '</tr>';
        });

        var html  = '<div class="lead text-right">'+ new Date(selectDate).toDateString() +'</div>';
            html += '<table class="table table-hover table-condensed" id="sortable">'+
                    '    <thead>'+
                    '        <tr>'+
                    '            <th>'+
                    '                Component'+
                    '            </th>'+
                    '            <th>'+
                    '                Bug count'+
                    '            </th>'+
                    '            <th>'+
                    '                % of total'+
                    '            </th>'+
                    '        </tr>'+
                    '    </thead>'+
                    '    <tbody>'+
                             rows+
                    '    </tbody>'+
                    '</table>';

        return html;
    }