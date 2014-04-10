/*********************************
    JUST SETTING UP THE PAGE HERE
*********************************/
    // Initializes the bootstrap modals
    $('.modal#new-group').modal({
        show : false 
    });
    
    $('.modal#old-group').modal({ 
        show : false
    });

/*********************************
    SAVING NEW GROUPS AND QUERIES
*********************************/
    // Brings up the modal for adding a new group
    $('.btn#add-new-group').click(function(){
        var product_tag = $(this).closest('div.product.row').attr('id');
        
        // Clean up modal from prior viewing of existing groups
        $('.modal#new-group').find('div.new-query').remove();

        $('.modal#new-group').find('.btn#save-new-group').data('product_tag', product_tag );
        $('.modal#new-group').modal('toggle');
    });

    // Append a new HTML query template for the group
    var new_query_unique_counter = 0;
    $('.btn#new-query-template').click( function() {
        new_query_unique_counter++;
        var thisNum = new_query_unique_counter;
        $('.modal#new-group').find('form').append( templateNewGroup( thisNum ));

        // Initializing remove button for this new item
        $('button#remove-new-query').click(function(){
            $(this).closest('div.new-query').remove();
        });
        // Initializing colorpicker for this new item
        $(".colourpicker[id='"+thisNum+"']").spectrum({
            showInput: false,
            preferredFormat: 'hex6',
            clickoutFiresChange: true,
            showButtons: false,
            move: function(color) {
                $(".colourpicker[id='"+thisNum+"']").css( 'color', color.toHexString() );
            }
        });
    });

    // Proceed to execute and save the group
    $('.btn#save-new-group').click(function(){
        $this = $(this);
        $this.addClass('disabled');
        var product_tag = $(this).data('product_tag');

        // Retrieving input group values into saveGroup
        var saveGroup = {};
        saveGroup = {
            group_entity : "product",
            group_entity_id : coreData[product_tag]['id'],
            group_title : $.trim( $('#new-group-name').val() ),
            group_is_plot : $('#new-group-is-plot:checked').length,
            group_is_number : $('#new-group-is-number:checked').length,
            group_queries : {} 
        };
        // End of retrieving input group values into saveGroup

        // Validation for the new group's input values
        // validateGroup returns false if OK
        // Returns a message string if not OK
        var groupError = validateGroup( saveGroup, 'new' );
        if ( groupError ) {
            alert( groupError );
            $this.removeClass('disabled');
            return false;
        }
        // End of validation for the new group's input values

        // Looping through the input queries to retrieve and check them
        var queryError = [];
        $.each( $('.new-query'), function(key, value){ 
            // Retrieving input group query's values into saveGroup
            var tempColor = rgb2hex( $('.new-query#'+value.id).find('button.colourpicker').css('color') );
            saveGroup.group_queries[value.id] = {
                query_title     : $.trim( $('.new-query#'+value.id).find('input#new-query-name').val() ),
                query_colour    : tempColor,
                query_query_bz  : $('.new-query#'+value.id).find('input#new-query-bz').val(),
                query_query_qb  : $('.new-query#'+value.id).find('textarea#new-query-qb').val()
            };
            // End of retrieving input group query's values into saveGroup

            // Validation for the group query's input values
            var tempError = validateQuery( saveGroup.group_queries[value.id] );
            if ( tempError ) {
                queryError.push( tempError );
            }
            // End of validation for group query's input values
        });

        // Return if there was failed checks while looping through queries
        if ( queryError.length > 0 ) {
            alert( queryError.join("\n") );
            $this.removeClass('disabled');
            return false;
        }

        var r = confirm("Confirm saving this group?");
        if ( r == true ) {
            // User clicked OK
            // Proceed to save this group
            postGroup( saveGroup, $this );
        } else {
            $this.removeClass('disabled');               
        }   
    });

/*****************************************
    EDITING EXISTING GROUPS AND QUERIES
*****************************************/
    // Brings up the modal for adding a new group
    $('li#edit-old-group').click(function(){
        var groupID = $(this).data('group-id');
        var productTag = $(this).closest('div.product.row').attr('id');
        var thisGroup = coreData[productTag].groups[groupID];

        // Clean up modal from prior viewing of existing groups
        $('.modal#old-group').find('div.old-query').remove();

        // Setting the values inside the modal's form fields
        $('.modal#old-group').find('input#group-name').val( thisGroup.title );

        if ( thisGroup.is_plot ) {
            $('.modal#old-group').find('input#group-is-plot').prop( "checked", true );
        } else {
            $('.modal#old-group').find('input#group-is-plot').prop( "checked", false );
        }

        if ( thisGroup.is_number ) {
            $('.modal#old-group').find('input#group-is-number').prop( "checked", true );
        } else {
            $('.modal#old-group').find('input#group-is-number').prop( "checked", false );
        }
        
        $.each( thisGroup.queries, function( query_id, query ){
            // Append the html for each query
            $('.modal#old-group').find('form').append( templateOldGroup( query_id, query ) );
             // Initializing colorpicker for this new item
            $(".colourpicker[id='q"+query_id+"']").spectrum({
                showInput: false,
                preferredFormat: 'hex6',
                clickoutFiresChange: true,
                showButtons: false,
                move: function(color) {
                    $(".colourpicker[id='q"+query_id+"']").css( 'color', color.toHexString() );
                }
            });
        });

        $('.btn#delete-old-group').data('group-id', groupID);
        $('.btn#update-old-group').data('group-id', groupID );
        // End of setting values in the modal form

        // Fields are populated and disabled. Show modal.
        $('.modal#old-group').modal('toggle');
    });
    
    // Proceed to update the group
    $('.btn#update-old-group').click(function(){
        $this = $(this);
        $this.addClass('disabled');
        var groupID = $this.data('group-id');

        // Retrieving input group values into saveGroup
        var saveGroup = {};
        saveGroup = {
            group_id : groupID,
            group_title : $.trim( $('#group-name').val() ),
            group_is_plot : $('#group-is-plot:checked').length,
            group_is_number : $('#group-is-number:checked').length,
            group_queries : {} 
        };
        // End of retrieving input group values into saveGroup

        // Validation for the group's input values
        // validateGroup returns false if OK
        // Returns a message string if not OK
        var groupError = validateGroup( saveGroup, 'old' );
        if ( groupError ) {
            alert( groupError );
            $this.removeClass('disabled');
            return false;
        }
        // End of validation for the group's input values

        // Looping through the input queries to retrieve and check them
        var queryError = [];
        $.each( $('.old-query'), function(key, value){ 
            // Retrieving input group query's values into saveGroup
            var tempColor = rgb2hex( $('.old-query#'+value.id).find('button.colourpicker').css('color') );
            saveGroup.group_queries[value.id] = {
                query_title     : $.trim( $('.old-query#'+value.id).find('input#query-name').val() ),
                query_colour    : tempColor,
                query_query_bz  : $('.old-query#'+value.id).find('input#query-bz').val(),
                query_query_qb  : $('.old-query#'+value.id).find('textarea#query-qb').val()
            };
            // End of retrieving input group query's values into saveGroup

            // Validation for the group query's input values
            var tempError = validateQuery( saveGroup.group_queries[value.id] );
            if ( tempError ) {
                queryError.push( tempError );
            }
            // End of validation for group query's input values
        });

        // Return if there was failed checks while looping through queries
        if ( queryError.length > 0 ) {
            alert( queryError.join("\n") );
            $this.removeClass('disabled');
            return false;
        }

        var r = confirm("Confirm saving this group?");
        if ( r == true ) {
            // User clicked OK
            // Proceed to save this group
            putGroup( saveGroup, $this );
        } else {
            $this.removeClass('disabled');               
        }

    });

    // Proceed to execute and delete the group
    $('.btn#delete-old-group').click(function(){
        $this = $(this);
        $this.addClass('disabled');
        var groupID = $this.data('group-id');

        var r = confirm("Confirm deleting this group?");
        if ( r == true ) {
            deleteGroup( groupID, $this );
        } else {
            $this.removeClass('disabled');               
        }
    });





