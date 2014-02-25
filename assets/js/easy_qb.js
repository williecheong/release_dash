
$('input.datepicker').datepicker({
    'altFormat' : "yy-dd-mm"
});

var newQueryInputCounter = 0;

$('div.query-inputs').append( templateQueryInput( newQueryInputCounter++ ) );
$('.btn#remove-query-input').click(function(){
    $(this).closest('div.row.query-input').remove();
});

$('.btn#add-query-input').click(function(){
    $('div.query-inputs').append( templateQueryInput( newQueryInputCounter++ ) );
    $('.btn#remove-query-input').click(function(){
        $(this).closest('div.row.query-input').remove();
    });
});

$('.btn#query-compile').click(function(){
    $('textarea.query-output').append('Beep beep. Qb query magic.\n');
});

function templateQueryInput( number ) {
    var html = '<div class="row query-input" id="query-input-'+number+'">'+
'                    <div class="col-md-4">'+
'                        <select class="form-control">'+
'                            <option value="">---</option>'+
'                            <option value="alias">Alias</option>'+
'                            <option value="assigned_to">Assignee</option>'+
'                            <option value="attachments.submitter">Attachment creator</option>'+
'                            <option value="attach_data.thedata">Attachment data</option>'+
'                            <option value="attachments.description">Attachment description</option>'+
'                            <option value="attachments.filename">Attachment filename</option>'+
'                            <option value="attachments.isobsolete">Attachment is obsolete</option>'+
'                            <option value="attachments.ispatch">Attachment is patch</option>'+
'                            <option value="attachments.isprivate">Attachment is private</option>'+
'                            <option value="attachments.mimetype">Attachment mime type</option>'+
'                            <option value="cf_blocking_b2g">blocking-b2g</option>'+
'                            <option value="cf_blocking_basecamp">blocking-basecamp</option>'+
'                            <option value="cf_blocking_fennec10">blocking-fennec1.0</option>'+
'                            <option value="cf_blocking_fx">blocking-fx</option>'+
'                            <option value="cf_blocking_kilimanjaro">blocking-kilimanjaro</option>'+
'                            <option value="cf_blocking_191">blocking1.9.1</option>'+
'                            <option value="cf_blocking_192">blocking1.9.2</option>'+
'                            <option value="cf_blocking_20">blocking2.0</option>'+
'                            <option value="blocked">Blocks</option>'+
'                            <option value="bug_id">Bug ID</option>'+
'                            <option value="cc">CC</option>'+
'                            <option value="cclist_accessible">CC list accessible</option>'+
'                            <option value="classification">Classification</option>'+
'                            <option value="cf_colo_site">colo-trip</option>'+
'                            <option value="longdesc">Comment</option>'+
'                            <option value="longdescs.isprivate">Comment is private</option>'+
'                            <option value="comment_tag">Comment Tag</option>'+
'                            <option value="commenter">Commenter</option>'+
'                            <option value="component">Component</option>'+
'                            <option value="content">Content</option>'+
'                            <option value="cf_crash_signature">Crash Signature</option>'+
'                            <option value="creation_ts">Creation date</option>'+
'                            <option value="days_elapsed">Days since bug changed</option>'+
'                            <option value="dependson">Depends on</option>'+
'                            <option value="cf_due_date">Due Date</option>'+
'                            <option value="everconfirmed">Ever confirmed</option>'+
'                            <option value="requestees.login_name">Flag Requestee</option>'+
'                            <option value="setters.login_name">Flag Setter</option>'+
'                            <option value="flagtypes.name">Flags</option>'+
'                            <option value="bug_group">Group</option>'+
'                            <option value="keywords">Keywords</option>'+
'                            <option value="delta_ts">Changed</option>'+
'                            <option value="cf_last_resolved">Last Resolved</option>'+
'                            <option value="cf_locale">Locale</option>'+
'                            <option value="cf_machine_state">Machine State</option>'+
'                            <option value="cf_mozilla_project">Mozilla Project</option>'+
'                            <option value="longdescs.count">Number of Comments</option>'+
'                            <option value="cf_office">Office/Space</option>'+
'                            <option value="op_sys">OS</option>'+
'                            <option value="rep_platform">Hardware</option>'+
'                            <option value="priority">Priority</option>'+
'                            <option value="product">Product</option>'+
'                            <option value="qa_contact">QA Contact</option>'+
'                            <option value="cf_tracking_relnote_b2g">relnote-b2g</option>'+
'                            <option value="cf_tracking_firefox_relnote">relnote-firefox</option>'+
'                            <option value="reporter">Reporter</option>'+
'                            <option value="reporter_accessible">Reporter accessible</option>'+
'                            <option value="resolution">Resolution</option>'+
'                            <option value="restrict_comments">Restrict Comments</option>'+
'                            <option value="see_also">See Also</option>'+
'                            <option value="bug_severity">Severity</option>'+
'                            <option value="bug_status">Status</option>'+
'                            <option value="status_whiteboard">Whiteboard</option>'+
'                            <option value="cf_status_b2g_1_1_hd">status-b2g-v1.1hd</option>'+
'                            <option value="cf_status_b2g_1_2">status-b2g-v1.2</option>'+
'                            <option value="cf_status_b2g_1_3">status-b2g-v1.3</option>'+
'                            <option value="cf_status_b2g_1_3t">status-b2g-v1.3T</option>'+
'                            <option value="cf_status_b2g_1_4">status-b2g-v1.4</option>'+
'                            <option value="cf_status_b2g18">status-b2g18</option>'+
'                            <option value="cf_status_b2g18_1_0_0">status-b2g18-v1.0.0</option>'+
'                            <option value="cf_status_b2g18_1_0_1">status-b2g18-v1.0.1</option>'+
'                            <option value="cf_status_esr10">status-firefox-esr10</option>'+
'                            <option value="cf_status_firefox_esr17">status-firefox-esr17</option>'+
'                            <option value="cf_status_firefox_esr24">status-firefox-esr24</option>'+
'                            <option value="cf_status_firefox10">status-firefox10</option>'+
'                            <option value="cf_status_firefox11">status-firefox11</option>'+
'                            <option value="cf_status_firefox12">status-firefox12</option>'+
'                            <option value="cf_status_firefox13">status-firefox13</option>'+
'                            <option value="cf_status_firefox14">status-firefox14</option>'+
'                            <option value="cf_status_firefox15">status-firefox15</option>'+
'                            <option value="cf_status_firefox16">status-firefox16</option>'+
'                            <option value="cf_status_firefox17">status-firefox17</option>'+
'                            <option value="cf_status_firefox18">status-firefox18</option>'+
'                            <option value="cf_status_firefox19">status-firefox19</option>'+
'                            <option value="cf_status_firefox20">status-firefox20</option>'+
'                            <option value="cf_status_firefox21">status-firefox21</option>'+
'                            <option value="cf_status_firefox22">status-firefox22</option>'+
'                            <option value="cf_status_firefox23">status-firefox23</option>'+
'                            <option value="cf_status_firefox24">status-firefox24</option>'+
'                            <option value="cf_status_firefox25">status-firefox25</option>'+
'                            <option value="cf_status_firefox26">status-firefox26</option>'+
'                            <option value="cf_status_firefox27">status-firefox27</option>'+
'                            <option value="cf_status_firefox28">status-firefox28</option>'+
'                            <option value="cf_status_firefox29">status-firefox29</option>'+
'                            <option value="cf_status_firefox30">status-firefox30</option>'+
'                            <option value="cf_status_firefox5">status-firefox5</option>'+
'                            <option value="cf_status_firefox6">status-firefox6</option>'+
'                            <option value="cf_status_firefox7">status-firefox7</option>'+
'                            <option value="cf_status_firefox8">status-firefox8</option>'+
'                            <option value="cf_status_firefox9">status-firefox9</option>'+
'                            <option value="cf_status_191">status1.9.1</option>'+
'                            <option value="cf_status_192">status1.9.2</option>'+
'                            <option value="cf_status_20">status2.0</option>'+
'                            <option value="short_desc">Summary</option>'+
'                            <option value="tag">Tags</option>'+
'                            <option value="target_milestone">Target Milestone</option>'+
'                            <option value="owner_idle_time">Time Since Assignee Touched</option>'+
'                            <option value="cf_tracking_b2g_v1_2">tracking-b2g-v1.2</option>'+
'                            <option value="cf_tracking_b2g_v1_3">tracking-b2g-v1.3</option>'+
'                            <option value="cf_tracking_b2g18">tracking-b2g18</option>'+
'                            <option value="cf_blocking_fennec">tracking-fennec</option>'+
'                            <option value="cf_tracking_esr10">tracking-firefox-esr10</option>'+
'                            <option value="cf_tracking_firefox_esr17">tracking-firefox-esr17</option>'+
'                            <option value="cf_tracking_firefox_esr24">tracking-firefox-esr24</option>'+
'                            <option value="cf_tracking_firefox10">tracking-firefox10</option>'+
'                            <option value="cf_tracking_firefox11">tracking-firefox11</option>'+
'                            <option value="cf_tracking_firefox12">tracking-firefox12</option>'+
'                            <option value="cf_tracking_firefox13">tracking-firefox13</option>'+
'                            <option value="cf_tracking_firefox14">tracking-firefox14</option>'+
'                            <option value="cf_tracking_firefox15">tracking-firefox15</option>'+
'                            <option value="cf_tracking_firefox16">tracking-firefox16</option>'+
'                            <option value="cf_tracking_firefox17">tracking-firefox17</option>'+
'                            <option value="cf_tracking_firefox18">tracking-firefox18</option>'+
'                            <option value="cf_tracking_firefox19">tracking-firefox19</option>'+
'                            <option value="cf_tracking_firefox20">tracking-firefox20</option>'+
'                            <option value="cf_tracking_firefox21">tracking-firefox21</option>'+
'                            <option value="cf_tracking_firefox22">tracking-firefox22</option>'+
'                            <option value="cf_tracking_firefox23">tracking-firefox23</option>'+
'                            <option value="cf_tracking_firefox24">tracking-firefox24</option>'+
'                            <option value="cf_tracking_firefox25">tracking-firefox25</option>'+
'                            <option value="cf_tracking_firefox26">tracking-firefox26</option>'+
'                            <option value="cf_tracking_firefox27">tracking-firefox27</option>'+
'                            <option value="cf_tracking_firefox28">tracking-firefox28</option>'+
'                            <option value="cf_tracking_firefox29">tracking-firefox29</option>'+
'                            <option value="cf_tracking_firefox30">tracking-firefox30</option>'+
'                            <option value="cf_tracking_firefox5">tracking-firefox5</option>'+
'                            <option value="cf_tracking_firefox6">tracking-firefox6</option>'+
'                            <option value="cf_tracking_firefox7">tracking-firefox7</option>'+
'                            <option value="cf_tracking_firefox8">tracking-firefox8</option>'+
'                            <option value="cf_tracking_firefox9">tracking-firefox9</option>'+
'                            <option value="bug_file_loc">URL</option>'+
'                            <option value="cf_user_story">User Story</option>'+
'                            <option value="version">Version</option>'+
'                            <option value="votes">Votes</option>'+
'                        </select>'+
'                    </div>'+
'                    <div class="col-md-4">'+
'                        <select class="form-control">'+
'                            <option value="=">is equal to</option>'+
'                            <option value="!=">is not equal to</option>'+
'                        </select>'+
'                    </div>'+
'                    <div class="col-lg-4">'+
'                            <div class="input-group">'+
'                                <input type="text" class="form-control" placeholder="field value">'+
'                                <span class="input-group-btn">'+
'                                    <button type="button" class="btn btn-danger" id="remove-query-input">'+
'                                        <i class="fa fa-times"></i>'+
'                                    </button>'+
'                                </span>'+
'                            </div>'+
'                        </div>'+
'                </div>';
    return html;
}