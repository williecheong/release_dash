<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> 
<html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <link rel="shortcut icon" href="/assets/img/{{ ENVIRONMENT }}.ico" type="image/x-icon">
        <link rel="icon" href="/assets/img/{{ ENVIRONMENT }}.ico" type="image/x-icon">
        <title>@yield('title')</title>
        <meta name="description" content="A dashboard for monitoring the readiness of new releases for Mozilla products.">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css">
        <!-- <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap-theme.min.css"> -->
        <link rel="stylesheet" href="/assets/vendor/rickshaw/rickshaw.min.css">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
        <link rel="stylesheet" href="//cdn.jsdelivr.net/qtip2/2.2.0/jquery.qtip.min.css">
        <link rel="stylesheet" href="/assets/vendor/spectrum/spectrum.css">
        <link rel="stylesheet" href="/assets/css/main.css">
        
        @yield('css')

        <script src="/assets/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script> 
    </head>
    
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->
        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/">
                        RRDashboard
                    </a>
                    @yield('sub_title')
                </div>
                <div class="navbar-collapse collapse">
                    <div class="navbar-form navbar-right">
                        <button class="btn btn-default" data-toggle="modal" data-target="#navigation-menu">
                            <i class="fa fa-plane fa-lg"></i> Navigate
                        </button>
                        <?php if ( $this->uri->segment(1) == 'for' ) { ?>
                            <button class="btn btn-default" data-toggle="modal" data-target="#comment-box">
                                <i class="fa fa-comment"></i> Summary
                            </button>
                            <a class="btn btn-default" id="es-refresh" href="/<?= uri_string(); ?>?refresh=1">
                                <i class="fa fa-refresh"></i> Refresh
                            </a>
                        <?php } ?>
                        <?php if ( $this->session->userdata('email') ) { ?>
                            <button class="btn btn-danger" id="user-logout">
                                <i class="fa fa-sign-out fa-lg"></i> <?= $this->session->userdata('email'); ?>
                            </button>
                        <?php } ?>
                    </div>
                </div><!--/.navbar-collapse -->
            </div>
        </div>

        @yield('content')
        @yield('modals')

        <!-- Modal for viewing navigation menu -->
        <div class="modal fade" id="navigation-menu" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">
                            Navigation menu
                        </h4>
                    </div>
                    <div class="modal-body"> 
                        <div class="list-group">
                            <div class="list-group-item">
                                <h4 class="list-group-item-heading">
                                    <button class="btn btn-default btn-xs pull-right" data-mytoggler=".navigation-description#overview">
                                        <i class="fa fa-toggle-down"></i>
                                    </button>
                                    <a href="/">
                                        Overview
                                    </a>
                                </h4>
                                <p class="list-group-item-text navigation-description" id="overview">
                                    Provides a high level view of all active versions. Also displays the last known release readiness score for each active versions.
                                </p>
                            </div>
                            <div class="list-group-item">
                                <h4 class="list-group-item-heading">
                                    <button class="btn btn-default btn-xs pull-right" data-mytoggler=".navigation-description#admin">
                                        <i class="fa fa-toggle-down"></i>
                                    </button>
                                    <a href="/admin">
                                        Administration
                                    </a>
                                </h4>
                                <p class="list-group-item-text navigation-description" id="admin">
                                    Login using Persona. Grants privileges to modify groups and queries. For admin permissions, contact responsible team and ask to be added into the white-list.
                                </p>
                            </div>
                            <div class="list-group-item">
                                <h4 class="list-group-item-heading">
                                    <button class="btn btn-default btn-xs pull-right" data-mytoggler=".navigation-description#easy_qb">
                                        <i class="fa fa-toggle-down"></i>
                                    </button>
                                    <a href="/admin/easy_qb">
                                        Qb query builder
                                    </a>
                                </h4>
                                <p class="list-group-item-text navigation-description" id="easy_qb">
                                    Translation tool for converting a Bugzilla URL into Qb queries. Use this when creating groups and queries on the dashboard.
                                </p>
                            </div>
                            <div class="list-group-item">
                                <h4 class="list-group-item-heading">
                                    <button class="btn btn-default btn-xs pull-right" data-mytoggler=".navigation-description#update_components">
                                        <i class="fa fa-toggle-down"></i>
                                    </button>
                                    <a href="/admin/update_components">
                                        Update components
                                    </a>
                                </h4>
                                <p class="list-group-item-text navigation-description" id="update_components">
                                    Retrieves a list of components for each product from Bugzilla and updates the database. List is used for generating "breakdown by component" views on groups.
                                </p>
                            </div>
                            <div class="list-group-item">
                                <h4 class="list-group-item-heading">
                                    <button class="btn btn-default btn-xs pull-right" data-mytoggler=".navigation-description#help">
                                        <i class="fa fa-toggle-down"></i>
                                    </button>
                                    <a href="/help">
                                        User manual
                                    </a>
                                </h4>
                                <p class="list-group-item-text navigation-description" id="help">
                                    Some references/tutorials to help you get started. Recommended for newbies, kittens, puppies, and bored advanced-users.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        

        <!-- Footer -->
        <div class="container">
            <hr>
            <footer>
                <p>&copy; Mozilla - Release Management {{ date("Y") }}</p>
            </footer>
        </div><!-- /.footer -->
        
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
        <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
        <script src="//cdn.jsdelivr.net/qtip2/2.2.0/jquery.qtip.min.js"></script>
        <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
        <script src="/assets/vendor/spectrum/spectrum.js"></script>
        <script src="//login.persona.org/include.js"></script>
        <script src="/assets/js/common/main.js"></script>
        <script>
            <?php /*********************** 
                Setup for Persona
                Referenced from: 
                    https://github.com/EllisLab/CodeIgniter/wiki/Persona-Login
            ***********************/ ?>
            navigator.id.watch({
                loggedInUser: {{ $this->session->userdata('email') ? '"'.$this->session->userdata('email').'"' : 'null' }},
                onlogin: function (assertion) {
                    $.ajax({
                        type: 'POST',
                        url: '/api/misc/login',
                        data: { assertion: assertion },
                        success: function(response, status, xhr) {
                            if ( response == 'OK' ){
                                window.location.reload();
                            } else {
                                console.log(response);
                                alert(response);
                            }
                        },
                        error: function(response, status, xhr) {
                            console.log(response);
                            alert('Login failed');
                        }
                    });
                },

                onlogout: function () {
                    $.ajax({
                        type: 'POST',
                        url: '/api/misc/logout',
                        success: function(response, status, xhr) {
                            window.location.reload();
                        },
                        error: function(response, status, xhr) {
                            console.log(response);
                            alert('Logout failed');
                        }
                    });
                }
            });
        </script>
        @yield('javascript')
        @yield('rules')
    </body>
</html>

