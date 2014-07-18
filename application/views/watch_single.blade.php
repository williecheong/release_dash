@layout('templates/layout')

@section('title')
    Release Readiness Dashboard :: {{ $data['title'] }}
@endsection

@section('sub_title')
    <span class="navbar-brand lead rrscore">
        {{ $data['title'] }}
    </span>
@endsection

@section('css')
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/vendor/ducksboard-gridster/jquery.gridster.min.css">
    <link rel="stylesheet" href="/assets/css/watch_single.css">
    <!-- For the sidebar ... perhaps rename this file -->
    <link rel="stylesheet" href="/assets/css/help.css">

@endsection

@section('content')
 <div class="container" id="main-content">
    <div class="row">
        <div class="col-md-9">
          @foreach ( $data['categories'] as $category_id => $category )
            <div class="section">
                <h2 id="category-{{ $category_id }}">{{ $category }}</h2>
                <hr></hr>
                  <div id="gridster-{{ $category_id }}" class="gridster" >
                      <ul class="grids">

                        {{-- Loop and filter four times to print in priority sequence --}}
                        {{--    1. Default plots  --}}
                        {{--    2. Default numbers  --}}
                        {{--    3. Custom plots  --}}
                        {{--    4. Custom numbers  --}}
                        @foreach ( $data['groups'] as $group_id => $group )
                            @if ( $group['is_plot'] && $group['is_default'] && $group['category'] == $category)
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
                            @if ( $group['is_number'] && $group['is_default'] && $group['category'] == $category ) 
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
                            @if ( $group['is_plot'] && !$group['is_default'] && $group['category'] == $category ) 
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
                            @if ( $group['is_number'] && !$group['is_default'] && $group['category'] == $category )
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
                            <li class="non-group" data-row="1" data-col="1" data-sizex="1" data-sizey="1" data-toggle="modal" data-target="#new-group">
                                <div class="text-center center-block group-title">
                                    <i class="fa fa-plus fa-lg" ></i>
                                </div>
                            </li>
                        @endif

                      </ul><!-- grids -->
                  </div><!-- gridster --> 
            </div>
          @endforeach
        </div>
        <div class="col-md-3" id="rightCol">
            <ul class="nav nav-stacked" id="sidebar">
                @foreach ( $data['categories'] as $category_id => $category )
                    <li>
                      <a href="#category-{{ $category_id }}">
                        <span class="badge" id="badge-{{ $category }}">{{ $category }}</span>
                      </a>
                    </li>
                @endforeach
            </ul>
        </div> 
      </div>
  </div><!-- /container -->
@endsection

@section('modals')
    @include('modals/group_details')
    @include('modals/watch_single')    
@endsection

@section('javascript')



   <script type="text/javascript">
        @foreach ( $data['categories'] as $category )
          // $(function () { $('#collapse-{{ $category }}').collapse()});
        @endforeach {{-- End foreach --}}
    </script>  

    <!-- For the sidebar ... perhaps rename this file -->
    <script src="/assets/js/help/main.js"></script>

    <script src="/assets/vendor/Qb/html/js/imports/import.js" type="application/javascript;version=1.7"></script>
    <script src="/assets/vendor/Qb/html/js/ESQueryRunner.js" type="application/javascript;version=1.7"></script>
    <script src="/assets/vendor/ducksboard-gridster/jquery.gridster.min.js"></script>
    <script src="/assets/vendor/rickshaw/vendor/d3.min.js"></script>
    <script src="/assets/vendor/rickshaw/vendor/d3.layout.min.js"></script>
    <script src="/assets/vendor/rickshaw/rickshaw.js"></script>
    <script src="/assets/vendor/sorttable/sorttable.js"></script>
    <script>var coreData = {{ json_encode($data) }}</script>

    <script src="/assets/js/common/telemetry.js"></script>
    <script src="/assets/js/watch_single/helpers_breakdown.js"></script>
    <script src="/assets/js/watch_single/helpers_es.js"></script>
    <script src="/assets/js/watch_single/templates.js"></script>
    <script src="/assets/js/watch_single/main.js"></script>
    
    <script src="/assets/js/common/helpers_groups.js"></script>
    <script src="/assets/js/common/handlers_groups.js"></script>
    <script src="/assets/js/common/templates_groups.js"></script>
    <script src="/assets/js/common/qb_maker.js"></script>
@endsection

@section('rules')
    {{-- Load the scripts for the rules that we want to apply --}}
    @foreach ( $data['groups'] as $group_id => $group )
        @if ( $group['has_rule'] )
            <script src="/assets/rules/rule_{{$group_id}}.js"></script>
        @endif
    @endforeach
@endsection


