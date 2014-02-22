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
        'version'  => $data['title'],
        'top'      => '
            <link rel="stylesheet" href="/assets/vendor/ducksboard-gridster/jquery.gridster.min.css">
            <link rel="stylesheet" href="/assets/vendor/spectrum/spectrum.css">
            <link rel="stylesheet" href="/assets/css/watch_single.css">',
        
        'bottom'   => '
            <script src="/assets/vendor/Qb/html/js/imports/import.js" type="application/javascript;version=1.7"></script>
            <script src="/assets/vendor/Qb/html/js/ESQueryRunner.js" type="application/javascript;version=1.7"></script>
            <script src="/assets/vendor/ducksboard-gridster/jquery.gridster.min.js"></script>
            <script src="/assets/vendor/rickshaw/vendor/d3.min.js"></script>
            <script src="/assets/vendor/rickshaw/vendor/d3.layout.min.js"></script>
            <script src="/assets/vendor/rickshaw/rickshaw.js"></script>
            <script src="/assets/vendor/spectrum/spectrum.js"></script>
            <script>var coreData = '. json_encode($data) .'</script>
            <script src="/assets/js/watch_single.js"></script>',

        'rule_scripts' => ''
    );
    
    // Load the scripts for the rules that we want to apply.
    foreach ( $data['query_groups'] as $group_id => $group ) { 
        if ( $group['has_rule'] ) {
            $include['rule_scripts'] .= 
                '<script src="/assets/rules/rule_'.$group_id.'.js"></script>';
        }
    }
?>

<?php 
    $this->load->view('templates/header', $include);
?>

<div class="container">
    <div class="gridster">
        <ul class="grids">
            <?php foreach ( $data['query_groups'] as $group_id => $group ) { ?>
                <?php if ( $group['is_plot'] == 1 && $group['is_default'] == 1 ) { ?>
                    <?php 
                        $this->load->view(
                            '/templates/watch_single_grid', 
                            array(  'group_id'  => $group_id,
                                    'group'     => $group, 
                                    'type'      => 'make_plot' 
                                    ) 
                                ); 
                    ?>
                <?php } // End if default group that is_plot ?>
            <?php } // End foreach query_group ?>

            <?php foreach ( $data['query_groups'] as $group_id => $group ) { ?>
                <?php if ( $group['is_number'] == 1 && $group['is_default'] == 1 ) { ?>
                    <?php 
                        $this->load->view(
                            '/templates/watch_single_grid', 
                            array(  'group_id'  => $group_id,
                                    'group'     => $group, 
                                    'type'      => 'make_number' 
                                    ) 
                                ); 
                    ?>
                <?php } // End if default group that is_number ?>
            <?php } // End foreach query_group ?>

            <?php foreach ( $data['query_groups'] as $group_id => $group ) { ?>
                <?php if ( $group['is_plot'] == 1 && $group['is_default'] == 0 ) { ?>
                    <?php 
                        $this->load->view(
                            '/templates/watch_single_grid', 
                            array(  'group_id'  => $group_id,
                                    'group'     => $group, 
                                    'type'      => 'make_plot' 
                                    ) 
                                ); 
                    ?>
                <?php } // End if non-default group that is_plot ?>
            <?php } // End foreach query_group ?>

            <?php foreach ( $data['query_groups'] as $group_id => $group ) { ?>
                <?php if ( $group['is_number'] == 1 && $group['is_default'] == 0 ) { ?>
                    <?php 
                        $this->load->view(
                            '/templates/watch_single_grid', 
                            array(  'group_id'  => $group_id,
                                    'group'     => $group, 
                                    'type'      => 'make_number' 
                                    ) 
                                ); 
                    ?>
                <?php } // End if non-default group that is_number ?>
            <?php } // End foreach query_group ?>
            <?php if ( $this->session->userdata('email') ) { ?>
                <li class="non-group" data-row="1" data-col="1" data-sizex="1" data-sizey="1">
                    <div class="text-center group-title">
                        <button type="button" class="btn btn-success" id="add-new-group">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </li>
            <?php } ?>
        </ul>

    </div>
</div><!-- /container -->

<?php 
    $this->load->view('modals/watch_single');
    $this->load->view('templates/footer', $include); 
?>











