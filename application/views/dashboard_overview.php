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
        'top' => '<link rel="stylesheet" href="/assets/css/dashboard_overview.css">',
        'bottom' => '<script src="/assets/js/dashboard_overview.js"></script>'
    );
?>

<?php 
    $this->load->view('templates/header', $include);
    $this->load->view('templates/bug_watch');
?>

<div class="container">
    <?php foreach ($data as $product_tag => $product) { ?>
    <div class="row text-center product" id="<?= $product_tag; ?>" data-toggler=".channels#<?= $product_tag; ?>">
        <div class="col-lg-12"><?= $product['title']; ?></div>
    </div>

    <div class="row text-center channels" id="<?= $product_tag; ?>">
        <?php foreach ($product['branches'] as $branch_tag => $branch) { ?>
        <div class="col-lg-3 channel" id="<?= $branch_tag ?>">
            <h2><?= $branch['title']; ?></h2>
        </div>
        <?php } //End foreach branch ?>
    </div>
    <?php } //End foreach product ?>
    
    <hr>
    
    <footer>
        <p>&copy; Mozilla - RelMan <?= date("Y"); ?> </p>
    </footer>
</div><!-- /container -->

<!-- DECLARING JSON CONTAINING QUERIES AND META DATA. -->
    <script>
        var coreData = <?= json_encode($data); ?>
    </script>

<!-- MODALS AND FOOTER -->
<?php 
    $this->load->view('modals/branch_overview'); 
    $this->load->view('templates/footer', $include); 
?>



