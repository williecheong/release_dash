<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>RelMan Dashboard</title>
        <meta name="description" content="A dashboard for monitoring the readiness of new releases for Mozilla products.">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
        <style>
            body {
                padding-top: 50px;
                padding-bottom: 20px;
            }
        </style>
        <link rel="stylesheet" href="/assets/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="/assets/css/main.css">

        <script src="/assets/js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    </head>
    
    <body>
      <!--[if lt IE 7]>
          <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
      <![endif]-->
      <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <?php /*
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            */ ?>
            <a class="navbar-brand" href="#">RelMan Dashboard</a>
          </div>
          <?php /*
          <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
                <ul class="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li class="divider"></li>
                  <li class="dropdown-header">Nav header</li>
                  <li><a href="#">Separated link</a></li>
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li>
            </ul>
            
            <form class="navbar-form navbar-right">
              <div class="form-group">
                <input type="text" placeholder="6 weeks" class="form-control">
              </div>
              <div class="form-group">
                <input type="text" placeholder="12 weeks" class="form-control">
              </div>
              <button type="submit" class="btn btn-success">Sign in</button>
            </form>
          </div><!--/.navbar-collapse -->
          */ ?>
        </div>
      </div>

      <?php /*
      <div class="jumbotron bugwatch">
        <div class="container text-center">
          <h1>BUG WATCH</h1>
          <div class="input-group bugwatch" id="track">
            <input type="text" class="form-control" placeholder="999999 (maybe later...)">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button">Track</button>
            </span>
          </div><!-- /input-group -->
        </div>
      </div>
      */ ?>

      <div class="container">
        <!-- Example row of columns -->
        <div class="row toggler" id="desktop">
          <div class="col-lg-12">DESKTOP</div>
        </div>
        <div class="row channels" id="desktop">
          <div class="col-lg-3 channel" id="release" data-product="desktop" data-channel="release">
            <h2>Release</h2>
            <p>Firefox26</p>
            <p>[SCORE]</p>
          </div>
          <div class="col-lg-3 channel" id="beta" data-product="desktop" data-channel="beta">
            <h2>Beta</h2>
            <p>Firefox27</p>
            <p>[SCORE]</p>
          </div>
          <div class="col-lg-3 channel" id="aurora" data-product="desktop" data-channel="aurora">
            <h2>Aurora</h2>
            <p>Firefox28</p>
            <p>[SCORE]</p>
          </div>
          <div class="col-lg-3 channel" id="nightly" data-product="desktop" data-channel="nightly">
            <h2>Nightly</h2>
            <p>Firefox29</p>
            <p>[SCORE]</p>
          </div>
        </div>

        <div class="row toggler" id="android">
          <div class="col-lg-12">ANDROID</div>
        </div>
        <div class="row channels" id="android">
          <div class="col-lg-3 channel" id="release" data-product="android" data-channel="release">
            <h2>Release</h2>
            <p>Firefox26</p>
            <p>[SCORE]</p>
          </div>
          <div class="col-lg-3 channel" id="beta" data-product="android" data-channel="beta">
            <h2>Beta</h2>
            <p>Firefox27</p>
            <p>[SCORE]</p>
          </div>
          <div class="col-lg-3 channel" id="aurora" data-product="android" data-channel="aurora">
            <h2>Aurora</h2>
            <p>Firefox28</p>
            <p>[SCORE]</p>
          </div>
          <div class="col-lg-3 channel" id="nightly" data-product="android" data-channel="nightly">
            <h2>Nightly</h2>
            <p>Firefox29</p>
            <p>[SCORE]</p>
          </div>
        </div>

        <div class="row toggler" id="b2g">
          <div class="col-lg-12">B2G</div>
        </div>
        <div class="row channels" id="b2g">
          <div class="col-lg-6 channel" id="convergence" data-product="B2G" data-channel="convergence">
            <h2>Convergence</h2>
            <p>v1.3</p>
            <p>[SCORE]</p>
          </div>
          <div class="col-lg-6 channel" id="central" data-product="B2G" data-channel="central">
            <h2>Central</h2>
            <p>v1.4</p>
            <p>[SCORE]</p>
          </div>
        </div>

        <hr>

        <footer>
          <p>&copy; Mozilla - RelMan 2014</p>
        </footer>
      </div><!-- /container -->  

      <!-- Modal -->
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" id="myModalLabel">Overview for <span class="descriptor" id="product-channel"></span></h4>
            </div>
            <div class="modal-body">
              Here is some information about the <span class="descriptor" id="product-channel"></span> channel. 
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">More details &raquo;</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->

      
      <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
      <script>window.jQuery || document.write('<script src="/assets/js/vendor/jquery-1.10.1.min.js"><\/script>')</script>
      <script src="/assets/js/vendor/bootstrap.min.js"></script>
      <script src="/assets/js/main.js"></script>
    </body>
</html>









