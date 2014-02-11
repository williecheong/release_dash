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
    UNIQUE (`product_id`, `tag`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `channel` (
    `id` int(11) not null auto_increment,
    `tag` varchar(255) not null,
    `title` varchar(255) not null,
    `product_id` int(11) not null,
    UNIQUE (`product_id`, `tag`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `cycle` (
    `id` int(11) not null auto_increment,
    `start` timestamp not null,   
    `end` timestamp not null,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `version_channel_cycle` (
    `id` int(11) not null auto_increment,
    `version_id` int(11) not null,
    `channel_id` int(11) not null,
    `cycle_id` int(11) not null,
    UNIQUE (`version_id`, `channel_id`, `cycle_id`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `group` (
    `id` int(11) not null auto_increment,
    `tag` varchar(255) not null,
    `title` varchar(255) not null,
    `entity` varchar(255) not null,
    `entity_id` int(11) not null,
    `is_plot` tinyint(4) not null default '0',
    `is_number` tinyint(4) not null default '0',
    UNIQUE (`entity`, `entity_id`, `tag`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `query` (
    `id` int(11) not null auto_increment,
    `tag` varchar(255) not null,
    `title` varchar(255) not null,
    `group_id` int(11) not null,
    `query_qb` text,
    `colour` varchar(255),
    UNIQUE (`group_id`, `tag`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;



INSERT INTO `product` (`tag`, `title`) VALUES 
('firefox', 'Firefox for Desktop'),
('fennec', 'Firefox for Android'),
('b2g', 'Firefox OS');

INSERT INTO `version` (`tag`, `title`, `product_id`) VALUES
('25',   'Firefox 25',               '1'),
('26',   'Firefox 26',               '1'),
('27',   'Firefox 27',               '1'),
('28',   'Firefox 28',               '1'),
('29',   'Firefox 29',               '1'),
('30',   'Firefox 30',               '1'),
('25',   'Firefox for Android 25',   '2'),
('26',   'Firefox for Android 26',   '2'),
('27',   'Firefox for Android 27',   '2'),
('28',   'Firefox for Android 28',   '2'),
('29',   'Firefox for Android 29',   '2'),
('30',   'Firefox for Android 30',   '2'),
('1_2',  'FirefoxOS 1.2',            '3'),
('1_3',  'FirefoxOS 1.3',            '3'),
('1_4',  'FirefoxOS 1.4',            '3');

INSERT INTO `channel` (`tag`, `title`, `product_id`) VALUES
('central',         'Central',          '1'),
('aurora',          'Aurora',           '1'),
('beta',            'Beta',             '1'),
('release',         'Release',          '1'),
('central',         'Central',          '2'),
('aurora',          'Aurora',           '2'),
('beta',            'Beta',             '2'),
('release',         'Release',          '2'),
('development',     'Development',      '3'),
('stabilization',   'Stabilization',    '3');

INSERT INTO `cycle` (`start`, `end`) VALUES
('2013-06-25 00:00:00', '2013-08-06 00:00:00'),
('2013-08-06 00:00:00', '2013-09-17 00:00:00'),
('2013-09-17 00:00:00', '2013-10-29 00:00:00'),
('2013-10-29 00:00:00', '2013-12-10 00:00:00'),
('2013-12-10 00:00:00', '2014-02-04 00:00:00'),
('2014-02-04 00:00:00', '2014-03-18 00:00:00');

INSERT INTO `version_channel_cycle` (`version_id`, `channel_id`, `cycle_id`) VALUES
('1', '1', '1'), ('1', '2', '2'), ('1', '3', '3'), ('1', '4', '4'),
('2', '1', '2'), ('2', '2', '3'), ('2', '3', '4'), ('2', '4', '5'),
('3', '1', '3'), ('3', '2', '4'), ('3', '3', '5'), ('3', '4', '6'),
('4', '1', '4'), ('4', '2', '5'), ('4', '3', '6'),
('5', '1', '5'), ('5', '2', '6'),
('6', '1', '6'),
('7', '5', '1'), ('7', '6', '2'), ('7', '7', '3'), ('7', '8', '4'),
('8', '5', '2'), ('8', '6', '3'), ('8', '7', '4'), ('8', '8', '5'),
('9', '5', '3'), ('9', '6', '4'), ('9', '7', '5'), ('9', '8', '6'),
('10','5', '4'), ('10','6', '5'), ('10','7', '6'),
('11','5', '5'), ('11','6', '6'),
('12','5', '6'),
('13','9', '2'), ('13','9', '3'), ('13','10','4'), ('13','10','5'),
('14','9', '4'), ('14','9', '5'), ('14','10','6'),
('15','9', '6');


INSERT INTO `group` (`tag`, `title`, `entity`, `entity_id`, `is_plot`, `is_number`) VALUES
('tracking_firefox25', 'Bugs Tracking Firefox 25', 'version', '1', '1', '1'),
('tracking_firefox26', 'Bugs Tracking Firefox 26', 'version', '2', '1', '1'),
('tracking_firefox27', 'Bugs Tracking Firefox 27', 'version', '3', '1', '1'),
('tracking_firefox28', 'Bugs Tracking Firefox 28', 'version', '4', '1', '1'),
('tracking_firefox29', 'Bugs Tracking Firefox 29', 'version', '5', '1', '1'),
('tracking_firefox30', 'Bugs Tracking Firefox 30', 'version', '6', '1', '1');

INSERT INTO `query` (`tag`, `title`, `group_id`, `query_qb`) VALUES
('tracking_firefox25', '# Bugs Tracking Firefox 25', '1', '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox25":"+"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":<birthday>,"max":<timestamp>,"interval":"day"}}]}'),
('tracking_firefox26', '# Bugs Tracking Firefox 26', '2', '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox26":"+"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":<birthday>,"max":<timestamp>,"interval":"day"}}]}'),
('tracking_firefox27', '# Bugs Tracking Firefox 27', '3', '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox27":"+"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":<birthday>,"max":<timestamp>,"interval":"day"}}]}'),
('tracking_firefox28', '# Bugs Tracking Firefox 28', '4', '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox28":"+"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":<birthday>,"max":<timestamp>,"interval":"day"}}]}'),
('tracking_firefox29', '# Bugs Tracking Firefox 29', '5', '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox29":"+"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":<birthday>,"max":<timestamp>,"interval":"day"}}]}'),
('tracking_firefox30', '# Bugs Tracking Firefox 30', '6', '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox30":"+"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":<birthday>,"max":<timestamp>,"interval":"day"}}]}'),
('fixed_firefox27', '# Fixed Bugs Tracking Firefox 27', '3', '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox27":"+"}},{"term":{"cf_status_firefox27":"fixed"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":<birthday>,"max":<timestamp>,"interval":"day"}}]}'),
('fixed_firefox28', '# Fixed Bugs Tracking Firefox 28', '4', '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox28":"+"}},{"term":{"cf_status_firefox28":"fixed"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":<birthday>,"max":<timestamp>,"interval":"day"}}]}');










