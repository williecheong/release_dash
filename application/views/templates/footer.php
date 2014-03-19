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
        <script src="/assets/vendor/spectrum/spectrum.js"></script>
        <script src="//login.persona.org/include.js"></script>
        <script src="/assets/js/main.js"></script>
        <script>
            <?php /*********************** 
                Setup for Persona
                Referenced from: 
                    https://github.com/EllisLab/CodeIgniter/wiki/Persona-Login
            ***********************/ ?>
            navigator.id.watch({
                loggedInUser: <?= $this->session->userdata('email') ? '"'.$this->session->userdata('email').'"' : 'null' ; ?>,
                onlogin: function (assertion) {
                    $.ajax({
                        type: 'POST',
                        url: '/api/misc/login',
                        data: { assertion: assertion },
                        success: function(response, status, xhr) {
                            if ( response == 'OK' ){
                                window.location.reload();
                            } else {
                                console.log(response);
                                alert(response);
                            }
                        },
                        error: function(response, status, xhr) {
                            console.log(response);
                            alert('Login failed');
                        }
                    });
                },

                onlogout: function () {
                    $.ajax({
                        type: 'POST',
                        url: '/api/misc/logout',
                        success: function(response, status, xhr) {
                            window.location.reload();
                        },
                        error: function(response, status, xhr) {
                            console.log(response);
                            alert('Logout failed');
                        }
                    });
                }
            });
        </script>
        <?= ( isset($bottom) ) ? $bottom : '' ; ?>
        <?= ( isset($rule_scripts) ) ? $rule_scripts : '' ; ?>
    </body>
</html>
