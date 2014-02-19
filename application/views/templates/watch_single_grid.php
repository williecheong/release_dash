<li class="group<?= ($group['is_default'] == 1) ? ' is-default' : ''; ?>" id="g<?= $group_id; ?>" data-row="1" data-col="1" data-sizex="<?= ($type == 'make_plot')? 3 : min(2, count($group['queries'])); ?>" data-sizey="<?= ($type == 'make_plot')? 2 : 1; ?>">
    <div class="top-menu">
        <?php if ( $group['is_default'] == 0 ) { ?>
            <button class="btn btn-xs pull-right" id="edit-old-group" data-group-id="<?= $group_id; ?>">
                <i class="fa fa-pencil fa-lg"></i>
            </button>
        <?php } ?>
        <button class="btn btn-xs pull-right" id="get-rule-boilerplate" data-group-id="<?= $group_id; ?>">
            <i class="fa fa-tachometer fa-lg"></i>
        </button>
        <?php foreach ( $group['queries'] as $query ) { ?>
            <?php if ( !empty($query['bz_query']) ) { ?>
                <a class="btn btn-xs pull-right" href="<?= $query['bz_query']; ?>" style="color:<?= $query['colour']; ?>;">
                    <i class="fa fa-bug fa-lg"></i>
                </a>
            <?php } ?>
        <?php } ?>
    </div>

    <?php if ( $type == 'make_plot' ) { ?>
        <div class="group-graph" id="g<?= $group_id; ?>">
            <div class="y-axis" id="g<?= $group_id; ?>"></div>
            <div class="plot" id="g<?= $group_id; ?>"></div>
        </div>
    <?php } else if ( $type == 'make_number' ) { ?> 
        <div class="group-number text-center" id="g<?= $group_id; ?>">
            <?php foreach( $group['queries'] as $query_id => $query ) { ?>
                <div class="text-center" id="q<?= $query_id; ?>" title="<?= $query['title'] ?>" style="width:<?= 90 / count($group['queries']); ?>%; display:inline-block;"></div>
            <?php } ?>
        </div>
    <?php } ?>
    <div class="text-center group-title" id="g<?= $group_id; ?>">
        <img class="load-status" src="/assets/img/mozchomp.gif">
        <h4><?= $group['title']; ?></h4>
    </div>
</li>