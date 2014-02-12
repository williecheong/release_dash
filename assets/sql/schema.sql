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
    `query_bz` text,
    `colour` varchar(255),
    UNIQUE (`group_id`, `tag`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `rule` (
    `id` int(11) not null auto_increment,
    `group_id` int(11) not null,
    `js_function` text,
    UNIQUE (`group_id`),
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
('1_2',  'Firefox OS 1.2',            '3'),
('1_3',  'Firefox OS 1.3',            '3'),
('1_4',  'Firefox OS 1.4',            '3');

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
('tracked_vs_fixed', 'Tracked vs Fixed', 'product', '1', '1', '0'),
('unresolved', 'Unresolved', 'product', '1', '1', '0'),
('fixed_on_mc', 'Bugs Fixed on MC', 'product', '1', '0', '1');

INSERT INTO `query` (`tag`, `title`, `group_id`, `colour`, `query_qb`, `query_bz`) VALUES
('tracking_firefox', '# Bugs tracking <version_title>', '1', 'rgb(194, 127, 127)', 
    '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox<version_tag>":"+"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":<birthday>,"max":<timestamp>,"interval":"day"}}]}',
    'https://bugzilla.mozilla.org/buglist.cgi?f1=cf_tracking_firefox<version_tag>&list_id=9418681&o1=equals&query_format=advanced&v1=%2B' ),
('fixed_firefox', '# Fixed Bugs tracking <version_title>', '1', 'rgb(108, 10, 238)', 
    '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox<version_tag>":"+"}},{"term":{"cf_status_firefox<version_tag>":"fixed"}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":<birthday>,"max":<timestamp>,"interval":"day"}}]}',
    'https://bugzilla.mozilla.org/buglist.cgi?f1=cf_tracking_firefox<version_tag>&list_id=9418686&o1=equals&o2=equals&query_format=advanced&f2=cf_status_firefox<version_tag>&v1=%2B&v2=fixed' ),
('unresolved_firefox', '# Unresolved Bugs tracking <version_title>', '2', 'rgb(51, 51, 51)', 
    '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"term":{"cf_tracking_firefox29":"+"}},{"or":[{"missing":{"field":"cf_status_firefox<version_tag>"}},{"not":{"terms":{"cf_status_firefox<version_tag>":["wontfix","fixed","unaffected","verified","disabled","verified disabled"]}}}]}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":<birthday>,"max":<timestamp>,"interval":"day"}}]}',
    'https://bugzilla.mozilla.org/buglist.cgi?o5=notequals&v11=unaffected&j10=OR&o14=notequals&f13=OP&o2=equals&j16=OR&v5=wontfix&f12=CP&j4=OR&f14=cf_status_firefox<version_tag>&o17=notequals&o20=notequals&v2=%2B&f21=CP&known_name=Tracking<version_tag>%2B&f10=OP&f19=OP&f29=CP&f1=OP&f20=cf_status_firefox<version_tag>&j13=OR&f8=cf_status_firefox<version_tag>&f0=OP&j19=OR&o11=notequals&f18=CP&columnlist=bug_severity,priority,op_sys,assigned_to,bug_status,resolution,short_desc,changeddate,cf_tracking_firefox17,cf_tracking_firefox18,cf_status_firefox17,cf_status_firefox18&f15=CP&query_based_on=Tracking<version_tag>%2B&f9=CP&j7=OR&v20=verified%20disabled&f4=OP&query_format=advanced&j1=OR&v17=disabled&f3=CP&f2=cf_tracking_firefox<version_tag>&f11=cf_status_firefox<version_tag>&f5=cf_status_firefox<version_tag>&f17=cf_status_firefox<version_tag>&v8=fixed&v14=verified&f6=CP&f7=OP&o8=notequals&f16=OP&list_id=9407229' ),
('fixed_on_mc', '# Bugs fixed on MC', '3', 'rgb(51, 51, 51)', 
    '{"from":"public_bugs","select":{"name":"num","value":"bug_id","aggregate":"count"},"esfilter":{"and":[{"terms":{"bug_status":["resolved","verified","closed"]}},{"terms":{"product":["Core","Firefox","Firefox for Android","Toolkit"]}},{"terms":{"target_milestone":["mozilla<version_tag>","Firefox <version_tag>"]}}]},"edges":[{"range":{"min":"modified_ts","max":"expires_on"},"domain":{"type":"date","min":<birthday>,"max":<timestamp>,"interval":"day"}}]}',
    'https://bugzilla.mozilla.org/buglist.cgi?bug_status=RESOLVED&bug_status=VERIFIED&bug_status=CLOSED&f1=target_milestone&f2=target_milestone&j_top=OR&list_id=6176390&o1=equals&o2=equals&product=Core&product=Firefox&product=Firefox%20for%20Android&product=Toolkit&query_format=advanced&v1=mozilla<version_tag>&v2=Firefox%20<version_tag>&order=bug_id&limit=0' );





