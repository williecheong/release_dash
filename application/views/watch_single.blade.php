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
@endsection

@section('content')


<div class="panel-group" id="accordion">
  @foreach ( $data['categories'] as $category )
    <div class="panel panel-success">
       <div class="panel-heading">
          <h4 class="panel-title">
             <a data-toggle="collapse" data-parent="#accordion" 
                href="#collapse-{{ $category }}">
                {{ $category }}
             </a>
          </h4>
       </div>
       <div id="collapse-{{ $category }}" class="panel-collapse collapse in">
        <div class="gridster">
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








            </ul><!-- grids -->
        </div><!-- gridster -->
       </div>
    </div>
  @endforeach {{-- End foreach --}}


</div><!-- /accoridan -->

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







<div class="container">


        {{-- Because this view is all about the grids --}}
        <div class="gridster">
            <ul class="grids">
               
            </ul><!-- grids -->
        </div><!-- gridster -->


</div><!-- /container -->





@endsection

@section('modals')
    @include('modals/group_details')
    @include('modals/watch_single')    
@endsection

@section('javascript')

    <script type="text/javascript">
        @foreach ( $data['categories'] as $category )
          $(function () { $('#collapse-{{ $category }}').collapse()});
        @endforeach {{-- End foreach --}}
    </script>  



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


