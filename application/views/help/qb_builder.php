<div class="row">
    <div class="col-sm-12">
        <p>
            Accessed through "Qb query builder" in the navigation menu. This tool was designed to help with generating Qb queries through using Bugzilla URLs. <code>Bugzilla URL Parser</code> is insert with a Bugzilla URL containing the search parameters. <code>Query Range</code> specifies the periodic range for which you would like to run the Elastic Search query against. Note that it is recommended for RRDashboard users to leave the periodic range fields empty so that soft tags are used. Finally, select a cluster to pull the data from. 
        </p>
        <p>
            There are some imperfections with the Qb query builder. Depending on the comparison operands being used, some Qb queries may not be formed correctly. Below is a divided list of comparison operands that indicate which ones should or should not be used.
        </p>
    </div>
    <div class="col-sm-4">
        <strong>
            Works well :
        </strong>
        <ul>
            <li>is equal to</li>
            <li>is not equal to</li>
            <li>is equal to any of the strings</li>
            <li>contains the string (exact case)</li>
            <li>is less than</li>
            <li>is less than or equal to</li>
            <li>is greater than</li>
            <li>is greater than or equal to</li>
            <li>is empty</li>
            <li>is not empty</li>
        </ul>
    </div>
    <div class="col-sm-4">
        <strong>
            Should work :
        </strong>
        <ul>
            <li>contains the string</li>
            <li>does not contain the string</li>
            <li>contains any of the strings</li>
            <li>contains all of the strings</li>
            <li>contains none of the strings</li>
            <li>contains any of the words</li>
            <li>contains all of the words</li>
            <li>contains none of the words</li>
        </ul>
    </div>
    <div class="col-sm-4">
        <strong>
            Best to avoid :
        </strong>
        <ul>
            <li>matches regular expression</li>
            <li>does not match regular expression</li>
            <li>changed before</li>
            <li>changed after</li>
            <li>changed from</li>
            <li>changed to</li>
            <li>changed by</li>
            <li>matches</li>
            <li>does not match</li>
        </ul>
    </div>
</div>