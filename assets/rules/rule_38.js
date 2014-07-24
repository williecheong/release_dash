/**************************
Options to determine how this group will aggregate into release readiness score for this version
**************************/
aggregateOptions[38] = {
    "isShipwrecker"    : false,  // if set to true, version is immediately red if this group is red
    "isSignificant"    : true    // if set to false, version score will not be affected by this group
};

/**************************
Warning: Do not change the function name
**************************/
function rule_38() {
    // Gets the channel tag e.g. release, beta, aurora, etc 
    var channel = coreData.channel.tag;

    // Defining the data available in this group
    // Rename the variables to better fit your context
        // Data for Query: Crashes per adu Firefox 32
    var alpha = coreData.groups[38].queries[49].es_data;

    // Write scripts to manipulate group data here.

    // Set the conditions that determine what to return
    // Recognized return values = [green", "yellow", "red"]
    // OR return any preferred custom colours in a valid CSS format
    if ( false ) {
        return "red";
    } else if ( false ) { 
        return "yellow"
    } else {
        return "green";
    } 
}

/****************
Optional: Custom helper functions to use above
To prevent conflicts with other functions on this dashboard
Please follow this naming convention - rule_38_whateverYouWant()
****************/


