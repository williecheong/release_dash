
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
    return start + ' ' + end + ' ' + cluster + ' ' + html;
}