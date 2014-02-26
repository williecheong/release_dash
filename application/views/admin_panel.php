<?php 
    //  Now the fun begins where we compile the view:
    //    First we declare view specific CSS and JS files inside $include
    //    Then send it to the respective views for appending to the DOM
    //    As usual, CSS to the header, JS to the footer.
    $include = array( 
        'top'       => '<link rel="stylesheet" href="/assets/css/admin_panel.css">',
        'bottom'    => '<script src="/assets/js/admin_panel.js"></script>'
    );
?>

<?php 
    $this->load->view('templates/header', $include);
?>

<div class="container">
    <div class="text-center db-table-titles">
    <?php foreach ( $tables as $table_name => $table ) { ?>
        <button class="btn btn-default btn-lg db-table-title" title="<?= ucfirst($table_name); ?>" style="width: <?= 80/count($tables); ?>%;" data-db-table-toggler=".db-table#<?= $table_name; ?>">
            <?= ucfirst($table_name); ?>
        </button>
    <?php } ?>
    </div>
    <?php foreach ( $tables as $table_name => $table ) { ?>
        <div class="well well-sm table-responsive db-table" id="<?= $table_name; ?>">
                <span class="lead">
                    <?= ucfirst($table_name); ?>
                </span>
                <table class="table table-condensed table-hover">
                    <thead>
                        <tr>
                        <?php foreach ( $table[0] as $property => $value ) { ?>
                            <th><?= $property; ?></th>
                        <?php } ?>
                        </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($table as $row) { ?> 
                        <tr>
                        <?php foreach ( $row as $value ) { ?>
                            <th><?= $value; ?></th>
                        <?php } ?>            
                        </tr>
                    <?php } ?>
                    </tbody>
                </table>
            </div>
    <?php } ?>
</div><!-- /container -->

<?php 
    $this->load->view('templates/footer', $include); 
?>