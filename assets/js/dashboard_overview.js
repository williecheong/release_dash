$('#branch_overview').modal({
    show : false
});

//Toggles the view of channels on each product
$('.toggler').click(function(){
    $( '.channels#' + $(this).attr('id') ).toggle('slow');
});

$('.channel').click(function(){
    var spanner = $(this).data('channel') + " (" + $(this).data('product') + ")";
    $('span.descriptor#product-channel').text( spanner );
    
    // Building the ES query here
    var query = {"query":{"filtered":{"query":{"match_all":{}},"filter":{"and":[{"match_all":{}},{"and":[{"term":{"cf_tracking_firefox29":"+"}},{"not":{"terms":{"bug_status":["resolved","verified","closed"]}}}]}]}}},"from":0,"size":0,"sort":[],"facets":{"0":{"terms":{"field":"cf_tracking_firefox29","size":200000},"facet_filter":{"and":[{"and":[{"range":{"modified_ts":{"lte":1388534400000}}},{"or":[{"missing":{"field":"expires_on"}},{"range":{"expires_on":{"gte":1388534400000}}}]}]}]}},"1":{"terms":{"field":"cf_tracking_firefox29","size":200000},"facet_filter":{"and":[{"and":[{"range":{"modified_ts":{"lte":1388620800000}}},{"or":[{"missing":{"field":"expires_on"}},{"range":{"expires_on":{"gte":1388620800000}}}]}]}]}},"2":{"terms":{"field":"cf_tracking_firefox29","size":200000},"facet_filter":{"and":[{"and":[{"range":{"modified_ts":{"lte":1388707200000}}},{"or":[{"missing":{"field":"expires_on"}},{"range":{"expires_on":{"gte":1388707200000}}}]}]}]}},"3":{"terms":{"field":"cf_tracking_firefox29","size":200000},"facet_filter":{"and":[{"and":[{"range":{"modified_ts":{"lte":1388793600000}}},{"or":[{"missing":{"field":"expires_on"}},{"range":{"expires_on":{"gte":1388793600000}}}]}]}]}},"4":{"terms":{"field":"cf_tracking_firefox29","size":200000},"facet_filter":{"and":[{"and":[{"range":{"modified_ts":{"lte":1388880000000}}},{"or":[{"missing":{"field":"expires_on"}},{"range":{"expires_on":{"gte":1388880000000}}}]}]}]}},"5":{"terms":{"field":"cf_tracking_firefox29","size":200000},"facet_filter":{"and":[{"and":[{"range":{"modified_ts":{"lte":1388966400000}}},{"or":[{"missing":{"field":"expires_on"}},{"range":{"expires_on":{"gte":1388966400000}}}]}]}]}},"6":{"terms":{"field":"cf_tracking_firefox29","size":200000},"facet_filter":{"and":[{"and":[{"range":{"modified_ts":{"lte":1389052800000}}},{"or":[{"missing":{"field":"expires_on"}},{"range":{"expires_on":{"gte":1389052800000}}}]}]}]}},"7":{"terms":{"field":"cf_tracking_firefox29","size":200000},"facet_filter":{"and":[{"and":[{"range":{"modified_ts":{"lte":1389139200000}}},{"or":[{"missing":{"field":"expires_on"}},{"range":{"expires_on":{"gte":1389139200000}}}]}]}]}},"8":{"terms":{"field":"cf_tracking_firefox29","size":200000},"facet_filter":{"and":[{"and":[{"range":{"modified_ts":{"lte":1389225600000}}},{"or":[{"missing":{"field":"expires_on"}},{"range":{"expires_on":{"gte":1389225600000}}}]}]}]}},"9":{"terms":{"field":"cf_tracking_firefox29","size":200000},"facet_filter":{"and":[{"and":[{"range":{"modified_ts":{"lte":1389312000000}}},{"or":[{"missing":{"field":"expires_on"}},{"range":{"expires_on":{"gte":1389312000000}}}]}]}]}},"10":{"terms":{"field":"cf_tracking_firefox29","size":200000},"facet_filter":{"and":[{"and":[{"range":{"modified_ts":{"lte":1389398400000}}},{"or":[{"missing":{"field":"expires_on"}},{"range":{"expires_on":{"gte":1389398400000}}}]}]}]}},"11":{"terms":{"field":"cf_tracking_firefox29","size":200000},"facet_filter":{"and":[{"and":[{"range":{"modified_ts":{"lte":1389484800000}}},{"or":[{"missing":{"field":"expires_on"}},{"range":{"expires_on":{"gte":1389484800000}}}]}]}]}},"12":{"terms":{"field":"cf_tracking_firefox29","size":200000},"facet_filter":{"and":[{"and":[{"range":{"modified_ts":{"lte":1389571200000}}},{"or":[{"missing":{"field":"expires_on"}},{"range":{"expires_on":{"gte":1389571200000}}}]}]}]}},"13":{"terms":{"field":"cf_tracking_firefox29","size":200000},"facet_filter":{"and":[{"and":[{"range":{"modified_ts":{"lte":1389657600000}}},{"or":[{"missing":{"field":"expires_on"}},{"range":{"expires_on":{"gte":1389657600000}}}]}]}]}}}};

    // Sending the ES query off to retrieve data
    $.ajax({
        url : "http://elasticsearch1.bugs.scl3.mozilla.com:9200" + "/public_bugs/bug_version/_search",
        type: 'POST',
        data: JSON.stringify(query),
        success : function(response){

            // Clear out the graphing area first
            $('.graph#main-plot').html('');
            
            //Extract the ES data that we want 
            var xcount = 0;
            var plot = new Array();
            $.each( response.facets, function( key, value ) {
                // Put the data we have in an array for plotting
                plot.push( { x: xcount , y: value.total } );
                xcount++;
            });

            // View graphing documentation here
            // https://github.com/shutterstock/rickshaw
            var graph = new Rickshaw.Graph( {
                element: document.querySelector('.graph#main-plot'),
                series: [{
                    color: 'steelblue',
                    data: plot
                }]
            });
            graph.render();

            // Modal is now ready. 
            // Proceed to display it now.
            $('#branch_overview').modal('toggle');

        }, 
        error : function(response){
            console.log(response);
            alert("Oops, are you on MozillaVPN?");

        }, dataType: 'json'
    });

    

});

