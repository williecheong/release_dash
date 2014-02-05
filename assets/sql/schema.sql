CREATE TABLE `product` (
    `id` int(11) not null auto_increment,
    `tag` varchar(255) not null,   
    `title` varchar(255) not null,
    UNIQUE (`tag`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `version` (
    `id` int(11) not null auto_increment,
    `tag` varchar(255) not null,
    `title` varchar(255) not null,
    `product_id` int(11) not null,
    `central` timestamp,
    `aurora` timestamp,
    `beta` timestamp,
    `release` timestamp,
    `deprecate` timestamp,
    `b2g_functional_complete` timestamp,
    `b2g_code_freeze` timestamp,
    UNIQUE (`product_id`, `tag`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `group` (
    `id` int(11) not null auto_increment,
    `tag` varchar(255) not null,
    `title` varchar(255) not null,
    `version_id` int(11) not null,
    `is_plot` tinyint(4) not null default '0',
    `is_number` tinyint(4) not null default '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `query` (
    `id` int(11) not null auto_increment,
    `tag` varchar(255) not null,
    `title` varchar(255) not null,
    `group_id` int(11) not null,
    `query_qb` text,
    `plot_colour` varchar(255),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `comment` (
    `id` int(11) not null auto_increment,
    `entity` varchar(255) not null,
    `entity_id` int(11) not null,
    `comment` text,
    `created_on` timestamp default CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

INSERT INTO `product` (`tag`, `title`) VALUES 
('desktop', 'Firefox for Desktop'),
('fennec', 'Firefox for Android'),
('b2g', 'Firefox OS');

INSERT INTO `version` (`tag`, `title`, `product_id`, `central`, `aurora`, `beta`, `release`, `deprecate`, `b2g_functional_complete`, `b2g_code_freeze`) VALUES
('v10', 'Firefox 10', '1', '2011-09-27 00:00:00', '2011-11-08 00:00:00', '2011-12-20 00:00:00', '2012-01-31 00:00:00', '2012-03-13 00:00:00', '', ''),
('v11', 'Firefox 11', '1', '2011-11-08 00:00:00', '2011-12-20 00:00:00', '2012-01-31 00:00:00', '2012-03-13 00:00:00', '2012-04-24 00:00:00', '', ''),
('v12', 'Firefox 12', '1', '2011-12-20 00:00:00', '2012-01-31 00:00:00', '2012-03-13 00:00:00', '2012-04-24 00:00:00', '2012-06-05 00:00:00', '', ''),
('v13', 'Firefox 13', '1', '2012-01-31 00:00:00', '2012-03-13 00:00:00', '2012-04-24 00:00:00', '2012-06-05 00:00:00', '2012-07-17 00:00:00', '', ''),
('v14', 'Firefox 14', '1', '2012-03-13 00:00:00', '2012-04-24 00:00:00', '2012-06-05 00:00:00', '2012-07-17 00:00:00', '2012-08-28 00:00:00', '', ''),
('v15', 'Firefox 15', '1', '2012-04-24 00:00:00', '2012-06-05 00:00:00', '2012-07-17 00:00:00', '2012-08-28 00:00:00', '2012-10-09 00:00:00', '', ''),
('v16', 'Firefox 16', '1', '2012-06-05 00:00:00', '2012-07-17 00:00:00', '2012-08-28 00:00:00', '2012-10-09 00:00:00', '2012-11-20 00:00:00', '', ''),
('v17', 'Firefox 17', '1', '2012-07-17 00:00:00', '2012-08-28 00:00:00', '2012-10-09 00:00:00', '2012-11-20 00:00:00', '2013-01-08 00:00:00', '', ''),
('v18', 'Firefox 18', '1', '2012-08-28 00:00:00', '2012-10-09 00:00:00', '2012-11-20 00:00:00', '2013-01-08 00:00:00', '2013-02-19 00:00:00', '', ''),
('v19', 'Firefox 19', '1', '2012-10-09 00:00:00', '2012-11-20 00:00:00', '2013-01-08 00:00:00', '2013-02-19 00:00:00', '2013-04-02 00:00:00', '', ''),
('v20', 'Firefox 20', '1', '2012-11-20 00:00:00', '2013-01-08 00:00:00', '2013-02-19 00:00:00', '2013-04-02 00:00:00', '2013-05-14 00:00:00', '', ''),
('v21', 'Firefox 21', '1', '2013-01-08 00:00:00', '2013-02-19 00:00:00', '2013-04-02 00:00:00', '2013-05-14 00:00:00', '2013-06-25 00:00:00', '', ''),
('v22', 'Firefox 22', '1', '2013-02-19 00:00:00', '2013-04-02 00:00:00', '2013-05-14 00:00:00', '2013-06-25 00:00:00', '2013-08-06 00:00:00', '', ''),
('v23', 'Firefox 23', '1', '2013-04-02 00:00:00', '2013-05-14 00:00:00', '2013-06-25 00:00:00', '2013-08-06 00:00:00', '2013-09-17 00:00:00', '', ''),
('v24', 'Firefox 24', '1', '2013-05-14 00:00:00', '2013-06-25 00:00:00', '2013-08-06 00:00:00', '2013-09-17 00:00:00', '2013-10-29 00:00:00', '', ''),
('v25', 'Firefox 25', '1', '2013-06-25 00:00:00', '2013-08-06 00:00:00', '2013-09-17 00:00:00', '2013-10-29 00:00:00', '2013-12-10 00:00:00', '', ''),
('v26', 'Firefox 26', '1', '2013-08-06 00:00:00', '2013-09-17 00:00:00', '2013-10-29 00:00:00', '2013-12-10 00:00:00', '2014-02-04 00:00:00', '', ''),
('v27', 'Firefox 27', '1', '2013-09-17 00:00:00', '2013-10-29 00:00:00', '2013-12-10 00:00:00', '2014-02-04 00:00:00', '2014-03-18 00:00:00', '', ''),
('v28', 'Firefox 28', '1', '2013-10-29 00:00:00', '2013-12-10 00:00:00', '2014-02-04 00:00:00', '2014-03-18 00:00:00', '2014-04-29 00:00:00', '', ''),
('v29', 'Firefox 29', '1', '2013-12-10 00:00:00', '2014-02-04 00:00:00', '2014-03-18 00:00:00', '2014-04-29 00:00:00', '2014-06-10 00:00:00', '', ''),
('v30', 'Firefox 30', '1', '2014-02-04 00:00:00', '2014-03-18 00:00:00', '2014-04-29 00:00:00', '2014-06-10 00:00:00', '2014-07-22 00:00:00', '', ''),
('v31', 'Firefox 31', '1', '2014-03-18 00:00:00', '2014-04-29 00:00:00', '2014-06-10 00:00:00', '2014-07-22 00:00:00', '2014-09-02 00:00:00', '', ''),
('v32', 'Firefox 32', '1', '2014-04-29 00:00:00', '2014-06-10 00:00:00', '2014-07-22 00:00:00', '2014-09-02 00:00:00', '2014-10-14 00:00:00', '', ''),
('v33', 'Firefox 33', '1', '2014-06-10 00:00:00', '2014-07-22 00:00:00', '2014-09-02 00:00:00', '2014-10-14 00:00:00', '2014-11-25 00:00:00', '', ''),
('v10', 'Firefox for Android 10', '2', '2011-09-27 00:00:00', '2011-11-08 00:00:00', '2011-12-20 00:00:00', '2012-01-31 00:00:00', '2012-03-13 00:00:00', '', ''),
('v11', 'Firefox for Android 11', '2', '2011-11-08 00:00:00', '2011-12-20 00:00:00', '2012-01-31 00:00:00', '2012-03-13 00:00:00', '2012-04-24 00:00:00', '', ''),
('v12', 'Firefox for Android 12', '2', '2011-12-20 00:00:00', '2012-01-31 00:00:00', '2012-03-13 00:00:00', '2012-04-24 00:00:00', '2012-06-05 00:00:00', '', ''),
('v13', 'Firefox for Android 13', '2', '2012-01-31 00:00:00', '2012-03-13 00:00:00', '2012-04-24 00:00:00', '2012-06-05 00:00:00', '2012-07-17 00:00:00', '', ''),
('v14', 'Firefox for Android 14', '2', '2012-03-13 00:00:00', '2012-04-24 00:00:00', '2012-06-05 00:00:00', '2012-07-17 00:00:00', '2012-08-28 00:00:00', '', ''),
('v15', 'Firefox for Android 15', '2', '2012-04-24 00:00:00', '2012-06-05 00:00:00', '2012-07-17 00:00:00', '2012-08-28 00:00:00', '2012-10-09 00:00:00', '', ''),
('v16', 'Firefox for Android 16', '2', '2012-06-05 00:00:00', '2012-07-17 00:00:00', '2012-08-28 00:00:00', '2012-10-09 00:00:00', '2012-11-20 00:00:00', '', ''),
('v17', 'Firefox for Android 17', '2', '2012-07-17 00:00:00', '2012-08-28 00:00:00', '2012-10-09 00:00:00', '2012-11-20 00:00:00', '2013-01-08 00:00:00', '', ''),
('v18', 'Firefox for Android 18', '2', '2012-08-28 00:00:00', '2012-10-09 00:00:00', '2012-11-20 00:00:00', '2013-01-08 00:00:00', '2013-02-19 00:00:00', '', ''),
('v19', 'Firefox for Android 19', '2', '2012-10-09 00:00:00', '2012-11-20 00:00:00', '2013-01-08 00:00:00', '2013-02-19 00:00:00', '2013-04-02 00:00:00', '', ''),
('v20', 'Firefox for Android 20', '2', '2012-11-20 00:00:00', '2013-01-08 00:00:00', '2013-02-19 00:00:00', '2013-04-02 00:00:00', '2013-05-14 00:00:00', '', ''),
('v21', 'Firefox for Android 21', '2', '2013-01-08 00:00:00', '2013-02-19 00:00:00', '2013-04-02 00:00:00', '2013-05-14 00:00:00', '2013-06-25 00:00:00', '', ''),
('v22', 'Firefox for Android 22', '2', '2013-02-19 00:00:00', '2013-04-02 00:00:00', '2013-05-14 00:00:00', '2013-06-25 00:00:00', '2013-08-06 00:00:00', '', ''),
('v23', 'Firefox for Android 23', '2', '2013-04-02 00:00:00', '2013-05-14 00:00:00', '2013-06-25 00:00:00', '2013-08-06 00:00:00', '2013-09-17 00:00:00', '', ''),
('v24', 'Firefox for Android 24', '2', '2013-05-14 00:00:00', '2013-06-25 00:00:00', '2013-08-06 00:00:00', '2013-09-17 00:00:00', '2013-10-29 00:00:00', '', ''),
('v25', 'Firefox for Android 25', '2', '2013-06-25 00:00:00', '2013-08-06 00:00:00', '2013-09-17 00:00:00', '2013-10-29 00:00:00', '2013-12-10 00:00:00', '', ''),
('v26', 'Firefox for Android 26', '2', '2013-08-06 00:00:00', '2013-09-17 00:00:00', '2013-10-29 00:00:00', '2013-12-10 00:00:00', '2014-02-04 00:00:00', '', ''),
('v27', 'Firefox for Android 27', '2', '2013-09-17 00:00:00', '2013-10-29 00:00:00', '2013-12-10 00:00:00', '2014-02-04 00:00:00', '2014-03-18 00:00:00', '', ''),
('v28', 'Firefox for Android 28', '2', '2013-10-29 00:00:00', '2013-12-10 00:00:00', '2014-02-04 00:00:00', '2014-03-18 00:00:00', '2014-04-29 00:00:00', '', ''),
('v29', 'Firefox for Android 29', '2', '2013-12-10 00:00:00', '2014-02-04 00:00:00', '2014-03-18 00:00:00', '2014-04-29 00:00:00', '2014-06-10 00:00:00', '', ''),
('v30', 'Firefox for Android 30', '2', '2014-02-04 00:00:00', '2014-03-18 00:00:00', '2014-04-29 00:00:00', '2014-06-10 00:00:00', '2014-07-22 00:00:00', '', ''),
('v31', 'Firefox for Android 31', '2', '2014-03-18 00:00:00', '2014-04-29 00:00:00', '2014-06-10 00:00:00', '2014-07-22 00:00:00', '2014-09-02 00:00:00', '', ''),
('v32', 'Firefox for Android 32', '2', '2014-04-29 00:00:00', '2014-06-10 00:00:00', '2014-07-22 00:00:00', '2014-09-02 00:00:00', '2014-10-14 00:00:00', '', ''),
('v33', 'Firefox for Android 33', '2', '2014-06-10 00:00:00', '2014-07-22 00:00:00', '2014-09-02 00:00:00', '2014-10-14 00:00:00', '2014-11-25 00:00:00', '', '');

INSERT INTO `group` (`tag`, `title`, `version_id`, `is_plot`, `is_number`) VALUES
('tracking_desktop26', 'Bugs Tracking Firefox 26', '17', '1', '1'),
('tracking_desktop27', 'Bugs Tracking Firefox 27', '18', '1', '1'),
('tracking_desktop28', 'Bugs Tracking Firefox 28', '19', '1', '1'),
('tracking_desktop29', 'Bugs Tracking Firefox 29', '20', '1', '1'),
('tracking_desktop30', 'Bugs Tracking Firefox 30', '21', '1', '1');

INSERT INTO `query` (`tag`, `title`, `group_id`, `query_qb`) VALUES
('tracking_desktop26', '# Bugs Tracking Firefox 26', '1', '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox26":"+"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":1375747200000,"max":<timestamp>,"interval":"day"}}]}'),
('tracking_desktop27', '# Bugs Tracking Firefox 27', '2', '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox27":"+"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":1379376000000,"max":<timestamp>,"interval":"day"}}]}'),
('tracking_desktop28', '# Bugs Tracking Firefox 28', '3', '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox28":"+"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":1383004800000,"max":<timestamp>,"interval":"day"}}]}'),
('tracking_desktop29', '# Bugs Tracking Firefox 29', '4', '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox29":"+"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":1386633600000,"max":<timestamp>,"interval":"day"}}]}'),
('tracking_desktop30', '# Bugs Tracking Firefox 30', '5', '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox30":"+"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":1391472000000,"max":<timestamp>,"interval":"day"}}]}'),
('wontfix_desktop27', '# wontfix Bugs Tracking Firefox 27', '2', '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox27":"+"}},{"term":{"cf_status_firefox27":"wontfix"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":1379376000000,"max":<timestamp>,"interval":"day"}}]}'),
('wontfix_desktop28', '# wontfix Bugs Tracking Firefox 28', '3', '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox28":"+"}},{"term":{"cf_status_firefox28":"wontfix"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":1383004800000,"max":<timestamp>,"interval":"day"}}]}');










