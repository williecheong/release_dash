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
        <div class="col-lg-6 left-side">
            <div role="form">
                <div class="form-group query-inputs">
                    <button type="button" class="btn btn-default btn-xs pull-right" id="add-query-input">
                        <i class="fa fa-plus"></i>
                    </button> 
                    <label>Query Inputs</label>
                    <div class="input-group bz-url-box">
                        <input type="text" class="form-control" id="bz-url" placeholder="Enter unshortened Bugzilla URL here">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button" id="parse-bz-url">
                                <i class="fa fa-bug"></i> Parse
                            </button>
                        </span>
                    </div>
                </div>
                <div class="form-group">
                    <label>Query Range (Leave blank for soft dates)</label>
                    <div class="row query-dates">
                        <div class="col-xs-6">
                            <input type="text" class="form-control datepicker" placeholder="Start Date">
                        </div>
                        <div class="col-xs-6">
                            <input type="text" class="form-control datepicker" placeholder="End Date">
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-primary pull-right" id="query-compile">
                    <i class="fa fa-magic"></i> Qb query
                </button>
                <div class="radio">    
                    <label class="radio-inline">
                        <input type="radio" name="query-range" id="public_cluster" checked=""> Public Cluster
                    </label>
                </div>
                <div class="radio">
                    <label class="radio-inline">
                        <input type="radio" name="query-range" id="private_cluster"> Private Cluster
                    </label>
                </div>
            </div>
        </div>
        <div class="col-lg-6 right-side">
            <textarea class="form-control query-output" rows="15" placeholder="Output"></textarea>
        </div>
    </div>
</div><!-- /container -->

<?php 
    $this->load->view('templates/footer', $include); 
?>

<script>
    var bzFields = [ <?php foreach ( $fields as $key => $field ) { echo '"'.$key.'", '; } ?> ];

    function templateQueryInput( number ) {
        var html = '<div class="row query-input" id="query-input-'+number+'">'+
    '                    <div class="col-md-4">'+
    '                        <select class="form-control" id="query-field">'+
    '                            <option value="">---</option>'+
<?php foreach( $fields as $key => $field ) { ?>
    '                            <option value="<?= $key ?>"><?= $field["description"]; ?></option>'+
<?php } ?>
    '                        </select>'+
    '                    </div>'+
    '                    <div class="col-md-4">'+
    '                        <select class="form-control" id="query-operator">'+
    '                            <option value="=">is equal to</option>'+
    '                            <option value="!=">is not equal to</option>'+
    '                        </select>'+
    '                    </div>'+
    '                    <div class="col-lg-4">'+
    '                            <div class="input-group">'+
    '                                <input type="text" class="form-control" id="query-value" placeholder="field value">'+
    '                                <span class="input-group-btn">'+
    '                                    <button type="button" class="btn btn-danger" id="remove-query-input">'+
    '                                        <i class="fa fa-times"></i>'+
    '                                    </button>'+
    '                                </span>'+
    '                            </div>'+
    '                        </div>'+
    '                </div>';
        return html;
    }
</script>
