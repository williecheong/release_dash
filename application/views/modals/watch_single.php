<!-- Modal -->
<div class="modal fade" id="new-group" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">
                    Add New Group
                </h4>
            </div>
            <div class="modal-body"> 
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label" for="new-group-name">Group Name</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="new-group-name" placeholder="Description for this set of queries.">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-9">
                            <label class="checkbox-inline">
                                <input type="checkbox" id="is-plot" value="0"> Show plot 
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" id="is-number" value="1"> Show number
                            </label>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default btn-sm" id="new-query-template">
                    <i class="icon-plus"></i> Query
                </button>
                <button class="btn btn-success" id="save-group">
                    <i class="icon-save"></i> Save
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->