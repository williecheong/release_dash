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
        position: { my: 'top right' }
    });

/*************************************
    REDIRECT TO VERSION PAGE
*************************************/
    $('.version').click( function() {        
        // Identify chosen product and version
        product = $(this).closest('.versions').attr('id');
        version = $(this).attr('id');

        // Execute the redirection
        window.location.href = "/for/" + product + "/" + version;
    });

/************************
    VERY IMPORTANT FUNCTIONS
************************/

/*****************************
    MAKE LIFE AWESOME FUNCTIONS
*****************************/
    function clearDiv(){
        $('.js-clear').html('');
    }







