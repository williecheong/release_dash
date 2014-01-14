$('#myModal').modal({
    show : false
});

//Toggles the view of channels on each product
$('.toggler').click(function(){
    $( '.channels#' + $(this).attr('id') ).toggle('slow');
});

$('.channel').click(function(){
    var spanner = $(this).data('channel') + " (" + $(this).data('product') + ")";
    $('span.descriptor#product-channel').text( spanner );
    $('#myModal').modal('toggle');
});