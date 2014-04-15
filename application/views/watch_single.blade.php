<?php 
    $include = array( 
        'version'  => $data['title'],
        'comment'  => ( isset($comment[0]) ) ? $comment[0] : array() ,
        'top'      => '
            <link rel="stylesheet" href="/assets/vendor/ducksboard-gridster/jquery.gridster.min.css">
            <link rel="stylesheet" href="/assets/css/watch_single.css">',
        
        'bottom'   => '
            <script src="/assets/vendor/Qb/html/js/imports/import.js" type="application/javascript;version=1.7"></script>
            <script src="/assets/vendor/Qb/html/js/ESQueryRunner.js" type="application/javascript;version=1.7"></script>
            <script src="/assets/vendor/ducksboard-gridster/jquery.gridster.min.js"></script>
            <script src="/assets/vendor/rickshaw/vendor/d3.min.js"></script>
            <script src="/assets/vendor/rickshaw/vendor/d3.layout.min.js"></script>
            <script src="/assets/vendor/rickshaw/rickshaw.js"></script>
            <script src="/assets/vendor/sorttable/sorttable.js"></script>
            <script>var coreData = '. json_encode($data) .'</script>

            <script src="/assets/js/watch_single/helpers_breakdown.js"></script>
            <script src="/assets/js/watch_single/helpers_es.js"></script>
            <script src="/assets/js/watch_single/templates.js"></script>
            <script src="/assets/js/watch_single/main.js"></script>
            
            <script src="/assets/js/common/helpers_groups.js"></script>
            <script src="/assets/js/common/handlers_groups.js"></script>
            <script src="/assets/js/common/templates_groups.js"></script>
            <script src="/assets/js/common/qb_maker.js"></script>',

        'rule_scripts' => ''
    );
    
    // Load the scripts for the rules that we want to apply.
    foreach ( $data['groups'] as $group_id => $group ) { 
        if ( $group['has_rule'] ) {
            $include['rule_scripts'] .= 
                '<script src="/assets/rules/rule_'.$group_id.'.js"></script>';
        }
    }

    $this->load->view('templates/header', $include);
?>

<div class="container">
    {{-- Because this view is all about the grids --}}
    <div class="gridster">
        <ul class="grids">
            {{-- Loop and filter four times to print in priority sequence --}}
            {{--    1. Default plots  --}}
            {{--    2. Default numbers  --}}
            {{--    3. Custom plots  --}}
            {{--    4. Custom numbers  --}}
            @foreach ( $data['groups'] as $group_id => $group )
                @if ( $group['is_plot'] && $group['is_default'] )
                    <?php 
                        $this->load->view(
                            '/templates/watch_single_grid', 
                            array(  'group_id'  => $group_id,
                                    'group'     => $group, 
                                    'type'      => 'make_plot' 
                                    ) 
                                ); 
                    ?>
                @endif {{-- End if default group that is_plot --}}
            @endforeach {{-- End foreach query_group --}}

            @foreach ( $data['groups'] as $group_id => $group )
                @if ( $group['is_number'] && $group['is_default'] ) 
                    <?php 
                        $this->load->view(
                            '/templates/watch_single_grid', 
                            array(  'group_id'  => $group_id,
                                    'group'     => $group, 
                                    'type'      => 'make_number' 
                                    ) 
                                ); 
                    ?>
                @endif {{-- End if default group that is_number --}}
            @endforeach {{-- End foreach query_group --}}

            @foreach ( $data['groups'] as $group_id => $group ) 
                @if ( $group['is_plot'] && !$group['is_default'] ) 
                    <?php 
                        $this->load->view(
                            '/templates/watch_single_grid', 
                            array(  'group_id'  => $group_id,
                                    'group'     => $group, 
                                    'type'      => 'make_plot' 
                                    ) 
                                ); 
                    ?>
                @endif {{-- End if non-default group that is_plot --}}
            @endforeach {{-- End foreach query_group --}}

            @foreach ( $data['groups'] as $group_id => $group )
                @if ( $group['is_number'] && !$group['is_default'] )
                    <?php 
                        $this->load->view(
                            '/templates/watch_single_grid', 
                            array(  'group_id'  => $group_id,
                                    'group'     => $group, 
                                    'type'      => 'make_number' 
                                    ) 
                                ); 
                    ?>
                @endif {{-- End if non-default group that is_number --}}
            @endforeach {{-- End foreach query_group --}}

            @if ( $this->session->userdata('email') )
                {{-- Show the grid that prompts creating a new custom group --}}
                <li class="non-group" data-row="1" data-col="1" data-sizex="1" data-sizey="1">
                    <div class="text-center group-title">
                        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#new-group">
                            <i class="fa fa-bar-chart-o fa-lg"></i>
                        </button>
                    </div>
                </li>
            @endif
        </ul>

    </div>
</div><!-- /container -->

<?php 
    $this->load->view('modals/group_details');
    $this->load->view('modals/watch_single', $include);
    $this->load->view('templates/footer', $include); 
?>











