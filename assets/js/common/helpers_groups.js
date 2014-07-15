/*********************************
    QUICK QB QUERIES
*********************************/
    function quickQbmaker( $button ) {
        var $target = $button.closest('div.query').find('textarea#query-qb');

        $button.addClass('disabled');
        $target.attr('disabled', true);

        bzURL = $button.closest('div.input-group').find('input#query-bz').val();
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
    EXTRACTION OF GROUPS AND QUERIES FROM A MODAL
*********************************/
    function extractGroup( $modal ) {
        var saveGroup = {};
        saveGroup = {
            group_title : $.trim( $modal.find('#group-name').val() ),
            group_is_plot : $modal.find('#group-is-plot:checked').length,
            group_is_number : $modal.find('#group-is-number:checked').length,
            group_category : $.trim( $modal.find('#group-category').val() ),
            group_queries : {} 
        };

        $.each( $modal.find('.query'), function(key, value){
            // Retrieving input group query's values into saveGroup
            var $queryHTML = $modal.find('.query#'+value.id);
            
            if ($queryHTML.find('select#data-source').val() == 'nonexistentvalue') {
                saveGroup.group_queries[value.id] = {
                    query_title     : "new",
                    query_query_bz  : "talos",
                    query_query_qb  : '{"talos":1}',
                    ref_version     : "talosref",
                }; 
                // if ( typeof saveGroup.group_queries[value.id].ref_version == 'undefined' ) {
                //     saveGroup.group_queries[value.id].query_query_references = 'none';
                // }
            } else {
                var tempColor = rgb2hex( $modal.find('.query#'+value.id).find('button.colourpicker').css('color') );
                
                saveGroup.group_queries[value.id] = {
                    query_title     : $.trim( $queryHTML.find('input#query-name').val() ),
                    query_colour    : tempColor,
                    query_query_bz  : $queryHTML.find('input#query-bz').val(),
                    query_query_qb  : $queryHTML.find('textarea#query-qb').val(),
                    ref_version     : $queryHTML.find('select#query-reference option:selected').val(),
                    ref_colour      : shadeColor(tempColor, 45)
                };
                // End of retrieving input group query's values into saveGroup

                if ( typeof saveGroup.group_queries[value.id].ref_version == 'undefined' ) {
                    saveGroup.group_queries[value.id].query_query_references = 'none';
                }
                // End of validation for group query's input values
            }
        });
        
        return saveGroup;
    }
    

/*********************************
    VALIDATION FOR GROUPS AND QUERIES
*********************************/
    function validateGroup( saveGroup ) {
        // Validation for the group's input values
        if ( saveGroup['group_title'] == '' ) {
            return "Group name cannot be empty.";
        }
        
        if ( (saveGroup['group_is_plot'] + saveGroup['group_is_number']) == 0 ) {
            return "Group has to be either a plot or number.";
        }

        var queryCount = 0;
        var queryError = [];
        $.each( saveGroup.group_queries, function(key, value){ 
            // Validation for the group query's input values
            var tempError = validateQuery( value );
            if ( tempError ) {
                queryError.push( tempError );
            }
            queryCount++;
        });

        if ( queryCount == 0 ) {
            return "No queries found.";
        }

        if ( queryError.length > 0 ) {
            return queryError.join("\n");
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
        // alert(JSON.stringify(saveGroup));
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


