/*****************************
    BLOCK TEMPLATES FOR QUERIES OF
    NEW GROUPS AND EXISTING GROUPS
*****************************/
    function templateNewGroup ( number ) {
        var refOptions = '';
        if ( coreData.hasOwnProperty('product') ) { 
            refOptions +=   '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="new-query-reference">References</label>'+
                                '<div class="col-sm-9 controls">'+
                                   '<select class="form-control" id="new-query-reference">'+
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
                        refOptions+
                        '<div class="form-group">'+
                            '<label class="col-sm-3 control-label" for="new-query-bz">Bugzilla URL</label>'+
                            '<div class="col-sm-9 controls">'+
                                '<div class="input-group">'+
                                    '<input class="form-control" id="new-query-bz" placeholder="URL that links to this query in Bugzilla.">'+
                                    '<span class="input-group-btn">'+
                                        '<button class="btn btn-primary quick-qb" type="button" id="'+number+'">'+
                                            '<i class="fa fa-magic fa-lg"></i> Qb'+
                                        '</button>'+
                                    '</span>'+
                                '</div>'+
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
        var refOptions = '';
        var isCustom = false;
        if ( coreData.hasOwnProperty('product') ) { 
            isCustom = true;
            refOptions +=   '<div class="form-group">'+
                                '<label class="col-sm-3 control-label" for="old-query-reference">References</label>'+
                                '<div class="col-sm-9 controls">'+
                                   '<select class="form-control" id="old-query-reference" disabled>'+
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

        var html = '<div class="old-query" id="q'+ query_id +'">'+
                        '<div class="form-group">'+
                            '<input type="hidden" class="form-control" id="query-id">'+
                        '</div>'+
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
        return html;
    }