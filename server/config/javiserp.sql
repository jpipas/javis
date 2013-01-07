/*
 Navicat Premium Data Transfer

 Source Server         : Local DEV
 Source Server Type    : MySQL
 Source Server Version : 50166
 Source Host           : localhost

 Target Server Type    : MySQL
 Target Server Version : 50166
 File Encoding         : utf-8

 Date: 01/06/2013 22:35:01 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `ad_size`
-- ----------------------------
DROP TABLE IF EXISTS `ad_size`;
CREATE TABLE `ad_size` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(40) DEFAULT NULL,
  `type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`type_id`),
  KEY `size_FI_1` (`type_id`),
  CONSTRAINT `size_FK_1` FOREIGN KEY (`id`) REFERENCES `ad_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `ad_type`
-- ----------------------------
DROP TABLE IF EXISTS `ad_type`;
CREATE TABLE `ad_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(30) DEFAULT NULL,
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
  `created_at` datetime DEFAULT NULL,
  `insert_user_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `update_user_id` int(11) DEFAULT NULL,
  `email_client` tinyint(4) DEFAULT '0',
  `email_designer` tinyint(4) DEFAULT '0',
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
) ENGINE=InnoDB AUTO_INCREMENT=6498 DEFAULT CHARSET=latin1;

CREATE TRIGGER `cre_at` BEFORE INSERT ON `advertisement` FOR EACH ROW set new.created_at = now();


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
) ENGINE=InnoDB AUTO_INCREMENT=4700 DEFAULT CHARSET=utf8;

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
  PRIMARY KEY (`id`),
  KEY `client_FI_1` (`state_id`),
  KEY `client_FI_2` (`territory_id`),
  KEY `client_FI_3` (`insert_user_id`),
  CONSTRAINT `client_FK_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`),
  CONSTRAINT `client_FK_2` FOREIGN KEY (`territory_id`) REFERENCES `territory` (`id`),
  CONSTRAINT `client_FK_3` FOREIGN KEY (`insert_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1371 DEFAULT CHARSET=latin1;

CREATE TRIGGER `init_created_at` BEFORE INSERT ON `client` FOR EACH ROW set new.created_at = now();


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
  PRIMARY KEY (`id`),
  KEY `contract_FI_1` (`client_id`),
  KEY `contract_FI_2` (`payment_term_id`),
  KEY `contract_FI_3` (`insert_user_id`),
  CONSTRAINT `contract_FK_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`),
  CONSTRAINT `contract_FK_3` FOREIGN KEY (`insert_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2088 DEFAULT CHARSET=latin1;

CREATE TRIGGER `ct_created_at` BEFORE INSERT ON `contract` FOR EACH ROW set new.created_at = now();


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
) ENGINE=InnoDB AUTO_INCREMENT=5201 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=21228 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `contract_payment`
-- ----------------------------
DROP TABLE IF EXISTS `contract_payment`;
CREATE TABLE `contract_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_id` int(11) NOT NULL,
  `contract_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_id` (`payment_id`),
  KEY `contract_id` (`contract_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `duration`
-- ----------------------------
DROP TABLE IF EXISTS `duration`;
CREATE TABLE `duration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(30) NOT NULL,
  `date_string` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=218 DEFAULT CHARSET=utf8;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;


CREATE TRIGGER `pt_created_at` BEFORE INSERT ON `payment` FOR EACH ROW set new.created_at = now();


-- ----------------------------
--  Table structure for `payment_term`
-- ----------------------------
DROP TABLE IF EXISTS `payment_term`;
CREATE TABLE `payment_term` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(30) NOT NULL,
  `payment_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `payment_type`
-- ----------------------------
DROP TABLE IF EXISTS `payment_type`;
CREATE TABLE `payment_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

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
  PRIMARY KEY (`id`),
  KEY `publication_FI_1` (`territory_id`),
  CONSTRAINT `publication_FK_1` FOREIGN KEY (`territory_id`) REFERENCES `territory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;
delimiter ;;
CREATE TRIGGER `pb_created_at` BEFORE INSERT ON `publication` FOR EACH ROW set new.created_at = now();
 ;;
delimiter ;

-- ----------------------------
--  Table structure for `publication_zip`
-- ----------------------------
DROP TABLE IF EXISTS `publication_zip`;
CREATE TABLE `publication_zip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `zip_code` varchar(10) DEFAULT NULL,
  `publication_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `publication_zip_FI_1` (`publication_id`),
  CONSTRAINT `publication_zip_FK_1` FOREIGN KEY (`publication_id`) REFERENCES `publication` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=latin1;

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
  `algorithm` varchar(128) NOT NULL DEFAULT 'sha1',
  `salt` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login` datetime DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1',
  `is_super_admin` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sf_guard_user_U_1` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=latin1;

CREATE TRIGGER `usr_created_at` BEFORE INSERT ON `user` FOR EACH ROW set new.created_at = now();


SET FOREIGN_KEY_CHECKS = 1;
