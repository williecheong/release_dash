CREATE TABLE `product` (
    `id` int(11) not null auto_increment,
    `name` varchar(255) not null,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE `branch` (
    `id` int(11) not null,
    `product_id` int(11) not null,
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
    `branch_id` int(11) not null,
    `name` varchar(255) not null,
    `query_string_qb` text,
    `deprecate_on` timestamp,
    `is_plot` tinyint(4) not null default '0',
    `is_number` tinyint(4) not null default '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

INSERT INTO `product` (`name`) VALUES 
('desktop'),
('fennec'),
('b2g');