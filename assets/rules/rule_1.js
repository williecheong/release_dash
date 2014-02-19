/**************************
Do not change the function name, or Javascript errors will occur
**************************/
function rule_1() {
    /**************************************
    Defining the data available in this group
    Rename the variables to better fit your context
    Do not change the values in the variable
    **************************************/
    var alpha = coreData.query_groups[1].queries[1].es_data;
    var beta = coreData.query_groups[1].queries[2].es_data;

    /**************************************
    Write scripts to manipulate group data here.
    **************************************/
    console.log(alpha);
    console.log(beta);

    /**************************************
    Set the conditions that determine what to return
    Recognized return values = [green", "yellow", "red"]
    OR return any preferred custom colours in a valid CSS format
    **************************************/
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
Please follow this naming convention - rule_1_whateverYouWant()
****************/