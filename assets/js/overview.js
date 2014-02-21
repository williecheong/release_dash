/*********************************
    JUST SETTING UP THE PAGE HERE
*********************************/
    //Toggles the view of channels on each product
    $('[data-mytoggler]').click(function(){
        var toToggle = $(this).data('mytoggler');
        $( toToggle ).toggle('slow');
    });

    // Initializing qtip for better tooltips
    $('[title!=""]').qtip({
        position: { my: 'top right', at: 'bottom right' }
    });

/*************************************
    REDIRECT TO VERSION PAGE
*************************************/
    // Done directly on views via <a> tags 

/************************
    VERY IMPORTANT FUNCTIONS
************************/

/*****************************
    MAKE LIFE AWESOME FUNCTIONS
*****************************/
    function clearDiv(){
        $('.js-clear').html('');
    }







