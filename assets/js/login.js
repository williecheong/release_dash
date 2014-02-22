    $('.btn#start-persona').click( function(){
        navigator.id.request({
            siteName: 'RRDashboard - Administration'
        });

        /*   
        navigator.id.request({
            siteName: 'RRDashboard - Administration', 
            siteLogo: '/assets/img/prettyfox.png'
        });   
        */
    });