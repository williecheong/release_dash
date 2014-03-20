/**************************
Do not change the function name, or Javascript errors will occur
**************************/
function rule_2() {
    /**************************************
    Defining standard variables available 
    **************************************/
        //Gets the channel tag e.g. release, beta, aurora, etc 
    var channel = coreData.channel.tag;

    /**************************************
    Defining the data available in this group
    Rename the variables to better fit your context
    Do not change the values in the variable
    **************************************/
        // Data for Query: # Unresolved Bugs tracking Firefox 28
    var alpha = coreData.groups[2].queries[3].es_data;

    /**************************************
    Write scripts to manipulate group data here.
    **************************************/
            
    var current = new Date().getTime() / 1000 ;
    var shipday = alpha[ alpha.length - 1 ].x;
    var oneday = 86400; //seconds

    // Finding the index of the data set that corresponds to current time
    var todayIndex = rule_2_todayIndex( alpha );
    var bugCount = alpha[ todayIndex ].y;

           
    /**************************************
    Set the conditions that determine what to return
    Recognized return values = [green", "yellow", "red"]
    OR return any preferred custom colours in a valid CSS format
    **************************************/
    if ( (shipday - current < oneday && bugCount != 0 && channel == 'beta') 
        || ( bugCount != 0 && channel == 'release') ) {
        // We have bugs and less than 1 day to ship
        return "red" ;
    
    } else if ( bugCount == 0 ) {
        // Good, we have no bugs
        return "green";
    
    } else {
        // Not the best scenario
        // But we're not in trouble either
        return "yellow";
    
    }
}

/****************
Optional: Custom helper functions to use above
To prevent conflicts with other functions on this dashboard
Please follow this naming convention - rule_2_whateverYouWant()
****************/
    function rule_2_todayIndex( rickshawArray ) {
        var i = 0; 

        var temp = rickshawArray[i] ;
        var current = new Date().getTime() / 1000 ;
        
        while( temp.x < current ){
            i++;
            if ( rickshawArray[i] ) {
                temp = rickshawArray[i];

            } else {
                // At the end of alpha
                break;
            }
        }
        
        i--;

        return i;
    }