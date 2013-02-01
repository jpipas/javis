/*
 Navicat Premium Data Transfer

 Source Server         : Local DEV
 Source Server Type    : MySQL
 Source Server Version : 50166
 Source Host           : localhost
 Source Database       : javiserp

 Target Server Type    : MySQL
 Target Server Version : 50166
 File Encoding         : utf-8

 Date: 02/01/2013 08:36:59 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `ad_size`
-- ----------------------------
DROP TABLE IF EXISTS `ad_size`;
CREATE TABLE `ad_size` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(40) NOT NULL,
  `type_id` int(11) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `size_FI_1` (`type_id`),
  CONSTRAINT `size_FK_1` FOREIGN KEY (`type_id`) REFERENCES `ad_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `ad_size`
-- ----------------------------
BEGIN;
INSERT INTO `ad_size` VALUES ('1', 'Full Color', '1', null), ('2', 'Half Color', '1', null), ('3', 'Full B/W', '1', null), ('4', 'Half B/W', '1', null), ('5', '2/3 Color', '2', null), ('6', 'Full', '3', null), ('7', '1/2H', '3', null), ('8', '1/4H', '3', null), ('9', '1/8', '3', null), ('10', 'Full', '4', null), ('11', '1/2H', '4', null), ('12', '1/4H', '4', null), ('13', '1/8', '4', null), ('14', 'Full', '5', null), ('15', '1/2', '5', null), ('16', '1/2V', '3', null), ('17', '1/4V', '3', null), ('18', '1/2V', '4', null), ('19', '1/4V', '4', null);
COMMIT;

-- ----------------------------
--  Table structure for `ad_type`
-- ----------------------------
DROP TABLE IF EXISTS `ad_type`;
CREATE TABLE `ad_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(30) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `advertisement`
-- ----------------------------
DROP TABLE IF EXISTS `advertisement`;
CREATE TABLE `advertisement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `designer_id` int(11) DEFAULT NULL,
  `salesrep_id` int(11) DEFAULT NULL,
  `ad_type_id` int(11) NOT NULL,
  `ad_size_id` int(11) NOT NULL,
  `notes` text,
  `seasonal_promo` tinyint(4) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `exp_date` date DEFAULT NULL,
  `insert_user_id` int(11) DEFAULT NULL,
  `update_user_id` int(11) DEFAULT NULL,
  `email_client` tinyint(4) DEFAULT '0',
  `email_designer` tinyint(4) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ad_FI_1` (`client_id`),
  KEY `ad_FI_2` (`designer_id`),
  KEY `ad_FI_3` (`salesrep_id`),
  KEY `ad_FI_5` (`ad_type_id`),
  KEY `ad_FI_6` (`ad_size_id`),
  KEY `ad_FI_8` (`insert_user_id`),
  KEY `ad_FI_9` (`update_user_id`),
  CONSTRAINT `ad_FK_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`),
  CONSTRAINT `ad_FK_2` FOREIGN KEY (`designer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `ad_FK_3` FOREIGN KEY (`salesrep_id`) REFERENCES `user` (`id`),
  CONSTRAINT `ad_FK_5` FOREIGN KEY (`ad_type_id`) REFERENCES `ad_type` (`id`),
  CONSTRAINT `ad_FK_6` FOREIGN KEY (`ad_size_id`) REFERENCES `ad_size` (`id`),
  CONSTRAINT `ad_FK_8` FOREIGN KEY (`insert_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `ad_FK_9` FOREIGN KEY (`update_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6503 DEFAULT CHARSET=latin1;
delimiter ;;
CREATE TRIGGER `cre_at` BEFORE INSERT ON `advertisement` FOR EACH ROW set new.created_at = now();
 ;;
delimiter ;


-- ----------------------------
--  Table structure for `advertisement_publication`
-- ----------------------------
DROP TABLE IF EXISTS `advertisement_publication`;
CREATE TABLE `advertisement_publication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `advertisement_id` int(11) NOT NULL,
  `publication_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `advertisement_id` (`advertisement_id`),
  KEY `publication_id` (`publication_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4716 DEFAULT CHARSET=utf8;


-- ----------------------------
--  Table structure for `client`
-- ----------------------------
DROP TABLE IF EXISTS `client`;
CREATE TABLE `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) DEFAULT NULL,
  `address1` varchar(255) DEFAULT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `zip` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `cell` varchar(20) DEFAULT NULL,
  `fax` varchar(30) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `territory_id` int(11) DEFAULT NULL,
  `salesrep_id` int(11) NOT NULL,
  `insert_user_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `client_FI_1` (`state_id`),
  KEY `client_FI_2` (`territory_id`),
  KEY `client_FI_3` (`insert_user_id`),
  CONSTRAINT `client_FK_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`),
  CONSTRAINT `client_FK_2` FOREIGN KEY (`territory_id`) REFERENCES `territory` (`id`),
  CONSTRAINT `client_FK_3` FOREIGN KEY (`insert_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1371 DEFAULT CHARSET=latin1;
delimiter ;;
CREATE TRIGGER `init_created_at` BEFORE INSERT ON `client` FOR EACH ROW set new.created_at = now();
 ;;
delimiter ;


-- ----------------------------
--  Table structure for `contract`
-- ----------------------------
DROP TABLE IF EXISTS `contract`;
CREATE TABLE `contract` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `payment_term_id` int(11) NOT NULL,
  `total_sales` decimal(11,2) DEFAULT NULL,
  `discount` decimal(5,3) DEFAULT NULL,
  `subtotal` decimal(11,2) DEFAULT NULL,
  `design_fee` decimal(11,2) DEFAULT NULL,
  `total_amount` decimal(11,2) DEFAULT NULL,
  `first_months_payment` decimal(11,2) DEFAULT NULL,
  `monthly_payment` decimal(11,2) DEFAULT NULL,
  `sale_date` timestamp NULL DEFAULT NULL,
  `insert_user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contract_FI_1` (`client_id`),
  KEY `contract_FI_2` (`payment_term_id`),
  KEY `contract_FI_3` (`insert_user_id`),
  CONSTRAINT `contract_FK_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`),
  CONSTRAINT `contract_FK_3` FOREIGN KEY (`insert_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2122 DEFAULT CHARSET=latin1;
delimiter ;;
CREATE TRIGGER `ct_created_at` BEFORE INSERT ON `contract` FOR EACH ROW set new.created_at = now();
 ;;
delimiter ;


-- ----------------------------
--  Table structure for `contract_advertisement`
-- ----------------------------
DROP TABLE IF EXISTS `contract_advertisement`;
CREATE TABLE `contract_advertisement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `advertisement_id` int(11) NOT NULL,
  `contract_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `advertisement_id` (`advertisement_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5206 DEFAULT CHARSET=utf8;


-- ----------------------------
--  Table structure for `contract_duration`
-- ----------------------------
DROP TABLE IF EXISTS `contract_duration`;
CREATE TABLE `contract_duration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contract_id` int(11) NOT NULL,
  `duration_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `indx_contr` (`contract_id`),
  KEY `indx_dur` (`duration_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21347 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `duration`
-- ----------------------------
DROP TABLE IF EXISTS `duration`;
CREATE TABLE `duration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(30) NOT NULL,
  `date_string` date DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_id` (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=218 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `payment`
-- ----------------------------
DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(60) NOT NULL,
  `client_id` int(11) NOT NULL,
  `contract_id` int(11) NOT NULL,
  `duration_id` int(11) NOT NULL,
  `payment_type_id` int(11) NOT NULL,
  `payment_amount` decimal(11,2) NOT NULL,
  `payment_category` varchar(40) NOT NULL,
  `notify_client` varchar(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `insert_user_id` int(11) DEFAULT NULL,
  `update_user_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
delimiter ;;
CREATE TRIGGER `pt_created_at` BEFORE INSERT ON `payment` FOR EACH ROW set new.created_at = now();
 ;;
delimiter ;


-- ----------------------------
--  Table structure for `payment_term`
-- ----------------------------
DROP TABLE IF EXISTS `payment_term`;
CREATE TABLE `payment_term` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(30) NOT NULL,
  `payment_type_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;


-- ----------------------------
--  Table structure for `payment_type`
-- ----------------------------
DROP TABLE IF EXISTS `payment_type`;
CREATE TABLE `payment_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(30) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;


-- ----------------------------
--  Table structure for `postal_code`
-- ----------------------------
DROP TABLE IF EXISTS `postal_code`;
CREATE TABLE `postal_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iso_code` varchar(8) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_indx` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `publication`
-- ----------------------------
DROP TABLE IF EXISTS `publication`;
CREATE TABLE `publication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `territory_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `publication_FI_1` (`territory_id`),
  CONSTRAINT `publication_FK_1` FOREIGN KEY (`territory_id`) REFERENCES `territory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `publication_zip`
-- ----------------------------
DROP TABLE IF EXISTS `publication_zip`;
CREATE TABLE `publication_zip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postal_code_id` int(10) NOT NULL,
  `publication_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `publication_zip_FI_1` (`publication_id`),
  CONSTRAINT `publication_zip_FK_1` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=312 DEFAULT CHARSET=latin1;


-- ----------------------------
--  Table structure for `state`
-- ----------------------------
DROP TABLE IF EXISTS `state`;
CREATE TABLE `state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `abbr` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `territory`
-- ----------------------------
DROP TABLE IF EXISTS `territory`;
CREATE TABLE `territory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `state_id` int(11) NOT NULL,
  `manager_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `territory_FI_1` (`state_id`),
  KEY `territory_FI_2` (`manager_id`),
  CONSTRAINT `territory_FK_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`),
  CONSTRAINT `territory_FK_2` FOREIGN KEY (`manager_id`) REFERENCES `sf_guard_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;


-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `email` varchar(255) NOT NULL,
  `salt` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `roles` varchar(255) NOT NULL DEFAULT 'ROLE_USER',
  `manager_user_id` int(11) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `territory_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sf_guard_user_U_1` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 1;
