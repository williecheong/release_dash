
$('input.datepicker').datepicker();

$('.btn#query-compile').click(function(){
    $this = $(this);
    $this.addClass('disabled');

    bzURL = $('input#bz-url').val();
    var bzURL = bzURL.split('?');
    if ( !bzURL[1] ) {
        alert('No bugzilla query found.');
        return;
    }

    var bzQueryURL = 'https://bugzilla.mozilla.org/query.cgi?' + bzURL[1];

    $.ajax({
            url: '/api/misc/exthtml',
            data: { source : bzQueryURL },
            type: 'POST',
            success: function( response ) {
                var start = '<birthday>';
                if ( $('input#query-start').val() ) {
                    start = $('input#query-start').val();
                }

                var end = '<timestamp>';
                if ( $('input#query-end').val() ) {
                    end = $('input#query-end').val();
                }

                var cluster = 'private_bugs';
                if ( $('input#public_cluster:checked').length == 1 ) {
                    cluster = 'public_bugs';
                }

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
    MAKE LIFE AWESOME FUNCTIONS
******************************/

function showResult( text ){
    $('textarea.query-output').css( 'background', '#E5FFDD' );
    $('textarea.query-output').text( text );
    setTimeout(function() {
        $('textarea.query-output').css( 'background', '' );
    }, 1500);
}

// Outputs a Qb query in JSON
// Based on BZ search HTML 
// With pre-filled params
function bzSearchToQb( html, start, end, cluster ){
    var qbQuery = {};

    qbQuery.from    = cluster;
    
    qbQuery.select  = {
            "name": "num",
            "value": "bug_id",
            "aggregate": "count"
        };

    // Replace password fields with text fields in the HTML
    // Prevents false security errors from appearing in console
    html = html.replace('type="password"', 'type="text"');
    $extract = $('form#queryform', html);
    qbQuery.esfilter = parseBzSearch( $extract );

    qbQuery.edges = [{
            "range": {
                "min": "modified_ts",
                "max": "expires_on"
            },
            "domain": {
                "type": "date",
                "min": start,
                "max": end,
                "interval": "day"
            }
        }];

    return JSON.stringify( qbQuery, null, '\t' ).replace(/"</g, '<').replace(/>"/g, ">");
}

// Mostly uses RegEx to extract Bugzilla search params from HTML
function parseBzSearch( $subject ){
    var esfilterObj = {};
    esfilterObj.and = [];

    var tempVal = '';

    //Top most summary input (needs regex filter)
    tempVal = $subject.find('div#summary_field input#short_desc').val() ;
    if ( tempVal ){
        var tempOpr = $subject.find('div#summary_field select[name="short_desc_type"]').val();
        var terms = fovQb( 'short_desc', tempOpr, tempVal );
        esfilterObj.and.push( terms );
    }

    // Parses the two rows of multi-select grids
    var search_field_grid = [ 
        'classification', 
        'product', 
        'component', 
        'bug_status', 
        'resolution', 
        'version', 
        'target_milestone', 
        'bug_severity', 
        'priority', 
        'rep_platform', 
        'op_sys' 
    ];
    $.each( search_field_grid, function( key, gridName ){
        tempVal = $subject.find('div#container_'+ gridName +' select#'+ gridName +' option:selected').map(function(){return $(this).val();}).get() ;  
        if ( tempVal.length > 0 ){
            var terms = {};
            terms[gridName] = tempVal;
            esfilterObj.and.push( { "terms" : terms } );
        }
    });

    // Parses the six rows directly below "Detailed Bug Information"
    var search_field_row = [ 'longdesc', 'bug_file_loc', 'status_whiteboard', 'keywords', 'bug_id', 'votes' ];
    $.each( search_field_row, function( key, rowName ){
        tempVal = $subject.find('div.search_field_row').find('input#'+rowName).val() ;  
        if ( tempVal.length > 0 ){
            var tempOpr = '';
            if ( rowName == 'votes' ){
                tempOpr = $subject.find('div.search_field_row').find('input[name="votes_type"]').val();
            } else {
                tempOpr = $subject.find('div.search_field_row').find('select[name="'+rowName+'_type"] option:selected').val();
            }

            var terms = fovQb( rowName, tempOpr, tempVal );
            esfilterObj.and.push( terms );
        }
    });

    // Parses the email search fields
    var search_email_fields = [ 1, 2, 3 ];
    var roles = [ 'assigned_to', 'reporter', 'qa_contact', 'cc', 'longdesc' ];
    $.each( search_email_fields, function( key, col ){
        tempVal = $subject.find('div.search_email_fields').find('input#email'+col).val() ;
        if ( tempVal.length > 0 ){
            var subObj = {};
            subObj.or = [];

            var tempOpr = $subject.find('div.search_email_fields').find('select[name="email_type'+col+'"] option:selected').val();
            $.each( roles, function( key, role ){
                var isChecked = $subject.find('div.search_email_fields').find('input#email'+role+col+':checked').length;
                if ( isChecked > 0 ){
                    subObj.or.push( fovQb(role, tempOpr, tempVal) );
                }
            });

            esfilterObj.and.push( subObj );
        }
    }); 

    return esfilterObj;
}

function fovQb( field, operator, value ){    
    var outer = {}; 
    var inner = {};

    inner[field] = value;
    outer[operator] = inner;

    return outer;
}


