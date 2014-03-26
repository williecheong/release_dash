/**************************
Options to determine how this group will aggregate into release readiness score for this version
**************************/
aggregateOptions[4] = {
    "isInsignificant"  : false,   // if set to true, version score will not be affected by this group
    "isShipwrecker"    : false    // if set to true, version is immediately red if this group is red
};

/**************************
Warning: Do not change the function name
**************************/
function rule_4() {
    // Gets the channel tag e.g. release, beta, aurora, etc 
    var channel = coreData.channel.tag;

    // Defining the data available in this group
    // Rename the variables to better fit your context
        // Data for Query: # Regressions on Firefox 30
    var alpha = coreData.groups[4].queries[5].es_data;

    // Write scripts to manipulate group data here.
    var current = new Date().getTime() / 1000 ;
    var shipday = alpha[ alpha.length - 1 ].x;
    var oneday = 86400; //seconds

    // Finding the index of the data set that corresponds to current time
    var todayIndex = rule_2_todayIndex( alpha );
    var regressionCount = alpha[ todayIndex ].y;

    // Set the conditions that determine what to return
    // Recognized return values = [green", "yellow", "red"]
    // OR return any preferred custom colours in a valid CSS format
    if ( (shipday - current < oneday && regressionCount != 0 && channel == 'beta') 
        || ( regressionCount != 0 && channel == 'release') ) {
        // We have regressions and less than 1 day to ship
        return "red" ;
    
    } else if ( regressionCount == 0 ) {
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
Please follow this naming convention - rule_4_whateverYouWant()
****************/
function rule_4_todayIndex( rickshawArray ) {
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
