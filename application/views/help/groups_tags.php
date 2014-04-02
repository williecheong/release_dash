<div class="row">
    <div class="col-sm-12">
        <p>
            Soft tags are used in fields of queries in default groups and also queries with reference lines. It allows the RRDashboard to flexibly fit a single query into the context of multiple different versions. Below is a reference table containing the various soft tags that can be used in query fields of the RRDashboard.
        </p>
    </div>
    <div class="row col-sm-12">
        <div class="col-sm-3">
            <strong><?= htmlspecialchars('<version_tag>'); ?></strong>
            <p>
                The version number.<br>
                e.g. 29, 1_4, etc
            </p>
        </div>
        <div class="col-sm-3">
            <strong><?= htmlspecialchars('<version_title>'); ?></strong>
            <p>
                The version's readable name. e.g. Firefox 29 
            </p>
        </div>
        <div class="col-sm-3">
            <strong><?= htmlspecialchars('<version_tag-[1-9]>'); ?></strong>
            <p>
                Relatively prior version
            </p>
        </div>
        <div class="col-sm-3">
            <strong><?= htmlspecialchars('<version_tag+[1-9]>'); ?></strong>
            <p>
                Relatively later version.
            </p>
        </div>
    </div>
    <div class="row col-sm-12">
        <div class="col-sm-3">
            <strong><?= htmlspecialchars('<version_tag:.>'); ?></strong>
            <p>
                For B2G, replaces default <code>_</code> with <code>.</code>
            </p>
        </div>
        <div class="col-sm-3">
            <strong><?= htmlspecialchars('<version_tag:->'); ?></strong>
            <p>
                For B2G, replaces default <code>_</code> with <code>-</code>
            </p>
        </div>
        <div class="col-sm-3">
            <strong><?= htmlspecialchars('<version_title:.>'); ?></strong>
            <p>
                For B2G, replaces default <code>_</code> with <code>.</code>
            </p>
        </div>
        <div class="col-sm-3">
            <strong><?= htmlspecialchars('<version_title:->'); ?></strong>
            <p>
                For B2G, replaces default <code>_</code> with <code>-</code>
            </p>
        </div>
    </div>
    <div class="row col-sm-12">
        <div class="col-sm-3">
            <strong><?= htmlspecialchars('@birthday'); ?></strong>
            <p>
                Date when the version first entered Central (ms since epoch)
            </p>
        </div>
        <div class="col-sm-3">
            <strong><?= htmlspecialchars('@timestamp'); ?></strong>
            <p>
                Date when the version will move into the next channel (ms since epoch)
            </p>
        </div>
    </div>

</div>