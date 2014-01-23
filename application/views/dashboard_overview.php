<?php 
  // First we declare view specific CSS and JS files inside $include
  // Then send it to the respective views for appending to the DOM
  // As usual, CSS to the header, JS to the footer.
  $include = array( 
    'css' => '<link rel="stylesheet" href="/assets/css/dashboard_overview.css">',
    'js'  => '<script src="/assets/js/dashboard_overview.js"></script>' 
  );
?>

<?php 
  $this->load->view('templates/header', $include);
  $this->load->view('templates/bug_watch');
?>

<div class="container">
  <!-- Example row of columns -->
  <div class="row toggler" id="desktop">
    <div class="col-lg-12">DESKTOP</div>
  </div>
  <div class="row channels" id="desktop">
    <div class="col-lg-3 channel" id="nightly" data-product="desktop" data-channel="nightly">
      <h2>Nightly</h2>
      <p>Firefox29</p>
      <p>[SCORE]</p>
    </div>
    <div class="col-lg-3 channel" id="aurora" data-product="desktop" data-channel="aurora">
      <h2>Aurora</h2>
      <p>Firefox28</p>
      <p>[SCORE]</p>
    </div>
    <div class="col-lg-3 channel" id="beta" data-product="desktop" data-channel="beta">
      <h2>Beta</h2>
      <p>Firefox27</p>
      <p>[SCORE]</p>
    </div>
    <div class="col-lg-3 channel" id="release" data-product="desktop" data-channel="release">
      <h2>Release</h2>
      <p>Firefox26</p>
      <p>[SCORE]</p>
    </div>
  </div>

  <div class="row toggler" id="android">
    <div class="col-lg-12">ANDROID</div>
  </div>
  <div class="row channels" id="android">
    <div class="col-lg-3 channel" id="nightly" data-product="android" data-channel="nightly">
      <h2>Nightly</h2>
      <p>Firefox29</p>
      <p>[SCORE]</p>
    </div>
    <div class="col-lg-3 channel" id="aurora" data-product="android" data-channel="aurora">
      <h2>Aurora</h2>
      <p>Firefox28</p>
      <p>[SCORE]</p>
    </div>
    <div class="col-lg-3 channel" id="beta" data-product="android" data-channel="beta">
      <h2>Beta</h2>
      <p>Firefox27</p>
      <p>[SCORE]</p>
    </div>
    <div class="col-lg-3 channel" id="release" data-product="android" data-channel="release">
      <h2>Release</h2>
      <p>Firefox26</p>
      <p>[SCORE]</p>
    </div>
  </div>

  <div class="row toggler" id="b2g">
    <div class="col-lg-12">B2G</div>
  </div>
  <div class="row channels" id="b2g">
    <div class="col-lg-6 channel" id="central" data-product="B2G" data-channel="central">
      <h2>Functional Complete</h2>
      <p>v1.4</p>
      <p>[SCORE]</p>
    </div>
    <div class="col-lg-6 channel" id="convergence" data-product="B2G" data-channel="convergence">
      <h2>Code Freeze</h2>
      <p>v1.3</p>
      <p>[SCORE]</p>
    </div>
  </div>

  <hr>

  <footer>
    <p>&copy; Mozilla - RelMan <?= date("Y"); ?> </p>
  </footer>
</div><!-- /container -->

<?php 
  $this->load->view('modals/branch_overview'); 
  $this->load->view('templates/footer', $include); 
?>

