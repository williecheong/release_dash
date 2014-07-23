/*****************************
    BLOCK TEMPLATES FOR QUERIES OF
    NEW GROUPS AND EXISTING GROUPS
*****************************/

    function categoryOptions (groupid, group, categories) {
        var html = '';
        html += '<select class="form-control" id="group-category">';
        html += '<option value="' + group['category'] + '">' +  group['category'] + '</option>';
        $.each(categories, function(key, value){
            if (value != group['category']) {
                html += '<option value="' + value + '">' +  value + '</option>';
            }
        });
        html += '</select>';
        return html;
    }


    function categoryNewOptions (categories) {
        var html = '';
        html += '<select class="form-control" id="group-category">';
        $.each(categories, function(key, value){
            html += '<option value="' + value + '">' +  value + '</option>';
        });
        html += '</select>';
        return html;
    }

    function templateDataInput (dataSource, number) {
        html = '';
        if (dataSource == "crash-stats") {
            var refOptions = '';
            if ( coreData.hasOwnProperty('product') ) { 
                refOptions +=   '<div class="form-group hidden">'+
                                    '<label class="col-sm-3 control-label" for="query-reference">References</label>'+
                                    '<div class="col-sm-9 controls">'+
                                       '<select class="form-control" id="query-reference">'+
                                            '<option value="none">None</option>';

                $.each( coreData.product.versions, function(key, version){
                    if ( parseInt(version.id) < parseInt(coreData.id) ) {
                        refOptions +=       '<option value="'+version.id+'">'+version.title+'</option>';
                    }
                });

                refOptions +=           '</select>'+
                                    '</div>'+
                                '</div>';
            }
            html =          '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="query-name">Query Name</label>'+
                                '<div class="col-sm-9 controls">'+
                                    '<div class="input-group">'+
                                        '<input type="text" class="form-control" id="query-name" placeholder="Description for this query.">'+
                                        '<span class="input-group-btn">'+
                                            '<button class="btn btn-default colourpicker" type="button" id="'+number+'">'+
                                                '<i class="fa fa-tint fa-lg"></i> Color'+
                                            '</button>'+
                                            '<em id="colorpicker-log"></em>'+
                                        '</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            refOptions+
                            '<div class="form-group hidden">'+
                                '<label class="col-sm-3 control-label" for="query-bz">Bugzilla URL</label>'+
                                '<div class="col-sm-9 controls">'+
                                    '<div class="input-group">'+
                                        '<input class="form-control" id="query-bz" placeholder="URL that links to this query in Bugzilla.">'+
                                        '<span class="input-group-btn">'+
                                            '<button class="btn btn-primary quick-qb" type="button" id="'+number+'">'+
                                                '<i class="fa fa-magic fa-lg"></i> Qb'+
                                            '</button>'+
                                        '</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="query-qb">Crash-Stats Query</label>'+
                                '<div class="col-sm-9">'+
                                    '<textarea class="form-control" rows="3" id="query-qb" placeholder="{"source":"crash-stats","data":{"days_ago":2}}"></textarea>'+
                                '</div>'+
                            '</div>';
        } else if (dataSource == "bugzilla") {
            var refOptions = '';
            if ( coreData.hasOwnProperty('product') ) { 
                refOptions +=   '<div class="form-group">'+
                                    '<label class="col-sm-3 control-label" for="query-reference">References</label>'+
                                    '<div class="col-sm-9 controls">'+
                                       '<select class="form-control" id="query-reference">'+
                                            '<option value="none">None</option>';

                $.each( coreData.product.versions, function(key, version){
                    if ( parseInt(version.id) < parseInt(coreData.id) ) {
                        refOptions +=       '<option value="'+version.id+'">'+version.title+'</option>';
                    }
                });

                refOptions +=           '</select>'+
                                    '</div>'+
                                '</div>';
            }
            html =          '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="query-name">Query Name</label>'+
                                '<div class="col-sm-9 controls">'+
                                    '<div class="input-group">'+
                                        '<input type="text" class="form-control" id="query-name" placeholder="Description for this query.">'+
                                        '<span class="input-group-btn">'+
                                            '<button class="btn btn-default colourpicker" type="button" id="'+number+'">'+
                                                '<i class="fa fa-tint fa-lg"></i> Color'+
                                            '</button>'+
                                            '<em id="colorpicker-log"></em>'+
                                        '</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            refOptions+
                            '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="query-bz">Bugzilla URL</label>'+
                                '<div class="col-sm-9 controls">'+
                                    '<div class="input-group">'+
                                        '<input class="form-control" id="query-bz" placeholder="URL that links to this query in Bugzilla.">'+
                                        '<span class="input-group-btn">'+
                                            '<button class="btn btn-primary quick-qb" type="button" id="'+number+'">'+
                                                '<i class="fa fa-magic fa-lg"></i> Qb'+
                                            '</button>'+
                                        '</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="query-qb">Qb Query</label>'+
                                '<div class="col-sm-9">'+
                                    '<textarea class="form-control" rows="3" id="query-qb" placeholder="Query in Qb format as a json object."></textarea>'+
                                '</div>'+
                            '</div>';

        } else if (dataSource == "graphs") {
            var refOptions = '';
            if ( coreData.hasOwnProperty('product') ) { 
                refOptions +=   '<div class="form-group hidden">'+
                                    '<label class="col-sm-3 control-label" for="query-reference">References</label>'+
                                    '<div class="col-sm-9 controls">'+
                                       '<select class="form-control" id="query-reference">'+
                                            '<option value="none">None</option>';

                $.each( coreData.product.versions, function(key, version){
                    if ( parseInt(version.id) < parseInt(coreData.id) ) {
                        refOptions +=       '<option value="'+version.id+'">'+version.title+'</option>';
                    }
                });

                refOptions +=           '</select>'+
                                    '</div>'+
                                '</div>';
            }
            html =          '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="query-name">Query Name</label>'+
                                '<div class="col-sm-9 controls">'+
                                    '<div class="input-group">'+
                                        '<input type="text" class="form-control" id="query-name" placeholder="Description for this query.">'+
                                        '<span class="input-group-btn">'+
                                            '<button class="btn btn-default colourpicker" type="button" id="'+number+'">'+
                                                '<i class="fa fa-tint fa-lg"></i> Color'+
                                            '</button>'+
                                            '<em id="colorpicker-log"></em>'+
                                        '</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            refOptions+
                            '<div class="form-group hidden">'+
                                '<label class="col-sm-3 control-label" for="query-bz">Bugzilla URL</label>'+
                                '<div class="col-sm-9 controls">'+
                                    '<div class="input-group">'+
                                        '<input class="form-control" id="query-bz" placeholder="URL that links to this query in Bugzilla.">'+
                                        '<span class="input-group-btn">'+
                                            '<button class="btn btn-primary quick-qb" type="button" id="'+number+'">'+
                                                '<i class="fa fa-magic fa-lg"></i> Qb'+
                                            '</button>'+
                                        '</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="query-qb">Graphs Query</label>'+
                                '<div class="col-sm-9">'+
                                    '<textarea class="form-control" rows="3" id="query-qb" placeholder="'+
                                    'graphs query'+
                                    '"></textarea>'+
                                '</div>'+
                            '</div>';
        }  else if (dataSource == "telemetry") {
            var refOptions = '';
            if ( coreData.hasOwnProperty('product') ) { 
                refOptions +=   '<div class="form-group hidden">'+
                                    '<label class="col-sm-3 control-label" for="query-reference">References</label>'+
                                    '<div class="col-sm-9 controls">'+
                                       '<select class="form-control" id="query-reference">'+
                                            '<option value="none">None</option>';

                $.each( coreData.product.versions, function(key, version){
                    if ( parseInt(version.id) < parseInt(coreData.id) ) {
                        refOptions +=       '<option value="'+version.id+'">'+version.title+'</option>';
                    }
                });

                refOptions +=           '</select>'+
                                    '</div>'+
                                '</div>';
            }
            html =          '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="query-name">Query Name</label>'+
                                '<div class="col-sm-9 controls">'+
                                    '<div class="input-group">'+
                                        '<input type="text" class="form-control" id="query-name" placeholder="Description for this query.">'+
                                        '<span class="input-group-btn">'+
                                            '<button class="btn btn-default colourpicker" type="button" id="'+number+'">'+
                                                '<i class="fa fa-tint fa-lg"></i> Color'+
                                            '</button>'+
                                            '<em id="colorpicker-log"></em>'+
                                        '</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            refOptions+
                            '<div class="form-group hidden">'+
                                '<label class="col-sm-3 control-label" for="query-bz">Bugzilla URL</label>'+
                                '<div class="col-sm-9 controls">'+
                                    '<div class="input-group">'+
                                        '<input class="form-control" id="query-bz" placeholder="URL that links to this query in Bugzilla.">'+
                                        '<span class="input-group-btn">'+
                                            '<button class="btn btn-primary quick-qb" type="button" id="'+number+'">'+
                                                '<i class="fa fa-magic fa-lg"></i> Qb'+
                                            '</button>'+
                                        '</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="query-qb">Telemetry Query</label>'+
                                '<div class="col-sm-9">'+
                                    '<textarea class="form-control" rows="3" id="query-qb" placeholder="'+
                                    'telemetry query'+
                                    // '{\n
                                    //     "data": {\n
                                    //         "version": "release/31",\n
                                    //         "measure":"PLUGIN_CALLED_DIRECTLY"\n
                                    //     },\n
                                    //     "source": "telemetry"\n
                                    // }\n'+
                                    '"></textarea>'+
                                '</div>'+
                            '</div>';
        }





        return html
    }

    function templateNewGroup ( number ) {
        var html = '<div class="query" id="q'+ number +'">'+
                        '<button type="button" class="btn btn-xs btn-default" id="remove-query">'+
                            '<i class="fa fa-times"></i>'+
                        '</button>'+

                        '<div class="form-group">'+
                            '<label class="col-sm-3 control-label" for="query-name">Data Source</label>'+
                            '<div class="col-sm-9 controls">'+
                               '<select class="form-control" id="data-source">'+
                                    '<option value="bugzilla">Bugzilla</option>'+
                                    '<option value="graphs">Graphs</option>'+
                                    '<option value="crash-stats">Crash Stats</option>'+
                                    '<option value="telemetry">Telemetry</option>'+
                               '</select>'+
                            '</div>'+
                        '</div>'+

                        '<div class="data-form" id="'+number+'">'+
                            templateDataInput('bugzilla',number)+
                        '</div>'+
                    '</div>';
        return html;
    }

    function templateOldGroup ( query_id, query ) {
        var refOptions = '';
        var isCustom = false;
        if ( coreData.hasOwnProperty('product') ) { 
            isCustom = true;
            refOptions +=   ((query.source == 'bugzilla') ? '<div class="form-group">' : '<div class="form-group hidden">')+
                                '<label class="col-sm-3 control-label" for="query-reference">References</label>'+
                                '<div class="col-sm-9 controls">'+
                                   '<select class="form-control" id="query-reference" disabled>'+
                                        '<option value="none">None</option>';

            $.each( coreData.product.versions, function(key, version){
                if ( parseInt(version.id) < parseInt(coreData.id) ) {
                    refOptions +=       '<option value="'+version.id+'">'+version.title+'</option>';
                }
            });

            refOptions +=           '</select>'+
                                '</div>'+
                            '</div>';
        }

        var sourceOption = '';
        if (query.source == 'bugzilla') {
            sourceOption = '<option value="graphs">Graphs</option>'+
            '<option selected value="bugzilla">Bugzilla</option>'+
            '<option value="crash-stats">Crash Stats</option>'+
            '<option value="telemetry">Telemetry</option>';
        } else if (query.source == 'crash-stats') {
            sourceOption = '<option value="graphs">Graphs</option>'+
            '<option value="bugzilla">Bugzilla</option>'+
            '<option selected value="crash-stats">Crash Stats</option>'+
            '<option value="telemetry">Telemetry</option>';
        } else if (query.source == 'telemetry') {
            sourceOption = '<option value="graphs">Graphs</option>'+
            '<option value="bugzilla">Bugzilla</option>'+
            '<option value="crash-stats">Crash Stats</option>'+
            '<option selected value="telemetry">Telemetry</option>';
        } else if (query.source == 'graphs') {
            sourceOption = '<option selected value="graphs">Graphs</option>'+
            '<option value="bugzilla">Bugzilla</option>'+
            '<option value="crash-stats">Crash Stats</option>'+
            '<option value="telemetry">Telemetry</option>';
        }

        var filledForms = '';

        if (query.source == 'bugzilla') {
            filledForms = 
                '<div class="form-group">'+
                    '<label class="col-sm-3 control-label" for="query-name">Query Name</label>'+
                    '<div class="col-sm-9 controls" >'+
                        '<div class="input-group">'+
                            '<input type="text" class="form-control" id="query-name" placeholder="Description for this query." value="'+((isCustom) ? query.raw.title : query.title)+'">'+
                            '<span class="input-group-btn">'+
                                '<button class="btn btn-default colourpicker" type="button" id="q'+query_id+'" style="color:'+query.colour+';">'+
                                    '<i class="fa fa-tint fa-lg"></i> Color'+
                                '</button>'+
                                '<em id="colorpicker-log"></em>'+
                            '</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+                        
                refOptions+
                '<div class="form-group">'+
                    '<label class="col-sm-3 control-label" for="query-bz">Bugzilla URL</label>'+
                    '<div class="col-sm-9 controls">'+
                        '<div class="input-group">'+    
                            '<input class="form-control" id="query-bz" value="'+((isCustom) ? query.raw.bz_query : query.bz_query)+'" placeholder="URL that links to this query in Bugzilla.">'+
                            '<span class="input-group-btn">'+
                                '<button class="btn btn-primary quick-qb disabled" type="button" id="q'+query_id+'">'+
                                    '<i class="fa fa-magic fa-lg"></i> Qb'+
                                '</button>'+
                            '</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group">'+
                    '<label class="col-sm-3 control-label" for="query-qb">Qb Query</label>'+
                    '<div class="col-sm-9">'+
                        '<textarea class="form-control" rows="3" id="query-qb" placeholder="Query in Qb format as a json object.">'+((isCustom) ? query.raw.qb_query : query.qb_query)+'</textarea>'+
                    '</div>'+
                '</div>'+
            '</div>';
        } else if (query.source == 'crash-stats') {
            filledForms = 
                '<div class="form-group">'+
                    '<label class="col-sm-3 control-label" for="query-name">Query Name</label>'+
                    '<div class="col-sm-9 controls" >'+
                        '<div class="input-group">'+
                            '<input type="text" class="form-control" id="query-name" placeholder="Description for this query." value="'+((isCustom) ? query.raw.title : query.title)+'">'+
                            '<span class="input-group-btn">'+
                                '<button class="btn btn-default colourpicker" type="button" id="q'+query_id+'" style="color:'+query.colour+';">'+
                                    '<i class="fa fa-tint fa-lg"></i> Color'+
                                '</button>'+
                                '<em id="colorpicker-log"></em>'+
                            '</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+                        
                refOptions+
                '<div class="form-group hidden">'+
                    '<label class="col-sm-3 control-label" for="query-bz">Bugzilla URL</label>'+
                    '<div class="col-sm-9 controls">'+
                        '<div class="input-group">'+    
                            '<input class="form-control" id="query-bz" value="'+((isCustom) ? query.raw.bz_query : query.bz_query)+'" placeholder="URL that links to this query in Bugzilla.">'+
                            '<span class="input-group-btn">'+
                                '<button class="btn btn-primary quick-qb disabled" type="button" id="q'+query_id+'">'+
                                    '<i class="fa fa-magic fa-lg"></i> Qb'+
                                '</button>'+
                            '</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group">'+
                    '<label class="col-sm-3 control-label" for="query-qb">Crash Stats Query</label>'+
                    '<div class="col-sm-9">'+
                        '<textarea class="form-control" rows="3" id="query-qb" placeholder="Query in Qb format as a json object.">'+((isCustom) ? query.raw.qb_query : query.qb_query)+'</textarea>'+
                    '</div>'+
                '</div>'+
            '</div>';
        } else if (query.source == 'telemetry') {
            filledForms = 
                '<div class="form-group">'+
                    '<label class="col-sm-3 control-label" for="query-name">Query Name</label>'+
                    '<div class="col-sm-9 controls" >'+
                        '<div class="input-group">'+
                            '<input type="text" class="form-control" id="query-name" placeholder="Description for this query." value="'+((isCustom) ? query.raw.title : query.title)+'">'+
                            '<span class="input-group-btn">'+
                                '<button class="btn btn-default colourpicker" type="button" id="q'+query_id+'" style="color:'+query.colour+';">'+
                                    '<i class="fa fa-tint fa-lg"></i> Color'+
                                '</button>'+
                                '<em id="colorpicker-log"></em>'+
                            '</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+                        
                refOptions+
                '<div class="form-group hidden">'+
                    '<label class="col-sm-3 control-label" for="query-bz">Bugzilla URL</label>'+
                    '<div class="col-sm-9 controls">'+
                        '<div class="input-group">'+    
                            '<input class="form-control" id="query-bz" value="'+((isCustom) ? query.raw.bz_query : query.bz_query)+'" placeholder="URL that links to this query in Bugzilla.">'+
                            '<span class="input-group-btn">'+
                                '<button class="btn btn-primary quick-qb disabled" type="button" id="q'+query_id+'">'+
                                    '<i class="fa fa-magic fa-lg"></i> Qb'+
                                '</button>'+
                            '</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group">'+
                    '<label class="col-sm-3 control-label" for="query-qb">Telemetry Query</label>'+
                    '<div class="col-sm-9">'+
                        '<textarea class="form-control" rows="3" id="query-qb" placeholder="Query in Qb format as a json object.">'+((isCustom) ? query.raw.qb_query : query.qb_query)+'</textarea>'+
                    '</div>'+
                '</div>'+
            '</div>';
        } else if (query.source == 'graphs') {
            filledForms = 
                '<div class="form-group">'+
                    '<label class="col-sm-3 control-label" for="query-name">Query Name</label>'+
                    '<div class="col-sm-9 controls" >'+
                        '<div class="input-group">'+
                            '<input type="text" class="form-control" id="query-name" placeholder="Description for this query." value="'+((isCustom) ? query.raw.title : query.title)+'">'+
                            '<span class="input-group-btn">'+
                                '<button class="btn btn-default colourpicker" type="button" id="q'+query_id+'" style="color:'+query.colour+';">'+
                                    '<i class="fa fa-tint fa-lg"></i> Color'+
                                '</button>'+
                                '<em id="colorpicker-log"></em>'+
                            '</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+                        
                refOptions+
                '<div class="form-group hidden">'+
                    '<label class="col-sm-3 control-label" for="query-bz">Bugzilla URL</label>'+
                    '<div class="col-sm-9 controls">'+
                        '<div class="input-group">'+    
                            '<input class="form-control" id="query-bz" value="'+((isCustom) ? query.raw.bz_query : query.bz_query)+'" placeholder="URL that links to this query in Bugzilla.">'+
                            '<span class="input-group-btn">'+
                                '<button class="btn btn-primary quick-qb disabled" type="button" id="q'+query_id+'">'+
                                    '<i class="fa fa-magic fa-lg"></i> Qb'+
                                '</button>'+
                            '</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group">'+
                    '<label class="col-sm-3 control-label" for="query-qb">Graphs Query</label>'+
                    '<div class="col-sm-9">'+
                        '<textarea class="form-control" rows="3" id="query-qb" placeholder="Query in Qb format as a json object.">'+((isCustom) ? query.raw.qb_query : query.qb_query)+'</textarea>'+
                    '</div>'+
                '</div>'+
            '</div>';
        }


        var html = '<div class="query" id="q'+ query_id +'">'+
                        '<div class="form-group">'+
                            '<input type="hidden" class="form-control" id="query-id">'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label class="col-sm-3 control-label" for="query-name">Data Source</label>'+
                            '<div class="col-sm-9 controls">'+
                               '<select class="form-control" id="data-source">'+
                                sourceOption+
                               '</select>'+
                            '</div>'+
                        '</div>'+




                    filledForms
                    ;
        return html;
    }