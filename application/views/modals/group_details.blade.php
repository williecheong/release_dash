<!-- Modal for making new group -->
<div class="modal fade" id="new-group" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">
                    Create Group
                </h4>
            </div>
            <div class="modal-body"> 
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label" for="group-name">Group Name</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="group-name" placeholder="Description for this set of queries.">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label" for="query-name">Category</label>
                        <div class="col-sm-9 controls" id="category-options">
                        <!-- Put the select options in -->
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-9">
                            <label class="checkbox-inline">
                                <input type="checkbox" id="group-is-plot"> Show plot 
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" id="group-is-number"> Show number
                            </label>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default btn-sm" id="new-query-template">
                    <i class="fa fa-plus"></i> Query
                </button>
                <button class="btn btn-success" id="save-new-group">
                    <i class="fa fa-save"></i> Save
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Modal for viewing/deleting old group -->
<div class="modal fade" id="old-group" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">
                    Edit Group
                </h4>
            </div>
            <div class="modal-body"> 
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label" for="group-name">Group Name</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="group-name" placeholder="Description for this set of queries.">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label" for="query-name">Category</label>
                        <div class="col-sm-9 controls" id="category-options">
                        <!-- Put the select options in -->
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-9">
                            <label class="checkbox-inline">
                                <input type="checkbox" id="group-is-plot"> Show plot 
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" id="group-is-number"> Show number
                            </label>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger btn-sm" id="delete-old-group">
                    <i class="fa fa-times"></i> Delete
                </button>
                <button class="btn btn-success" id="update-old-group">
                    <i class="fa fa-save"></i> Update
                </button>
            </div>
        </div>
    </div>
</div>
