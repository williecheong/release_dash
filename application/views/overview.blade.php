<?php 
    $include = array( 
        'top'       => '<link rel="stylesheet" href="/assets/css/overview.css">',
        'bottom'    => '<script src="/assets/js/overview/main.js"></script>
                        <script src="/assets/js/common/helpers_groups.js"></script>
                        <script src="/assets/js/common/templates_groups.js"></script>
                        <script src="/assets/js/common/qb_maker.js"></script>
                        <script>var coreData = '. json_encode($data) .'</script>'
    );
 
    $this->load->view('templates/header', $include);
    $this->load->view('templates/bug_watch');
?>

<div class="container">
    @foreach ($data as $product_tag => $product)
        {{-- Print the heading title for each product --}}
        <div class="row text-center product" id="{{$product_tag}}">
            {{-- Clicking on this also toggles the active versions below. --}}
            <div class="col-xs-offset-4 col-xs-4" style="cursor:pointer;" data-mytoggler=".versions#{{$product_tag}}">
                {{-- Print the words for the product title. --}}
                {{ $product['title'] }}
            </div>
            
            <div class="col-xs-4 text-right">
                @if ( $this->session->userdata('email') )
                    {{-- If user is logged in, show buttons for creating and viewing default groups --}}
                    <div class="btn-group">
                        <button type="button" class="btn btn-default" id="add-new-group" title="Add a default group">
                            <i class="fa fa-plus"></i>
                        </button>
                        <div class="btn-group">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                Groups <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu text-left pull-right">
                                @foreach( $product['groups'] as $group_id => $group )
                                    <li id="edit-old-group" data-group-id="{{$group_id}}">
                                        <a>{{ $group['title'] }}</a>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                @endif
            </div>
        </div>

        {{-- Print the active versions below the version title --}}
        <div class="row text-center versions" id="{{$product_tag}}">
            @foreach ($product['versions'] as $version_tag => $version)
                <div class="col-sm-{{ floor(12/count($product['versions'])) }} version" id="{{$version_tag}}" style="background:{{$version['score']}};">
                    <a href="/for/{{$product_tag}}/{{$version_tag}}">    
                        <h1>
                            {{ $version_tag }}
                        </h1>
                    </a>
                    <em class="small pull-right">
                        <?php
                            $last_updated = 'Never';
                            if ( $version['last_updated'] != 'never' ) {
                                $last_updated = date('M j, g:ia' ,strtotime($version['last_updated']));
                            } 
                        ?>
                        Updated: {{ $last_updated }}
                    </em>
                </div>
            @endforeach
        </div>
    @endforeach
</div><!-- /container -->

<?php 
    if ( $this->session->userdata('email') ) {
        $this->load->view('modals/overview'); 
    }
    $this->load->view('templates/footer', $include); 
?>



