@layout('templates/layout')

@section('title')
    Release Readiness Dashboard :: DB Dump
@endsection

@section('css')
    <link rel="stylesheet" href="/assets/css/admin_panel.css">
@endsection

@section('content')
    <div class="container">
        <div class="text-center db-table-titles">
            @foreach ( $tables as $table_name => $table )
                {{-- Printing out the list of tables at the top of the page --}}
                <button class="btn btn-default btn-lg db-table-title" title="{{ ucfirst($table_name) }}" style="width:{{80/count($tables)}}%;" data-db-table-toggler=".db-table#{{ $table_name }}">
                    {{ ucfirst($table_name) }}
                </button>
            @endforeach
        </div>
        @foreach ( $tables as $table_name => $table )
            {{-- Printing out a HTML table for every table we have. All hidden at first. Toggled by the above buttons. --}}
            <div class="well well-sm table-responsive db-table" id="{{$table_name}}">
                    <span class="lead">
                        {{ucfirst($table_name)}}
                    </span>
                    @if ( !empty($table) ) 
                        <table class="table table-condensed table-hover">
                            <thead>
                                <tr>
                                    @foreach ( $table[0] as $property => $value )
                                        <th>{{$property}}</th>
                                    @endforeach
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($table as $row)
                                    <tr>
                                        @foreach ( $row as $value )
                                            <th>
                                                {{ htmlspecialchars($value) }}
                                            </th>
                                        @endforeach           
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    @else
                        <p>
                            No data to display.
                        </p>
                    @endif
                </div>
        @endforeach
    </div><!-- /container -->
@endsection

@section('javascript')
    <script src="/assets/js/admin/panel.js"></script>
@endsection