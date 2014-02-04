<?php 
    // Note that we have received a big $data array
    // $data contains all the products, 
    // Their respective versions that are active,
    // And the respective queries on each version

    //  Now the fun begins where we compile the view:
    //    First we declare view specific CSS and JS files inside $include
    //    Then send it to the respective views for appending to the DOM
    //    As usual, CSS to the header, JS to the footer.
    $include = array( 
        'version'  => $data['title'] ,    
        'top'    => '<link rel="stylesheet" href="/assets/js/vendor/ducksboard-gridster/jquery.gridster.min.css">
                     <link rel="stylesheet" href="/assets/css/watch_single.css">',
        'bottom' => '<script src="/assets/js/vendor/ducksboard-gridster/jquery.gridster.min.js"></script>
                     <script>var coreData = '. json_encode($data) .'</script>
                     <script src="/assets/js/watch_single.js"></script>'
    );
?>

<?php 
    $this->load->view('templates/header', $include);
?>

<div class="container">
    <div class="gridster">
        <ul class="plots">
            <?php foreach ( $data['query_groups'] as $group_tag => $group ) { ?>
            <li class="group" id="<?= $group_tag; ?>" data-row="1" data-col="1" data-sizex="1" data-sizey="1">
                <div class="row" id="group-graph">
                    <div class="col-lg-9">
                        <div class="y-axis"></div>
                        <div class="plot"></div>
                    </div>
                    <div class="col-lg-3" id="legend"></div>
                </div>
                <div class="text-center" id="group-title">
                    <img class="load-status" src="/assets/img/mozchomp.gif">
                    <h4><?= $group['title']; ?></h4>
                </div>
            </li>
            <?php } // End foreach query_group ?>
        </ul>
    </div>
</div><!-- /container -->

<?php 
    $this->load->view('templates/footer', $include); 
?>











