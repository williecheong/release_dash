CREATE TABLE `product` (
    `id` int(11) not null auto_increment,
    `name` varchar(255) not null,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `branch` (
    `id` int(11) not null,
    `nightly` timestamp,
    `aurora` timestamp,
    `beta` timestamp,
    `release` timestamp,
    `b2g_functional_complete` timestamp,
    `b2g_code_freeze` timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `query` (
    `id` int(11) not null auto_increment,
    `name` varchar(255) not null,
    `query_string` text,
    `is_plot` tinyint(4) not null default '0',
    `is_number` tinyint(4) not null default '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `product_query_defaults` (
    `product_id` int(11) not null,
    `query_id` int(11) not null,
    PRIMARY KEY (`product_id`,`query_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `branch_query_runners` (
    `branch_id` int(11) not null,
    `query_id` int(11) not null,
    `deprecate_on` timestamp,
    PRIMARY KEY (`branch_id`,`query_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;


INSERT INTO `product` (`name`) VALUES 
('desktop'),
('fennec'),
('b2g');