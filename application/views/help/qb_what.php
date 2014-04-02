<div class="row">
    <div class="well well-sm col-xs-offset-1 col-xs-10">
        {"from": "public_bugs","select": {"name": "num","value": "bug_id","aggregate": "count"},"esfilter": {"and": [{"terms": {"bug_status": ["unconfirmed","new","assigned","reopened"]}},{"and": [{"and": [{"or": [{"term": {"cf_tracking_firefox30": "+"}}]},{"or": [{"not": {"term": {"cf_status_firefox30": "wontfix"}}}]},{"or": [{"not": {"term": {"cf_status_firefox30": "fixed"}}}]},{"or": [{"not": {"term": {"cf_status_firefox30": "unaffected"}}}]},{"or": [{"not": {"term": {"cf_status_firefox30": "verified"}}}]},{"or": [{"not": {"term": {"cf_status_firefox30": "disabled"}}}]},{"or": [{"not": {"term": {"cf_status_firefox30": "verified disabled"}}}]}]},{"not": {"term": {"cf_status_firefox29": "wontfix"}}},{"not": {"term": {"cf_status_firefox29": "affected"}}}]}]},"edges": [{"range": {"min": "modified_ts","max": "expires_on"},"domain": {"type": "date","min": 1391500800000,"max": 1398754800000,"interval": "day"}}]}
    </div>
    <div class="col-sm-12">
        <p>
            The above is an example of a Qb query, which is also a JSON object. Qb queries are the medium that the RRDashboard uses for requesting Bugzilla data from the Elastic Search cluster. While it is not expected that a RRDashboard administrator learns how to write a Qb query, it would be very helpful to learn how to modify one since the <a href="#qb_builder">Qb query builder</a> is not perfect.
        </p>
    </div>
</div>