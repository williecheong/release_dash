// Bring up the persona login window when user clicks button
$('.btn#start-persona').click( function(){
    navigator.id.request({
        siteName: 'RRDashboard - Administration'
    });
});