/*********************************
    JUST SETTING UP THE PAGE HERE
*********************************/
    $('#overview').modal({
        show : false
    });

    //Toggles the view of channels on each product
    $('[data-toggler]').click(function(){
        var toToggle = $(this).data('toggler');
        $( toToggle ).toggle('slow');
    });

/*************************************
    MODAL GENERATION AND ES RETRIEVAL
*************************************/
    var product = '';
    var version = '';
    //var totalQueries = 0;
    //var completedRetrievals = 0;

    $('.channel').click(function(){
        clearDiv();
        
        // Identify chosen product and version
        product = $(this).closest('.channels').attr('id');
        version = $(this).attr('id');

        // Put version title on header
            $('span.descriptor#product-channel').html( coreData[product].versions[version]['title'] ); 
        // Put comments inside the body
            $('.modal-body #comments').html( generateComments() );
        // Setup the link to see details
            $('.modal-footer #redirect-details').attr("href", "/for/"+product+"/"+version);
        
        // Now we finally show the modal
        $('#overview').modal('show');

        // Of course we remember to reset
        product = '';
        version = '';
    });

/************************
    VERY IMPORTANT FUNCTIONS
************************/
    function generateComments(){
        return 'Comments for ' + product + version ;
    }

/*****************************
    MAKE LIFE AWESOME FUNCTIONS
*****************************/
    function clearDiv(){
        $('.js-clear').html('');
    }







