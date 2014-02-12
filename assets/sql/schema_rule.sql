CREATE TABLE `rule` (
    `id` int(11) not null auto_increment,
    `group_id` int(11) not null,
    `js_function` text,
    UNIQUE (`group_id`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;