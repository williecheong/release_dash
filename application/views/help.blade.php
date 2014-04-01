<?php 
    $include = array( 
        'top'    => '<link rel="stylesheet" href="/assets/css/help.css">',
        'bottom' => '<script src="/assets/js/help.js"></script>'
    );

    $this->load->view('templates/header', $include);

    $sections = array(
        'intro' => array(
            'name'   => 'Introduction',
            'children' => array(
                'why' => 'Why is this awesome?'
            )
        ),
        'gq' => array(
            'name'   => 'Groups of Queries',
            'children' => array(
                'how_to_make_group' => 'How to make a group?',
                'tips_and_tricks'   => 'Tips and tricks'
            )
        )
    );

?>

<div class="container">
    <div class="row">
        <div class="col-md-9">
            @foreach ($sections as $section_tag => $section)
                <div class="section">
                    <h2 id="{{ $section_tag }}">{{ $section['name'] }}</h2>
                    @foreach ( $section['children'] as $child_tag => $child_name )
                        <h4 id="{{ $section_tag.'_'.$child_tag }}">{{ $child_name }}</h4>
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

<?php 
    $this->load->view('templates/footer', $include); 
?>