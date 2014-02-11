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
                     <link rel="stylesheet" href="/assets/js/vendor/spectrum/spectrum.css">
                     <link rel="stylesheet" href="/assets/css/watch_single.css">',
        
        'bottom' => '<script type="application/javascript;version=1.7" src="/assets/js/vendor/Qb/html/js/imports/import.js"></script>
                     <script type="application/javascript;version=1.7" src="/assets/js/vendor/Qb/html/js/ESQueryRunner.js"></script>
                     <script src="/assets/js/vendor/ducksboard-gridster/jquery.gridster.min.js"></script>
                     <script src="/assets/js/vendor/rickshaw/vendor/d3.min.js"></script>
                     <script src="/assets/js/vendor/rickshaw/vendor/d3.layout.min.js"></script>
                     <script src="/assets/js/vendor/rickshaw/rickshaw.js"></script>
                     <script src="/assets/js/vendor/spectrum/spectrum.js"></script>
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
                <?php if ( $group['is_plot'] == 1 ) { ?>
                <li class="group" id="<?= $group_tag; ?>" data-row="1" data-col="1" data-sizex="3" data-sizey="2">
                    <button class="btn btn-xs pull-right" id="edit-old-group" data-group-tag="<?= $group_tag; ?>">
                        <i class="icon-pencil"></i>
                    </button>
                    <div class="group-graph" id="<?= $group_tag; ?>">
                        <div class="y-axis" id="<?= $group_tag; ?>"></div>
                        <div class="plot" id="<?= $group_tag; ?>"></div>
                    </div>
                    <div class="text-center group-title" id="<?= $group_tag; ?>">
                        <img class="load-status" src="/assets/img/mozchomp.gif">
                        <h4><?= $group['title']; ?></h4>
                    </div>
                </li>
                <?php } // End if group is_plot ?>
            <?php } // End foreach query_group ?>

            <?php foreach ( $data['query_groups'] as $group_tag => $group ) { ?>
                <?php if ( $group['is_number'] == 1 ) { ?>
                <li class="group" id="<?= $group_tag; ?>" data-row="1" data-col="1" data-sizex="<?= min(2, count($group['queries'])); ?>" data-sizey="1">
                    <button class="btn btn-xs pull-right" id="edit-old-group" data-group-tag="<?= $group_tag; ?>">
                        <i class="icon-pencil"></i>
                    </button>
                    <div class="group-number text-center" id="<?= $group_tag; ?>">
                        <?php foreach( $group['queries'] as $query_tag => $query ) { ?>
                        <div class="text-center" id="<?= $query_tag; ?>" title="<?= $query['title'] ?>" style="width:<?= 90 / count($group['queries']); ?>%; display:inline-block;"></div>
                        <?php } ?>
                    </div>
                    <div class="text-center group-title" id="<?= $group_tag; ?>">
                        <img class="load-status" src="/assets/img/mozchomp.gif">
                        <h4><?= $group['title']; ?></h4>
                    </div>
                </li>
                <?php } // End if group is_number ?>
            <?php } // End foreach query_group ?>

            <li class="non-group" data-row="1" data-col="1" data-sizex="1" data-sizey="1">
                <div class="text-center group-title">
                    <button type="button" class="btn btn-success" id="add-new-group">
                        <i class="icon-plus"></i>
                    </button>
                </div>
            </li>
        </ul>
    </div>
</div><!-- /container -->

<?php 
    $this->load->view('modals/watch_single');
    $this->load->view('templates/footer', $include); 
?>











