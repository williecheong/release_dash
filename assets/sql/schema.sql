CREATE TABLE IF NOT EXISTS `administrator` (
    `id` int(11) not null auto_increment,
    `email` varchar(255) not null,
    `last_updated` timestamp default current_timestamp on update current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `product` (
    `id` int(11) not null auto_increment,
    `tag` varchar(255) not null,   
    `title` varchar(255) not null,
    `components` text,
    `last_updated` timestamp default current_timestamp on update current_timestamp,
    UNIQUE (`tag`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `version` (
    `id` int(11) not null auto_increment,
    `tag` varchar(255) not null,
    `title` varchar(255) not null,
    `product_id` int(11) not null,
    `last_updated` timestamp default current_timestamp on update current_timestamp,
    UNIQUE (`product_id`, `tag`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `channel` (
    `id` int(11) not null auto_increment,
    `tag` varchar(255) not null,
    `title` varchar(255) not null,
    `product_id` int(11) not null,
    `next_channel` int(11) not null default '0',
    `is_first` tinyint(4) not null default '0',
    `last_updated` timestamp default current_timestamp on update current_timestamp,
    UNIQUE (`product_id`, `tag`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `cycle` (
    `id` int(11) not null auto_increment,
    `start` datetime not null,   
    `end` datetime not null,
    `last_updated` timestamp default current_timestamp on update current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `version_channel_cycle` (
    `id` int(11) not null auto_increment,
    `version_id` int(11) not null,
    `channel_id` int(11) not null,
    `cycle_id` int(11) not null,
    `last_updated` timestamp default current_timestamp on update current_timestamp,
    UNIQUE (`version_id`, `channel_id`, `cycle_id`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `group` (
    `id` int(11) not null auto_increment,
    `title` varchar(255) not null,
    `entity` varchar(255) not null,
    `entity_id` int(11) not null,
    `is_plot` tinyint(4) not null default '0',
    `is_number` tinyint(4) not null default '0',
    `last_updated` timestamp default current_timestamp on update current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `query` (
    `id` int(11) not null auto_increment,
    `title` varchar(255) not null,
    `group_id` int(11) not null,
    `query_qb` text,
    `query_bz` text,
    `references` varchar(255),
    `colour` varchar(255),
    `last_updated` timestamp default current_timestamp on update current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `score` (
    `id` int(11) not null auto_increment,
    `version_id` int(11) not null,
    `score_colour` varchar(255),
    `last_updated` timestamp default current_timestamp on update current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `comment` (
    `id` int(11) not null auto_increment,
    `version_id` int(11) not null,
    `comment_email` varchar(255),
    `comment_message` text,
    `last_updated` timestamp default current_timestamp on update current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `cache_es_data` (
    `id` int(11) not null auto_increment,
    `version_id` int(11) not null,
    `query_id` int(11) not null,
    `es_data` text,
    `last_updated` timestamp default current_timestamp on update current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

