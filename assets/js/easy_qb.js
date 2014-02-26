
$('input.datepicker').datepicker({
    'altFormat' : "yy-dd-mm"
});

var newQueryInputCounter = 0;

$('.btn#add-query-input').click(function(){
    $('div.query-inputs').append( templateQueryInput( newQueryInputCounter++ ) );
    $('.btn#remove-query-input').click(function(){
        $(this).closest('div.row.query-input').remove();
    });
});

$('.btn#query-compile').click(function(){
    $('textarea.query-output').append('Beep beep. Qb query magic.\n');
});