/*****************************
    TEMPLATE FOR GENERATING RULE BOILERPLATE
*****************************/
    function templateRuleBoilerplate ( group_id ) {
        var tempNames = ["alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa", "lambda", "mu"];

        var variables = '';
        var i = 0;
        $.each( coreData.groups[group_id].queries, function( query_id, query ){
            variables += ''+
            '        // Data for Query: ' + query.title + '\n' +
            '    var '+tempNames[i]+' = coreData.groups['+group_id+'].queries['+query_id+'].es_data;\n';
            i++;
        });
        
        var html = ''+
            '/**************************\n'+
            'Options to determine how this group will aggregate into release readiness score for this version\n'+
            '**************************/\n'+
            'aggregateOptions['+group_id+'] = {\n'+
            '    "isShipwrecker"    : false,  // if set to true, version is immediately red if this group is red\n'+     
            '    "isSignificant"    : true    // if set to false, version score will not be affected by this group\n'+
            '};\n'+
            '\n'+
            '/**************************\n'+
            'Warning: Do not change the function name\n'+
            '**************************/\n'+
            'function rule_'+group_id+'() {\n'+
            '    // Gets the channel tag e.g. release, beta, aurora, etc \n'+
            '    var channel = coreData.channel.tag;\n'+
            '\n'+
            '    // Defining the data available in this group\n'+
            '    // Rename the variables to better fit your context\n'+
            variables +
            '\n'+
            '    // Write scripts to manipulate group data here.\n'+
            '\n'+
            '    // Set the conditions that determine what to return\n'+
            '    // Recognized return values = [green", "yellow", "red"]\n'+
            '    // OR return any preferred custom colours in a valid CSS format\n'+
            '    if ( false ) {\n'+
            '        return "red";\n'+
            '    } else if ( false ) { \n'+
            '        return "yellow"\n'+
            '    } else {\n'+
            '        return "green";\n'+
            '    } \n'+
            '}\n'+
            '\n'+
            '/****************\n'+
            'Optional: Custom helper functions to use above\n'+
            'To prevent conflicts with other functions on this dashboard\n'+
            'Please follow this naming convention - rule_'+group_id+'_whateverYouWant()\n'+
            '****************/\n'+
            '\n'+
            '\n';
        return html;
    }