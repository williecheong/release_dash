/*************************************
    ES RETRIEVAL
*************************************/
    // Contains all group specific options for aggregating release readiness score
    var aggregateOptions = {};

    // Called after ESQueryRunner.js has finished importing scripts
    // Loop through every group, and for each query in the group
    //      Execute the Qb query against ElasticSearch one at a time
    //      With every returned data set, format for compatibility with Rickshaw
    //      Then attempt to plot and log the number on view for that group
    //      Note: The attempt fails if group does not have all data sets
    //            The attempt will succeed on retrieval of the last data set.
    function startLoading() {
        $.each( coreData.groups, function( group_id, group_value ) {
            $.each( group_value.queries, function( query_id, query_value ) {
                console.log( query_value.qb_query );
                if ( query_value.es_data !== '' ) {

                    // We have some es_data sent in from the server.
                    // Use that instead of loading fresh data from ElasticSearch

                    coreData.groups[group_id].queries[query_id]['es_data'] = $.parseJSON( query_value.es_data );

                    // Checks for complete es_data through this group.
                    var dataInvalid = false;
                    $.each( coreData.groups[group_id].queries, function( key, value ) {
                        if( typeof value.es_data !== 'object' ) { dataInvalid = true; }
                    });

                    if ( dataInvalid === false ) {
                        executeAll( group_id );

                        //sets function parameter toSave = false
                        var score = aggregateScores(false); 
                        $('.rrscore').css('color', score);

                    } else {
                        console.log("Not all data is ready for "+group_value.title+".");
                    }
                } else if ($.parseJSON( query_value.qb_query )['source'] == 'graphs' || $.parseJSON( query_value.qb_query )['source'] == 'crash-stats') {
                    $.ajax({
                        type: "POST",
                        url: "https://dashapi.paas.allizom.org/_get_data",
                        // url: "http://127.0.0.1:5000/_get_data",
                        data: {
                            // source : JSON.stringify($.parseJSON(query_value.qb_query)['source']),
                            source : $.parseJSON(query_value.qb_query)['source'],
                            data   : JSON.stringify($.parseJSON(query_value.qb_query)['data'])
                        },
                        // processData: false,
                        success: function(data) {
                           coreData.groups[group_id].queries[query_id]['es_data'] = data['series_data'];
                           executeAll( group_id );

                           var score = aggregateScores(false); 
                           $('.rrscore').css('color', score);

                            // Store this in the cache for future use!
                            cacheESData( query_id, coreData.groups[group_id].queries[query_id]['es_data'] );
                        }
                    });

                } else if ( $.parseJSON( query_value.qb_query )['source'] == 'telemetry' ) {

                    queryData = $.parseJSON( query_value.qb_query )['data']

                    // Initialize telemetry.js
                    Telemetry.init(function() {
                        // Get versions available
                        var versions = Telemetry.versions();
        
                        // Let's just use the first version
                        var version = versions[0];
                        if ('version' in $.parseJSON(query_value.qb_query)['data']) {
                            version = $.parseJSON(query_value.qb_query)['data']['version'];
                        }
                        
                        // Fetch measures
                        // print("Loading measures for " + version);
                        Telemetry.measures(version, function(measures) {
                            
                            // Choose a measure
                            var measure = Object.keys(measures)[8];
                            if ('measure' in $.parseJSON(query_value.qb_query)['data']) {
                                measure = $.parseJSON(query_value.qb_query)['data']['measure'];
                            }

                            Telemetry.loadEvolutionOverBuilds(
                                version,
                                measure,
                                function(histogramEvolution) 
                            {
                                // Let's create a list of {x: ..., y: ...} data points of submissions and
                                // timestamps to plot with any common Javascript library.
                                var data = histogramEvolution.map(function(date, histogram, index) {
                                  return {
                                    x:  (date.getTime()  / 1000), // Use get unix timestamp
                                    y:  histogram.submissions()
                                  };
                                });

                                // Remove data ouside of range
                                data = data.filter(function(elm){
                                    queryData = $.parseJSON( query_value.qb_query )['data']
                                    if ('start_date' in queryData && (elm['x']*1000 < queryData['start_date']) ) {
                                      return false;
                                    }
                                    if ('end_date' in queryData && (elm['x']*1000  > queryData['end_date']) ) {
                                      return false;
                                    }   
                                    return true;
                                });



                                // Use your favorite graph library to plot `data`
                                coreData.groups[group_id].queries[query_id]['es_data'] = data;
                                executeAll( group_id );

                                var score = aggregateScores(false); 
                                $('.rrscore').css('color', score);
                                // Store this in the cache for future use!
                                cacheESData( query_id, coreData.groups[group_id].queries[query_id]['es_data'] );
                            });
                        });
                    });

                } else {

                    // The es_data field appears to be blank.
                    // Server did not give us anything to load up
                    // Go to the ElasticSearch cluster and pull fresh data
                    console.log( query_value.qb_query );
                    ESQueryRunner( 
                        $.parseJSON( query_value.qb_query ), 
                        function( response ){ // Executes after data is returned from ES.
                            // Format the returned ElasticSearch data for Rickshaw compatibility
                            var tempStore = new Array();
                            $.each( response.cube, function( key, value ) {
                                // Put the data we have in an array for plotting {date, count}
                                var d = response.edges[0]['domain'].partitions[key].value.getTime() / 1000;
                                tempStore.push( { x: d , y: value } );
                            });
                            coreData.groups[group_id].queries[query_id]['es_data'] = tempStore;
                            // End of formatting the returned ElasticSearch data for Rickshaw compatibility

                            // Checks for complete es_data through this group.
                            var dataMissing = false;
                            $.each( coreData.groups[group_id].queries, function( key, value ) {
                                if( value.es_data == '' ) { dataMissing = true; }
                            });

                            if ( dataMissing === false ) {
                                // OK all data present in group. Let's roll!
                                executeAll( group_id );

                                // Attempt to aggregate the score 
                                // Only actually runs when all groups with rules are complete
                                var score = aggregateScores();
                                $('.rrscore').css('color', score);
                                
                            } else {
                                // Do nothing, probably still retrieving data
                                console.log("Not all data is ready for "+group_value.title+".");
                            }   

                            // Store this in the cache for future use!
                            cacheESData( query_id, coreData.groups[group_id].queries[query_id]['es_data'] );
                        }
                    );
                }
            });
        });
    }

/************************
    EXECUTES PLOT AND NUMBER PRINTING
************************/
    function executeAll( group_id ) {
        // If this group is a plot, plot it in the box
        if ( coreData.groups[group_id].is_plot ) { executePlot( group_id ); }
        
        // If this group is a number, log it in the box
        if ( coreData.groups[group_id].is_number ) { executeNumber( group_id ); }

        // If this group has a rule, apply it
        if ( coreData.groups[group_id].has_rule ) { applyStatus( group_id ); }

        // Component breakdown is available only after main plot is done loading
        $('.btn#get-component-breakdowns[data-group-id="'+group_id+'"]').show('slow'); 

        // Remove the Bugzilla chomping GIF icon
        removeLoader( 'g' + group_id );
    }

    function executePlot( group_id ) {
        // View graphing documentation here
        // https://github.com/shutterstock/rickshaw

        // Building up an array for each line that goes into the plot
        var rickshawData = new Array() ; 
        var palette = new Rickshaw.Color.Palette(); 
        $.each( coreData.groups[group_id].queries, function( key, value ) { 
            var plot_colour;
            if ( value.colour ) {
                plot_colour = value.colour;
            } else {
                plot_colour = palette.color();
            }

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
        // document.querySelector('.plot#g'+group_id).innerHTML = "";
        var graph = new Rickshaw.Graph({
            element: document.querySelector('.plot#g'+group_id),
            width: $('.group#g' + group_id).width() * 0.90,
            height: $('.group#g' + group_id).width() * 0.40,
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
            element     : document.querySelector('.y-axis#g'+group_id)
        });

        var hoverDetail = new Rickshaw.Graph.HoverDetail({ 
            graph: graph,
            xFormatter: function(x){
                return new Date( x * 1000 ).toDateString();
            }
        });
        
        /*
        graph.onUpdate(function(){
            $('.plot#g'+group_id+' svg').click(function(){
                var dated = $('.rickshaw_graph#g'+group_id+' .detail .x_label').html();
                alert(dated);
            });
        });
        */

        graph.render();
        // End of graphing
    }

    function executeNumber( group_id ) {
        $.each( coreData.groups[group_id].queries, function( key, value ) {
            var font_colour = '#000000';
            if ( value.colour ) { 
                font_colour = value.colour; 
            }

            var logNumber = value.es_data[value.es_data.length - 1].y;
            if (value.is_reference) {
                // Reference number only, use corresponding dates from main plot
                // Finding the index of the data set that corresponds to current time
                var i = todayIndex( coreData.groups[group_id].queries[value.ref_query].es_data );
                if ( value.es_data[i] ) {                   
                    logNumber = value.es_data[i].y;
                }
            }

            if (logNumber.toString().length > 4) {
                logNumber = logNumber.toPrecision(3).toString();
            };

            $('.group-number #q'+key).html(
                '<h2 style="color:'+font_colour+';">' + 
                    logNumber + 
                '</h2>' );
        });
    }

    function applyStatus( group_id ) {
        var ruled = eval( 'rule_' + group_id + '()' );
        var status_colour = ruled;
        
        if ( ruled == 'green' ) {
            status_colour = 'lightgreen';
        } else if ( ruled == 'yellow' ) {
            status_colour = 'orange';
        } else if ( ruled == 'red' ) {
            status_colour = 'red';
        }

        $('.group-title#g'+group_id).css('background', status_colour);

        coreData.groups[group_id].status = ruled;
    }

    // Checks for whether or not all groups with rules have finished loading
    // If all groups with rules are done, execute aggregation and return the score
    // Accepts bool parameter (defaults to true) that specifies whether or not to save score 
    var aggregatedBefore = false;
    function aggregateScores( toSave ){
        if( typeof(toSave) === 'undefined' ) toSave = true;

        if ( !aggregatedBefore ) {
            var isComplete = true;
            $.each( coreData.groups, function( group_id, group ){
                if ( group.has_rule ){
                    if ( group.status == undefined ){
                        // group has rule but no status yet - incomplete.
                        isComplete = false;
                    }
                } // else group has no rule, skip
            });
            
            if ( isComplete ) {
                aggregatedBefore = true;

                // Extract groups with rules into smaller variable that is easier to work with
                var ruledGroups = {};
                $.each( coreData.groups, function( group_id, group ){
                    if ( group.has_rule ){
                        ruledGroups[group_id] = group ;
                    }
                });

                var greenCount  = 0;
                var yellowCount = 0;
                var redCount    = 0;
                
                $.each( ruledGroups, function( group_id, group ){
                    if ( aggregateOptions[group_id].isShipwrecker && group.status == 'red' ) {
                        redCount = redCount + 9999999 ; //maxout the redcount
                    
                    } else if ( aggregateOptions[group_id].isSignificant ) {
                        
                        if ( group.status == 'green' ){
                            greenCount++;
                        
                        } else if ( group.status == 'yellow' ){
                            yellowCount++;
                        
                        } else if ( group.status == 'red' ){
                            redCount++;
                        
                        }
                    
                    } else { 
                        // do nothing. group is not shipwrecker and not significant
                    }
                });

                var catColoring = {};

                $.each( coreData.categories, function(id,  category ){
                    catColoring[category] = {};
                    catColoring[category]['greenCount'] = 0;
                    catColoring[category]['yellowCount'] = 0;
                    catColoring[category]['redCount'] = 0;
                    catColoring[category]['score'] = 0;

                    $.each( ruledGroups, function( group_id, group ){
                        if ( group.category == category ) {
                            if ( aggregateOptions[group_id].isShipwrecker && group.status == 'red' ) {
                                catColoring[category]['redCount'] = catColoring[category]['redCount'] + 9999999 ; //maxout the redcount
                            
                            } else if ( aggregateOptions[group_id].isSignificant ) {
                                
                                if ( group.status == 'green' ){
                                    catColoring[category]['greenCount']++;
                                
                                } else if ( group.status == 'yellow' ){
                                    catColoring[category]['yellowCount']++;
                                
                                } else if ( group.status == 'red' ){
                                    catColoring[category]['redCount']++;
                                
                                }
                            
                            } else { 
                                // do nothing. group is not shipwrecker and not significant
                            }
                        }
                    });
                    if ( catColoring[category]['greenCount'] != 0 || catColoring[category]['yellowCount'] != 0 || catColoring[category]['redCount'] != 0 ) {
                        var highScore = Math.max(catColoring[category]['redCount'], catColoring[category]['yellowCount'], catColoring[category]['greenCount']);
                        if ( highScore == catColoring[category]['redCount'] ){
                            // $('#panel-'+category).removeClass('panel-default');
                            $('#badge-'+category).addClass('alert-danger');
                        } else if ( highScore == catColoring[category]['yellowCount'] ) {
                            // $('#panel-'+category).removeClass('panel-default');
                            $('#badge-'+category).addClass('alert-warning');
                        } else {
                            // $('#panel-'+category).removeClass('panel-default');
                            $('#badge-'+category).addClass('alert-success');
                        }
                    }

                });
                
                console.log(catColoring);


                var score = '';
                if ( greenCount != 0 || yellowCount != 0 || redCount != 0 ) {
                    var highScore = Math.max(redCount, yellowCount, greenCount);
                    if ( highScore == redCount ){
                        score = 'red';
                    } else if ( highScore == yellowCount ) {
                        score = 'orange';
                    } else {
                        score = 'lightgreen';
                    }
                }

                // Did we specify that we didn't want to save when applying this score?
                if ( toSave ) {
                    saveAggregate(score)
                }

                return score;
            } // Not all rules have been executed yet. Do nothing
        }
    }

/*****************************
    MAKE LIFE AWESOME FUNCTIONS
*****************************/
    
    function saveAggregate( score ) { 
        $.ajax({
            url: '/api/scores',
            type: 'POST',
            data: {
                version_id    : coreData['id'],
                version_score : score
            },
            success: function(response) {
                // For the selenium hacking
                var div = document.createElement("div");
                div.setAttribute("id", "pageCompletedSignal")
                document.body.appendChild(div);

                console.log("done!");
                console.log(response);
            }, 
            error: function(response) {
                alert('Fail: API could not be reached.');
                console.log(response);
            }
        });
    }

    function cacheESData( query_id, es_data ) {
        es_data = JSON.stringify( es_data );
        $.ajax({
            url: '/api/caches/es_data',
            type: 'POST',
            data: {
                query_id      : query_id,
                version_id    : coreData['id'],
                query_es_data : es_data
            },
            success: function(response) {
                console.log(response);
            }, 
            error: function(response) {
                alert('Fail: API could not be reached.');
                console.log(response);
            }
        });
    }

    function removeLoader( group_key ) {
        $('.group-title#'+group_key+' i.load-status').remove();
    }

    function todayIndex( rickshawArray ) {
        var i = 0; 
        var temp = rickshawArray[i] ;
        var current = new Date().getTime() / 1000 ;
        
        while( temp.x < current ){
            i++;
            if ( rickshawArray[i] ) {
                temp = rickshawArray[i];

            } else {
                // At the end of alpha
                break;
            }
        }
        
        i--;

        return i;
    }
