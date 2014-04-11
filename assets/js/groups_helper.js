/*********************************
    QUICK QB QUERIES
*********************************/
    function quickQbmaker( $button ) {
        var $target = $button.closest('div.new-query').find('textarea#new-query-qb');

        $button.addClass('disabled');
        $target.attr('disabled', true);

        bzURL = $button.closest('div.input-group').find('input#new-query-bz').val();
        var bzURL = bzURL.split('?');
        if ( !bzURL[1] ) {
            // If it is not found, we have a problem
            alert('No bugzilla query found.');
            $button.removeClass('disabled');
            $target.removeAttr('disabled');
            return;
        }

        // Generate the URL as a string then send a request to our dashboard
        // The dashboard's API performs a CURL on bugzilla and returns the page as a string of HTML
        // Note: It is not possible to do javascript requests to external sites, hence the internal API
        var bzQueryURL = 'https://bugzilla.mozilla.org/query.cgi?' + bzURL[1];

        $.ajax({
            url: '/api/misc/exthtml',
            data: { source : bzQueryURL },
            type: 'POST',
            success: function( response ) {
                // Start building the Qb query with all our parameters
                var qbQuery = bzSearchToQb( response, '@birthday', '@timestamp', 'public_bugs' );
                
                $button.removeClass('disabled');
                $target.removeAttr('disabled');

                $target.css( 'background', '#E5FFDD' );
                $target.text( qbQuery );
                setTimeout(function() {
                    $target.css( 'background', '' );
                }, 1500);
            }, 
            error: function(response) {
                alert('Fail: Bugzilla could not be reached.');
                $button.removeClass('disabled');
                $target.removeAttr('disabled');
                console.log(response);
            }
        });
    }
                    

/*********************************
    VALIDATION FOR GROUPS AND QUERIES
*********************************/
    function validateGroup( saveGroup, queryType ) {
        // Validation for the group's input values
        if ( saveGroup['group_title'] == '' ) {
            return "Group name cannot be empty.";
        }
        
        if ( (saveGroup['group_is_plot'] + saveGroup['group_is_number']) == 0 ) {
            return "Group has to be either a plot or number.";
        }

        if ( $('.'+queryType+'-query').length == 0 ) {
            // Checks that there is at least one query
            return "No queries found." ;
        } 
        // OK validation pass
        return false;
    }

    function validateQuery( saveQuery ) {
        if ( saveQuery.query_title == '' ) {
            return "Query name cannot be empty.";
        }

        var isJSON = validateJSON( saveQuery.query_query_qb );
        if ( !isJSON ) {
            return "Qb query must be JSON";
        }
        return false;
    }
    
/*****************************
    POST PUT AJAX REQUESTS
*****************************/
    function postGroup( saveGroup, $this ) {
        $.ajax({
            url: '/api/groups',
            type: 'POST',
            data: saveGroup,
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
    }

    function putGroup( saveGroup, $this ){
        $.ajax({
            url: '/api/groups',
            type: 'PUT',
            data: saveGroup,
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
    }

    function deleteGroup( groupID, $this ){
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
    } 

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
