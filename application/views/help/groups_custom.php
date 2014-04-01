<div class="row">
    <div class="row pictures text-center">
        <div class="col-xs-4">
            <img class="img-thumbnail" width="100%" src="/assets/img/help/create_custom_group.png">
        </div>
        <div class="col-xs-4">
            <img class="img-thumbnail" width="100%" src="/assets/img/help/create_custom_group_modal.png">
        </div>
        <div class="col-xs-4">
            <img class="img-thumbnail" width="100%" src="/assets/img/help/bugs.png">
        </div>
    </div>
    <div class="col-sm-12">
        <p>
            Custom groups apply to a specific version. In other words, custom groups only appear in the individual version views that they were originally created in. To create a custom group, click on the green button as seen in the first image. A modal as seen in the second picture will pop up. Note that only white-listed administrators are able to see the button for creating a custom group.
        </p>
        <strong>Basic fields</strong>
        <p>
            Enter a group name and select at least one visualization method. Add a query into the group by clicking on <button class="btn btn-default btn-xs"><i class="fa fa-plus"></i> Query</button> and enter a short name that describes the query. You may also pick a color that will affect the color used in visualizing the query on the dashboard.
        </p>
        <strong>References</strong>
        <p>
            A reference line may be added to the query. This will include an additional plot/number in the dashboard's visualizations that allows users to compare the current data with a prior versions in the corresponding time periods. I.e. Day 5 of current version N is always compared with Day 5 of version N-n. Note that <a href="#groups_tags">soft tags</a> must be used when creating queries with reference lines.
        </p>
        <strong>Bugzilla URL</strong>
        <p>
            Each query in a custom group may be tied to a Bugzilla URL. This allows users to redirected to the corresponding query on Bugzilla with a single click on a link. The link can be seen as a <i class="fa fa-bug"></i> when a pointer is hovering over a group. The icon is also color coded based on the query it represents for easy identification.
        </p>
        <strong>Qb Query</strong>
        <p>
            Qb queries are JSON formatted objects that are used to extract data from the Elastic Search clusters. More information on generating <a href="#qb">Qb queries</a> can be found in the following section.  
        </p>
    </div>
</div>