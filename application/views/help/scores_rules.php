<div class="row">
    <div class="col-sm-5 pull-left text-center">
        <img class="img-thumbnail" width="100%" src="/assets/img/help/rules_highlighted.png">
    </div>
    <div class="col-sm-7">
        <p>
            Each grid on the version's view is described as a group (of queries). Groups are further explained in the next section. Individual groups represent a unique metric that is monitored for the given version, and may have scripted rules that determine how the metric is faring based on the data available. The results of applying rules on individual metrics are finally aggregated to provide a "Release Readiness score".
        </p>
        <p>
            Group rules are written as Javascript functions and each applies uniquely to a group. At the end of execution, a rule function returns a status color of green, yellow or red for displaying on the group's view. To script a rule for a group, click on the <i class="fa fa-tachometer" title="Tachometer"></i> that appears when the pointer hovers over a group. Copy the template provided into the targetted file directory. Inline comments are included in the template to assist you with scripting the desired logic. After scripting is completed, submit a pull request or contact a person with deployment rights to upload the file into the target directory.
        </p>
    </div>
</div>