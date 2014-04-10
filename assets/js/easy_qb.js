/***********************
    Page specific event triggers
***********************/
    // Initializing the datepicker
    $('input.datepicker').datepicker();

    // User has clicked on the button for getting the query in Qb format
    $('.btn#query-compile').click(function(){
        $this = $(this);
        $this.addClass('disabled');

        // Retrieve the specified URL
        bzURL = $('input#bz-url').val();
        // Extract the query portion of the URL
        var bzURL = bzURL.split('?');
        if ( !bzURL[1] ) {
            // If it is not found, we have a problem
            alert('No bugzilla query found.');
            $this.removeClass('disabled');
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
                // Assign the specified start date 
                // Use the soft tag if none was specified
                var start = '@birthday';
                if ( $('input#query-start').val() ) {
                    start = $('input#query-start').val();
                    var tempStart = start.split('/'); // string was formatted: mm/dd/yyyy
                    if ( tempStart[0] && tempStart[1] && tempStart [2] ){
                        start = new Date(tempStart[2], tempStart[0] - 1, tempStart[1]).getTime();    
                    }
                }

                // Assign the specified end date 
                // Use the soft tag if none was specified
                var end = '@timestamp';
                if ( $('input#query-end').val() ) {
                    end = $('input#query-end').val();
                    var tempEnd = end.split('/'); // string was formatted: mm/dd/yyyy
                    if ( tempEnd[0] && tempEnd[1] && tempEnd [2] ){
                        end = new Date(tempEnd[2], tempEnd[0] - 1, tempEnd[1]).getTime();    
                    }
                }

                // Assign the specified cluster type
                var cluster = 'private_bugs';
                if ( $('input#public_cluster:checked').length == 1 ) {
                    cluster = 'public_bugs';
                }

                // Start building the Qb query with all our parameters
                var qbQuery = bzSearchToQb( response, start, end, cluster );
                
                $this.removeClass('disabled');
                showResult(qbQuery);
            }, 
            error: function(response) {
                alert('Fail: Bugzilla could not be reached.');
                $this.removeClass('disabled');
                console.log(response);
            }
        });
    });

/*****************************
    Make life awesome - Helper functions
******************************/
    // Puts the output text inside the text box
    // Also gives it a nice green color that fades out after a while
    function showResult( text ){
        $('textarea.query-output').css( 'background', '#E5FFDD' );
        $('textarea.query-output').text( text );
        setTimeout(function() {
            $('textarea.query-output').css( 'background', '' );
        }, 1500);
    }
