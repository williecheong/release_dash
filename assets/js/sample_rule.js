
    function rule_group_<group_id>() {
        var main = coreData.query_groups['<group_tag>'].queries['<query_tag;id=1>'].es_data;

        if ( main ) {
            return 'green';
        }
    }