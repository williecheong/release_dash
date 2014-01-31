<!-- Modal -->
<div class="modal modal-wide fade" id="branch_overview" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">
                    Overview for <span class="descriptor" id="product-channel"></span>
                </h4>
            </div>
            <div class="modal-body"> 
                <div class="text-center js-clear" id="load-status"></div>
                <div class="row">
                    <div class="col-lg-10 graph" id="graph-container">
                        <div class="graph js-clear" id="y-axis"></div>
                        <div class="graph js-clear" id="main-plot"></div>
                    </div>
                    <div class="col-lg-2 graph" id="legend-container">
                        <div class="graph js-clear" id="legend"></div>
                    </div>
                </div>
                <div class="caption text-center js-clear" id="under-plot"></div>
                
                <div class="text-center">
                    <button type="button" class="btn btn-default btn-xs text-center" id="toggle-add-new-query" data-toggler=".form#new-query">New Query</button>
                </div>
                <div class="form" id="new-query" style="display:none;">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">Title</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputTitle3" placeholder="Descriptive name for this query">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputPassword3" class="col-sm-2 control-label">Qb Query</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputQuery3" placeholder="The actual query in json format">
                            </div>
                        </div>
                        <?php /*
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox">
                                    </label>
                                </div>
                            </div>
                        </div>
                        */ ?>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="button" class="btn btn-default">Submit Query</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary">More details &raquo;</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->