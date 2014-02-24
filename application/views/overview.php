<?php 
    // Note that we have received a big $data array
    // $data contains all the products, 
    // Their respective versions that are active,
    // And the respective queries on each version

    //  Now the fun begins where we compile the view:
    //    First we declare view specific CSS and JS files inside $include
    //    Then send it to the respective views for appending to the DOM
    //    As usual, CSS to the header, JS to the footer.
    $include = array( 
        'top'       => '<link rel="stylesheet" href="/assets/css/overview.css">',
        'bottom'    => '<script src="/assets/js/overview.js"></script>
                        <script>var coreData = '. json_encode($data) .'</script>'
    );
?>

<?php 
    $this->load->view('templates/header', $include);
    $this->load->view('templates/bug_watch');
?>

<div class="container">
    <?php foreach ($data as $product_tag => $product) { ?>
        <div class="row text-center product" id="<?= $product_tag; ?>" data-mytoggler=".versions#<?= $product_tag; ?>">
            <div class="col-lg-12"><?= $product['title']; ?></div>
        </div>

        <div class="row text-center versions" id="<?= $product_tag; ?>">
            <?php foreach ($product['versions'] as $version_tag => $version) { ?>
                <div class="col-sm-<?= floor( 12 / count($product['versions']) ); ?> version" id="<?= $version_tag ?>">
                    <a href="/for/<?= $product_tag; ?>/<?= $version_tag; ?>">    
                        <h2>
                            <?= $version['title']; ?>
                        </h2>
                    </a>
                </div>
            <?php } //End foreach version ?>
        </div>
    <?php } //End foreach product ?>
</div><!-- /container -->

<?php 
    //$this->load->view('modals/overview'); 
    $this->load->view('templates/footer', $include); 
?>



