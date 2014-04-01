<div class="row">
    <div class="col-sm-10 col-sm-offset-1 text-center">
        <img class="img-thumbnail" width="100%" src="/assets/img/help/version_status.png">
    </div>
    <div class="col-sm-12">
        <p>
            On each individual version view, the release readiness score can be found on the header displayed as the font colour being used for the version name. An example for Firefox 30 is shown in the screenshot above. Note that this score is calculated every time data is retrieved from the Elastic Search cluster. As a result, a short wait time of about 15 seconds can be expected before the score color is applied. 
        </p>
        <p>
            Additionally, release readiness scores for active versions are automatically displayed on the "overview" landing page. Note that a version's score is updated only when the individual version's view is manually accessed by someone. This is to enable data to be loaded from Elastic Search into the dashboard for the neccessary computations to happen.
        </p>
    </div>
</div>