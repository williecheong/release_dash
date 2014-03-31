<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> 
<html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <link rel="shortcut icon" href="/assets/img/<?= ENVIRONMENT; ?>.ico" type="image/x-icon">
        <link rel="icon" href="/assets/img/<?= ENVIRONMENT; ?>.ico" type="image/x-icon">
        <title>Release Readiness Dashboard<?= (isset($version) ? " :: ".$version : ""); ?></title>
        <meta name="description" content="A dashboard for monitoring the readiness of new releases for Mozilla products.">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css">
        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap-theme.min.css">

        <link rel="stylesheet" href="/assets/vendor/rickshaw/rickshaw.min.css">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/basic/jquery.qtip.min.css">
        <link rel="stylesheet" href="/assets/vendor/spectrum/spectrum.css">
        <link rel="stylesheet" href="/assets/css/main.css">
        <?= ( isset( $top) ? $top : '' ); ?>
        <script src="/assets/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script> 
    </head>
    
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->
        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    
                    <?php 
                        // Boolean variable to determine whether or not a menu is needed
                        $display_menu = ($this->uri->segment(1) == 'for' || $this->session->userdata('email')); 
                    ?>
                    <?php if ( $display_menu ) { ?>
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    <?php } ?>
                    <a class="navbar-brand" href="/">
                        RRDashboard
                    </a>
                    <?php if ( isset($version) ) { ?>
                        <span class="navbar-brand lead rrscore">
                            <?= $version; ?>
                        </span>
                    <?php } ?>
                </div>
                <div class="navbar-collapse collapse">
                    <div class="navbar-form navbar-right">
                        <button class="btn btn-default" data-toggle="modal" data-target="#navigation-menu">
                            <i class="fa fa-plane fa-lg"></i> Navigate
                        </button>
                        <?php if ( $this->uri->segment(1) == 'for' ) { ?>
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