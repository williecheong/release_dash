<!-- Modal -->
<div class="modal modal-wide fade" id="branch_overview" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">
                    Overview for Desktop 27 <span class="descriptor" id="product-channel"></span>
                </h4>
            </div>
            <div class="modal-body"> 
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
                <div class="text-center js-clear" id="misc-text"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary">New query</button>
                <button type="button" class="btn btn-primary">More details &raquo;</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->