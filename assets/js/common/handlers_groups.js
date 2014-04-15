    handlerCreateGroup = function(){
        $button = $(this);
        $modal = $button.closest('.modal');

        $button.addClass('disabled');
        var product_tag = $button.data('product_tag');

        // Retrieving input group values into saveGroup
        var saveGroup = {};
        saveGroup = extractGroup( $modal );
        saveGroup.group_entity = "product";
        saveGroup.group_entity_id = coreData[product_tag]['id'];
        // End of retrieving input group values into saveGroup

        // validateGroup returns false if OK
        // Returns a message string if not OK
        var groupError = validateGroup( saveGroup );
        if ( groupError ) {
            alert( groupError );
            $button.removeClass('disabled');
            return false;
        }
        // End of validation for the new group's input values

        var r = confirm("Confirm saving this group?");
        if ( r == true ) {
            // User clicked OK
            // Proceed to save this group
            postGroup( saveGroup, $button );
        } else {
            $button.removeClass('disabled');               
        }   
    }
        
    handlerUpdateGroup = function(){
        $button = $(this);
        $modal = $button.closest('.modal');

        $button.addClass('disabled');
        var groupID = $button.data('group-id');

        // Retrieving input group values into saveGroup
        var saveGroup = {};
        saveGroup = extractGroup( $modal );
        saveGroup.group_id = groupID;
        // End of retrieving input group values into saveGroup

        // validateGroup returns false if OK
        var groupError = validateGroup( saveGroup );
        if ( groupError ) {
            alert( groupError );
            $button.removeClass('disabled');
            return false;
        }
        // End of validation for the group's input values

        var r = confirm("Confirm saving this group?");
        if ( r == true ) {
            // User clicked OK
            // Proceed to save this group
            putGroup( saveGroup, $button );
        } else {
            $button.removeClass('disabled');               
        }
    }

    handlerDeleteGroup = function(){
        $this = $(this);
        $this.addClass('disabled');
        var groupID = $this.data('group-id');

        var r = confirm("Confirm deleting this group?");
        if ( r == true ) {
            deleteGroup( groupID, $this );
        } else {
            $this.removeClass('disabled');               
        }
    }

