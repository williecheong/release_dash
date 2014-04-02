<div class="row">
    <div class="col-sm-12">
        Loading data from Elastic Search onto the RRDashboard happens when a version's view is accessed. The load times vary between 15 seconds to 1 minute. To make for a smoother experience, data loaded from Elastic Search is stored in the RRDashboard's local database like a cache. Instead of reloading from ElasticSearch, if the data stored in the local database is not more than 2 hours old it will be resused i.e. no loading from Elastic Search required. If more than 2 hours old, data will be reloaded from Elastic Search and updated again in the local database. Alternatively, the <button class="btn btn-default btn-xs"><i class="fa fa-refresh"></i> Refresh</button> may be used to force data to be reloaded and updated.
    </div>
</div>