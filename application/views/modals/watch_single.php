<!-- Modal for making new group -->
<div class="modal fade" id="new-group" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
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
                                <input type="checkbox" id="new-group-is-plot"> Show plot 
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" id="new-group-is-number"> Show number
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
                <button class="btn btn-danger btn-sm" id="delete-old-group" data-group-id="">
                    <i class="fa fa-times"></i> Delete
                </button>
                <button class="btn btn-success" id="update-old-group" data-group-id="">
                    <i class="fa fa-save"></i> Update
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Modal for retrieving rule boilerplate -->
<div class="modal fade" id="rule-boilerplate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">
                    Rule Boilerplate for <span class="lead" id="rule-group-title"></span>
                </h4>
            </div>
            <div class="modal-body"> 
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="col-sm-2 control-label" for="rule-file-name">Directory</label>
                        <div class="col-sm-10">
                            <p class="form-control-static" id="rule-file-name"></p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" for="rule-script">Template</label>
                        <div class="col-sm-10">
                            <textarea class="form-control expand" id="rule-script" rows="20"></textarea>
                        </div>
                    </div>
                </form>
                <div class="well well-sm">
                    <button class="btn btn-xs btn-default" style="width:100%;" data-mytoggler="#about-rule-boilerplate">
                        Instructions
                    </button>
                    <div id="about-rule-boilerplate">
                        <strong>To add a rule for this group:</strong>
                        <ol>
                            <li>Create a Javascript file as specified in the above "Directory".</li>
                            <li>Copy the code in "Template" into the newly created Javascript file.</li>
                            <li>Proceed to script rules. There are inline comments to help guide you.</li>
                            <li>Ensure the JS file name is correct. Otherwise the rule will not be applied.</li>
                            <li>If you have production deployment rights, good for you. </li>
                            <li>Otherwise, submit a pull request to <a href="https://github.com/williecheong/release_dash">GitHub</a>.</li>
                        </ol>
                        <strong>To modify/delete a rule on this group:</strong>
                        <ol>
                            <li>Simply edit/remove the corresponding file from <code>/assets/rules</code>.</li>
                            <li>Note: There can always be <em>only one rule for each group</em>.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal for viewing component breakdowns -->
<div class="modal fade" id="component-breakdowns" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">
                    Breakdown for <span class="lead" id="breakdown-group-title"></span>
                </h4>
            </div>
            <div class="modal-body"> 
                <div class="breakdown-graph">
                    <div class="breakdown-y-axis"></div>
                    <div class="breakdown-plot"></div>
                </div>
                
                <div class="well well-sm breakdown-table">
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal for viewing navigation menu -->
<div class="modal fade" id="comment-box" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">
                    Comment for <span class="lead"><?= $version; ?></span>
                </h4>
            </div>
            <div class="modal-body"> 
                <?php if ( $this->session->userdata('email') ) { ?>
                    <textarea class="form-control input-comment" rows="15" placeholder="Comments about the status of this release?"><?= ( !empty($comment) ) ? $comment->comment_message : "" ; ?></textarea>
                    <button class="btn btn-success btn-xs pull-right" id="save-comment" style="margin-top:10px;">
                        <i class="fa fa-save"></i> Save
                    </button>
                <?php } else { ?>
                    <p>
                        <?= ( !empty($comment) ) ? $comment->comment_message : "No comments posted so far..." ; ?>
                    </p>
                <?php } ?>
                <?php if ( !empty($comment) ) { ?>
                    <p>
                        <small>
                            <?= $comment->comment_email ; ?><br>
                            <em>
                                <?= date( 'F j, Y @ g.ia', strtotime($comment->last_updated) ) ; ?>
                            </em>
                        </small>
                    </p>
                <?php } ?>
            </div>
        </div>
    </div>
</div>       