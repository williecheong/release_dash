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


