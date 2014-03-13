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
        <div class="col-md-4 left-side">
            <div role="form">
                <?php /* The user input field for the Bugzilla URL to parse */ ?>
                <div class="form-group">
                    <label for="bz-url">Bugzilla URL Parser</label>
                    <input type="text" class="form-control" id="bz-url" placeholder="Enter unshortened Bugzilla URL">
                </div>
                <?php /* The user input fields for start and end dates of the output Qb */ ?>
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
                <?php /* The button for compiling the Qb query based on specified params */ ?>
                <button type="button" class="btn btn-primary pull-right" id="query-compile">
                    <i class="fa fa-magic"></i> Qb query
                </button>
                <?php /* The radio buttons for specifying whether Qb will pull from private or public cluster */ ?>
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
                <?php /* The button that links externally to github for references on soft tags */ ?>
                <div class="well well-sm">
                    <a class="btn btn-xs btn-default" href="https://github.com/williecheong/release_dash#groups-of-queries" style="width:100%;">
                        References for Soft Tags
                    </a>
                </div>    
            </div>
        </div>
        <div class="col-md-8 right-side">
            <textarea class="form-control query-output" rows="25" placeholder="Output"></textarea>
        </div>
    </div>
</div><!-- /container -->

<?php 
    $this->load->view('templates/footer', $include); 
?>
