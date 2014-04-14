<?php 
    //  Now the fun begins where we compile the view:
    //    First we declare view specific CSS and JS files inside $include
    //    Then send it to the respective views for appending to the DOM
    //    As usual, CSS to the header, JS to the footer.
    $include = array( 
        'bottom'    => '<script src="/assets/js/admin/login.js"></script>'
    );
?>

<?php 
    $this->load->view('templates/header', $include);
?>

<div class="container">
    <div class="row" style="margin:10%;">
        <div class="col-lg-12 text-center">
            <?php /* Nothing fancy. Just a big blue button for Persona login */ ?>
            <button class="btn btn-primary btn-lg" id="start-persona">
                <i class="fa fa-users fa-lg"></i> Login with Persona
            </button>
        </div>
    </div>
</div><!-- /container -->

<?php 
    $this->load->view('templates/footer', $include); 
?>