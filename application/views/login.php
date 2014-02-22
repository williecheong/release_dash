<?php 
    //  Now the fun begins where we compile the view:
    //    First we declare view specific CSS and JS files inside $include
    //    Then send it to the respective views for appending to the DOM
    //    As usual, CSS to the header, JS to the footer.
    $include = array( 
        'bottom'    => '<script src="/assets/js/login.js"></script>'
    );
?>

<?php 
    $this->load->view('templates/header', $include);
?>

<div class="container">
    <div class="row" style="margin:10%;">
        <div class="col-lg-12 text-center">
            <?php if ( $this->session->userdata('email') ) { ?>
                <button class="btn btn-danger btn-lg" id="user-logout">
                    <i class="fa fa-user fa-lg"></i> Logout of Administration
                </button>
            <?php } else { ?>
                <button class="btn btn-primary btn-lg" id="start-persona">
                    <i class="fa fa-users fa-lg"></i> Login with Persona
                </button>
            <?php } ?>
        </div>
    </div>
</div><!-- /container -->

<?php 
    $this->load->view('templates/footer', $include); 
?>