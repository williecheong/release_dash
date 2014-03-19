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
        var product_tag = $('.modal#new-group').find('.btn#save-new-group').data('product_tag');
        $('.modal#new-group').find('form').append( templateNewGroup( thisNum, product_tag ));

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
        if ( saveGroup['group_title'] == '' ) {
            alert( "Group name cannot be empty." );
            $this.removeClass('disabled');
            return false;
        }
        
        if ( (saveGroup['group_is_plot'] + saveGroup['group_is_number']) == 0 ) {
            alert( "Group has to be either a plot or number." );
            $this.removeClass('disabled');
            return false;
        }
        
        if ( $('.new-query').length == 0 ) {
            // Checks that there is at least one new query
            alert( "No queries found." );
            $this.removeClass('disabled');
            return false;
        } 
        // End of validation for the new group's input values

        // Looping through the input queries to retrieve and check them
        var queryError = false;
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
            if ( saveGroup.group_queries[value.id].query_title == '' ) {
                alert( 'Query name cannot be empty.' );
                queryError = true;
            }

            var isJSON = validateJSON( saveGroup.group_queries[value.id].query_query_qb );
            if ( !isJSON ) {
                alert("Qb query must be JSON");
                queryError = true;
            }
            // End of validation for group query's input values
        });

        // Return if there was failed checks while looping through queries
        if ( queryError ) {
            $this.removeClass('disabled');
            return false;
        }

        $.ajax({
            url: '/api/groups',
            type: 'POST',
            data: saveGroup,
            success: function(response) {
                if ( response == 'OK' ) {
                    $this.html('<i class="fa fa-check"></i> Success');
                    setTimeout(function() {
                        // Refresh page after 1.5 seconds
                        $this.html('<i class="fa fa-refresh"></i> Refreshing');
                        location.reload();
                    }, 1500);
                }

                console.log(response);
            }, 
            error: function(response) {
                alert('Fail: API could not be reached.');
                $this.removeClass('disabled');
                console.log(response);
            }
        });
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
        $('.modal#old-group').find('input#group-id').val( groupID );
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
            $('.modal#old-group').find('form').append( templateOldGroup( query_id, query, productTag ) );
        });

        $('.btn#delete-old-group').data('group-id', groupID);
        // End of setting values in the modal form

        // Disable all the fields here
        $('.modal#old-group').find('input').attr('disabled', true);
        $('.modal#old-group').find('select').attr('disabled', true);
        $('.modal#old-group').find('textarea').attr('disabled', true);

        // Fields are populated and disabled. Show modal.
        $('.modal#old-group').modal('toggle');
    });
    
    // Proceed to execute and delete the group
    $('.btn#delete-old-group').click(function(){
        $this = $(this);
        $this.addClass('disabled');
        var groupID = $this.data('group-id');

        $.ajax({
            url: '/api/groups/index/' + groupID ,
            type: 'DELETE',
            success: function(response) {
                if ( response == 'OK' ) {
                    $this.html('<i class="fa fa-check"></i> Success');
                    setTimeout(function() {
                        // Refresh page after 1.5 seconds
                        $this.html('<i class="fa fa-refresh"></i> Refreshing');
                        location.reload();
                    }, 1500);
                }

                console.log(response);
            }, 
            error: function(response) {
                alert('Fail: API could not be reached.');
                $this.removeClass('disabled');
                console.log(response);
            }
        });
    });

/************************
    VERY IMPORTANT FUNCTIONS
************************/

/*****************************
    MAKE LIFE AWESOME FUNCTIONS
*****************************/
    function templateNewGroup ( number, product_tag ) {
        var html = '<div class="new-query" id="q'+ number +'">'+
                        '<button type="button" class="btn btn-xs btn-default" id="remove-new-query">'+
                            '<i class="fa fa-times"></i>'+
                        '</button>'+
                        '<div class="form-group">'+
                            '<label class="col-sm-3 control-label" for="new-query-name">Query Name</label>'+
                            '<div class="col-sm-9 controls">'+
                                '<div class="input-group">'+
                                    '<input type="text" class="form-control" id="new-query-name" placeholder="Description for this query.">'+
                                    '<span class="input-group-btn">'+
                                        '<button class="btn btn-default colourpicker" type="button" id="'+number+'">'+
                                            '<i class="fa fa-tint fa-lg"></i> Color'+
                                        '</button>'+
                                        '<em id="colorpicker-log"></em>'+
                                    '</span>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label class="col-sm-3 control-label" for="new-query-bz">Bugzilla URL</label>'+
                            '<div class="col-sm-9">'+
                                '<input class="form-control" id="new-query-bz" placeholder="URL that links to this query in Bugzilla.">'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label class="col-sm-3 control-label" for="new-query-qb">Qb Query</label>'+
                            '<div class="col-sm-9">'+
                                '<textarea class="form-control" rows="3" id="new-query-qb" placeholder="Query in Qb format as a json object."></textarea>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
        return html;
    }

    function templateOldGroup ( query_id, query, product_tag ) {
        var html = '<div class="old-query" id="q'+ query_id +'">'+
                        '<div class="form-group">'+
                            '<input type="hidden" class="form-control" id="query-id">'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label class="col-sm-3 control-label" for="query-name">Query Name</label>'+
                            '<div class="col-sm-9 controls" >'+
                                '<div class="input-group">'+
                                    '<input type="text" class="form-control" id="query-name" placeholder="Description for this query." value="'+query.title+'">'+
                                    '<span class="input-group-btn">'+
                                        '<button class="btn btn-default colourpicker" type="button" id="q'+query_id+'" style="color:'+query.colour+';">'+
                                            '<i class="fa fa-tint fa-lg"></i> Color'+
                                        '</button>'+
                                        '<em id="colorpicker-log"></em>'+
                                    '</span>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label class="col-sm-3 control-label" for="query-bz">Bugzilla URL</label>'+
                            '<div class="col-sm-9">'+
                                '<input class="form-control" id="query-bz" value="'+query.bz_query+'" placeholder="URL that links to this query in Bugzilla.">'+
                            '</div>'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label class="col-sm-3 control-label" for="query-qb">Qb Query</label>'+
                            '<div class="col-sm-9">'+
                                '<textarea class="form-control" rows="3" id="query-qb" placeholder="Query in Qb format as a json object.">'+query.qb_query+'</textarea>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
        return html;
    }





