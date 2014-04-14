        <!-- Modal for viewing navigation menu -->
        <div class="modal fade" id="navigation-menu" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">
                            Navigation menu
                        </h4>
                    </div>
                    <div class="modal-body"> 
                        <div class="list-group">
                            <div class="list-group-item">
                                <h4 class="list-group-item-heading">
                                    <button class="btn btn-default btn-xs pull-right" data-mytoggler=".navigation-description#overview">
                                        <i class="fa fa-toggle-down"></i>
                                    </button>
                                    <a href="/">
                                        Overview
                                    </a>
                                </h4>
                                <p class="list-group-item-text navigation-description" id="overview">
                                    Provides a high level view of all active versions. Also displays the last known release readiness score for each active versions.
                                </p>
                            </div>
                            <div class="list-group-item">
                                <h4 class="list-group-item-heading">
                                    <button class="btn btn-default btn-xs pull-right" data-mytoggler=".navigation-description#admin">
                                        <i class="fa fa-toggle-down"></i>
                                    </button>
                                    <a href="/admin">
                                        Administration
                                    </a>
                                </h4>
                                <p class="list-group-item-text navigation-description" id="admin">
                                    Login using Persona. Grants privileges to modify groups and queries. For admin permissions, contact responsible team and ask to be added into the white-list.
                                </p>
                            </div>
                            <div class="list-group-item">
                                <h4 class="list-group-item-heading">
                                    <button class="btn btn-default btn-xs pull-right" data-mytoggler=".navigation-description#easy_qb">
                                        <i class="fa fa-toggle-down"></i>
                                    </button>
                                    <a href="/admin/easy_qb">
                                        Qb query builder
                                    </a>
                                </h4>
                                <p class="list-group-item-text navigation-description" id="easy_qb">
                                    Translation tool for converting a Bugzilla URL into Qb queries. Use this when creating groups and queries on the dashboard.
                                </p>
                            </div>
                            <div class="list-group-item">
                                <h4 class="list-group-item-heading">
                                    <button class="btn btn-default btn-xs pull-right" data-mytoggler=".navigation-description#update_components">
                                        <i class="fa fa-toggle-down"></i>
                                    </button>
                                    <a href="/admin/update_components">
                                        Update components
                                    </a>
                                </h4>
                                <p class="list-group-item-text navigation-description" id="update_components">
                                    Retrieves a list of components for each product from Bugzilla and updates the database. List is used for generating "breakdown by component" views on groups.
                                </p>
                            </div>
                            <div class="list-group-item">
                                <h4 class="list-group-item-heading">
                                    <button class="btn btn-default btn-xs pull-right" data-mytoggler=".navigation-description#help">
                                        <i class="fa fa-toggle-down"></i>
                                    </button>
                                    <a href="/help">
                                        User manual
                                    </a>
                                </h4>
                                <p class="list-group-item-text navigation-description" id="help">
                                    Some references/tutorials to help you get started. Recommended for newbies, kittens, puppies, and bored advanced-users.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        

        <!-- Footer -->
        <div class="container">
            <hr>
            <footer>
                <p>&copy; Mozilla - Release Management <?= date("Y"); ?> </p>
            </footer>
        </div><!-- /.footer -->
        
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/basic/jquery.qtip.min.js"></script>
        <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
        <script src="/assets/vendor/spectrum/spectrum.js"></script>
        <script src="//login.persona.org/include.js"></script>
        <script src="/assets/js/common/main.js"></script>
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
