
$('input.datepicker').datepicker();

var newQueryInputCounter = 0;
$('.btn#add-query-input').click(function(){
    makeNewQuery();
});

$('.btn#query-compile').click(function(){
    $('textarea.query-output').append('Beep beep. Qb query magic.\n');
});

$('.btn#parse-bz-url').click(function(){
    // Get the bzURL then make an array of inputs
    // Each input is an array of 2 values 
    // First is field name, second is actual value
    var bzURL = $('input#bz-url').val();
    var tempBzQueries = bzURL.split('?');
    tempBzQueries = tempBzQueries[1].split('&');

    var bzQueries = {};

    $.each( tempBzQueries, function(key, value) {
        tempBzQueries[key] = value.split('=');
        bzQueries[ tempBzQueries[key][0] ] = tempBzQueries[key][1];
    });

    var i = 0;
    var queryInputs = {}; 
    $.each( bzQueries, function(qLeft, qRight) {
        // First check for the standard field equal value BZquery.
        if ( $.inArray(qLeft, bzFields) !== -1 ) {
            queryInputs[i++] = [ qLeft, '=', qRight ] ;
        }

        // Next do the compounded one where BZquery is split into multiple queries
        if ( $.inArray(qRight, bzFields) !== -1 ){
            var operatorKey  = qLeft.replace('f', 'o');
            var valueKey     = qLeft.replace('f', 'v');
            
            if ( bzQueries[operatorKey] == 'equals' ) {
                bzQueries[operatorKey] = '=';
            } else {
                bzQueries[operatorKey] = '!=';
            }

            queryInputs[i++] = [ qRight, bzQueries[operatorKey], bzQueries[valueKey] ] ;
        }
    });

    $.each( queryInputs, function(key, queryInput){
        var thisQueryInput = newQueryInputCounter;
        makeNewQuery();
        
        $('div#query-input-'+thisQueryInput).find('select#query-field option[value="'+queryInput[0]+'"]').attr("selected",true);
        $('div#query-input-'+thisQueryInput).find('select#query-operator option[value="'+queryInput[1]+'"]').attr("selected",true);
        $('div#query-input-'+thisQueryInput).find('input#query-value').val( unescape(queryInput[2]) );
    });
});

/*****************************
    MAKE LIFE AWESOME FUNCTIONS
******************************/

function makeNewQuery(){
    $('div.query-inputs').append( templateQueryInput( newQueryInputCounter++ ) );
    $('.btn#remove-query-input').click(function(){
        $(this).closest('div.row.query-input').remove();
    });
}

