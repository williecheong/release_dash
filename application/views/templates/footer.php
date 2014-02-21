        <!-- Footer -->
        <div class="container">
            <hr>
            <footer>
                <p>&copy; Mozilla - Release Management <?= date("Y"); ?> </p>
            </footer>
        </div>
        <!-- /.footer -->
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/basic/jquery.qtip.min.js"></script>
        <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
        <?= ( isset($bottom) ) ? $bottom : '' ; ?>
        <?= ( isset($rule_scripts) ) ? $rule_scripts : '' ; ?>
    </body>
</html>
