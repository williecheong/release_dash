<?php 
  // Note that we have received a big $data array
  // $data contains all the products, 
  // Their respective branches that are active,
  // And the respective queries on each branch

  //  Now the fun begins where we compile the view:
  //    First we declare view specific CSS and JS files inside $include
  //    Then send it to the respective views for appending to the DOM
  //    As usual, CSS to the header, JS to the footer.
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

<!-- DECLARING JSON CONTAINING QUERIES AND META DATA. -->
<script>
  var data = <?= json_encode($data); ?>
</script>

<!-- MODALS AND FOOTER -->
<?php 
  $this->load->view('modals/branch_overview'); 
  $this->load->view('templates/footer', $include); 
?>


<script type="application/javascript;version=1.7">
/*
  importScript(["/assets/js/vendor/es_translate/js/main.js", "/assets/js/vendor/es_translate/Qb_translate.js"], function(){
      var executeCube = function(event){ //THIS IS A GENERATOR

          //EVAL THE Qb
          var code = '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox27":"+"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":1379376000000,"max":1390865991000,"interval":"day"}}]}';
          if (code.trim().left(1) != "{") code = "{" + code;
          if (code.trim().right(1) != "}") code = code + "}";

          //var backupCode = code;
          var cubeQuery;
          try{
              //USE JSONLINT TO FORMAT AND TEST-COMPILE THE code
              code = jsl.format.formatJson(code);
              //$("#cube").val(code);
              esQuery = yield (esTranslate(code));
              console.log(esQuery);
              //$("#esquery").val(esQuery);
          } catch(e){
              $("#esquery").val(e.message);
              yield(null);
          }//try
      };
  });  
*/
</script>



