<?php 
    //  Now the fun begins where we compile the view:
    //    First we declare view specific CSS and JS files inside $include
    //    Then send it to the respective views for appending to the DOM
    //    As usual, CSS to the header, JS to the footer.
    $include = array( 
        'top'    => '<link rel="stylesheet" href="/assets/css/easy_qb.css">',
        'bottom' => '<script src="/assets/js/easy_qb.js"></script>'
    );
?>

<?php 
    $this->load->view('templates/header', $include);
?>

<div class="container">
    <div class="row">
        <div class="col-md-6 left-side">
            <div role="form">
                <div class="form-group">
                    <label for="bz-url">Bugzilla URL Parser</label>
                    <input type="text" class="form-control" id="bz-url" placeholder="Enter unshortened Bugzilla URL">
                </div>
                <div class="form-group">
                    <label>Query Range (Leave blank for soft dates)</label>
                    <div class="row query-dates">
                        <div class="col-xs-6">
                            <input type="text" class="form-control datepicker" id="query-start" placeholder="Start Date">
                        </div>
                        <div class="col-xs-6">
                            <input type="text" class="form-control datepicker" id="query-end" placeholder="End Date">
                        </div>
                    </div>
                </div>

                <button type="button" class="btn btn-primary pull-right" id="query-compile">
                    <i class="fa fa-magic"></i> Qb query
                </button>
                
                <div class="radio">    
                    <label class="radio-inline">
                        <input type="radio" name="query-cluster" id="private_cluster" checked=""> Private Cluster
                    </label>
                </div>
                <div class="radio">
                    <label class="radio-inline">
                        <input type="radio" name="query-cluster" id="public_cluster"> Public Cluster
                    </label>
                </div>

                 <div class="well well-sm">
                    <button class="btn btn-xs btn-default" style="width:100%;" data-mytoggler="#easyqb-instructions">
                        References for Soft Tags
                    </button>
                    <div id="easyqb-instructions" style="display:none;">
                       <dl class="dl-horizontal">
                            <dt>&lt;birthday&gt;</dt>
                            <dd>Dynamically converted to version's birthday</dd>
                            <dt>&lt;timestamp&gt;</dt>
                            <dd>Dynamically converted to version's next shipday</dd>
                            <dt>&lt;version_tag&gt;</dt>
                            <dd>Used for Qb queries in default groups. Dynamically converted to version number e.g. 30.</dd>
                            <dt>&lt;version_title&gt;</dt>
                            <dd>Used for default group titles. Dynamically converted to a read-friendly version title e.g. Firefox 30.</dd>
                            
                        </dl>
                    </div>
                </div>    
            </div>
        </div>
        <div class="col-md-6 right-side">
            <textarea class="form-control query-output" rows="15" placeholder="Output"></textarea>
        </div>
    </div>
</div><!-- /container -->

<?php 
    $this->load->view('templates/footer', $include); 
?>
