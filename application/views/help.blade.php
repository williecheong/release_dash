@layout('templates/layout')

@section('title')
    Release Readiness Dashboard :: User Manual
@endsection

@section('css')
    <link rel="stylesheet" href="/assets/css/help.css">
@endsection

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-9">
                @foreach ($sections as $section_tag => $section)
                    <div class="section">
                        <h1 id="{{ $section_tag }}">{{ $section['name'] }}</h1>
                        @foreach ( $section['children'] as $child_tag => $child_name )
                            <h3 id="{{ $section_tag.'_'.$child_tag }}">{{ $child_name }}</h3>
                            @if ( file_exists(FCPATH.'application/views/help/'.$section_tag.'_'.$child_tag.'.php') )
                                <?php $this->load->view('help/'.$section_tag.'_'.$child_tag); ?>
                            @endif 
                        @endforeach
                    </div>
                @endforeach
                <hr>
            </div>
            
            <div class="col-md-3" id="rightCol">
                <ul class="nav nav-stacked" id="sidebar">
                    @foreach ( $sections as $section_tag => $section )
                        <li>
                            <a href="#{{ $section_tag }}">{{ $section['name'] }}</a>
                            <ul>
                                @foreach ( $section['children'] as $child_tag => $child_name )
                                    <li>
                                        <a href="#{{ $section_tag.'_'.$child_tag }}">{{ $child_name }}</a>
                                    </li>
                                @endforeach
                            </ul>
                        </li>
                    @endforeach
                </ul>
            </div> 
        </div>
    </div><!-- /container -->
@endsection

@section('javascript')
    <script src="/assets/js/help/main.js"></script>
@endsection