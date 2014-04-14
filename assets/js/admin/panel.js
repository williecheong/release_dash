// Toggle handlers for showing and hiding the right tables when buttons are clicked
$('.btn.db-table-title').click(function(){
        
    if ( $(this).hasClass('active') ) {
        $('button.db-table-title').removeClass('active');
        $('div.db-table').hide('fast');
                
    } else {
        $('button.db-table-title').removeClass('active');
        $('div.db-table').hide('fast');
        
        $(this).addClass('active');
        $( $(this).data('db-table-toggler') ).show();
    }

});