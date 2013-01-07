/*
 Source Server Version : 50154
 Source Database       : javiserp

 Target Server Type    : MySQL
 Target Server Version : 50154
 File Encoding         : utf-8

 Date: 01/02/2013 19:53:21 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;


-- ----------------------------
--  Records of `ad_size`
-- ----------------------------
BEGIN;
INSERT INTO `ad_size` VALUES ('1', 'Full Color', '1'), ('2', 'Half Color', '1'), ('3', 'Full B/W', '1'), ('4', 'Half B/W', '1'), ('5', '2/3 Color', '2'), ('6', 'Full', '3'), ('7', '1/2', '3'), ('8', '1/4', '3'), ('9', '1/8', '3'), ('10', 'Full', '4'), ('11', '1/2', '4'), ('12', '1/4', '4'), ('13', '1/8', '4'), ('14', 'Full', '5'), ('15', '1/2', '5');
COMMIT;


-- ----------------------------
--  Records of `ad_type`
-- ----------------------------
BEGIN;
INSERT INTO `ad_type` VALUES ('1', 'Realtor Sponsor'), ('2', 'Back Cover'), ('3', 'Color'), ('4', 'B/W'), ('5', 'Insert');
COMMIT;

-- ----------------------------
--  Records of `client`
-- ----------------------------
BEGIN;
INSERT INTO `client` VALUES ('1', 'SC Waukesha', 'N3581 Ridgeside Court', '', 'Pewaukee', '2', '53072', '123-333-2323', '', '', 'fake@email.com', '1', '6', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('2', 'Huntington Learning Center', '10100 6th Ave. N', '#103B', 'Plymouth', '1', '55441', '123-123-9646', '123-123-6180', '', 'fake@aol.com', '3', '8', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('3', 'Expert Paving & Seal Coating', '604 Shimmcor Street Mayer NW', '', 'Mayer', '1', '55360', '322-123-1181', '123-231-0036', '', 'fake@expert-driveways.com', '3', '8', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('4', 'Your Arts Desire', '12928 Minnetonka Blvd', '', 'Minnetonka', '1', '55305', '123-123-9772', '', '', '', '3', '8', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('5', 'J Brothers Home Improvements - Home Maintenance Specialists', 'P.O. Box 1182', '', 'Maple Grove', '1', '55311', '123-123-8732', '', '', 'fake@home-maintenancespecialists.com', '3', '8', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('6', 'Gallant Realty', '2600 N. 2nd Street', '', 'Minneapolis', '1', '55411', '123-123-9621', '123-123-9652', '', 'fake@gallantrealty.com', '3', '8', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('7', 'Pete Lentine', '5125 Upland Lane N', '', 'Plymouth', '1', '55446', '123-123-7193', '', '', 'fake@petelentine.com', '3', '8', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('8', 'Fitness Together', '858 E. Lake Street', '', 'Wayzata', '1', '55391', '123-123-2177', '', '', 'fake@fitnesstogether.com', '3', '8', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('9', 'Classic Ballroom', 'Four Seasons Mall', '', 'Plymouth', '1', '55441', '123-123-1314', '', '', 'fake@classicballroomdance.com', '3', '8', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('10', 'Mochablue Concierge', '5328 Twin Lake Blvd E', '', 'Brooklyn Center', '1', '55429', '123-123-3544', '', '', 'fake@mochablueco.com', '3', '8', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('11', 'Artistic Landscapes', '180 Northshore Drive', '', 'Maple Plain', '1', '55359', '123-123-5263', '123-123-5444', '', 'fake@artisticlandscapedesign.com', '3', '8', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('12', 'Snap Fitness', '2460 W. Industrial Blvd', '', 'Long Lake', '1', '55356', '952-123-1233', '123-123-2343', '', 'fake@snaplonglake.com', '3', '21', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('13', 'Donald C. Wright, CPA', '3906 Lawndale Lane N', '', 'Plymouth', '1', '55446', '123-123-6999', '', '', 'fake@compuserve.com', '3', '8', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('14', 'Thomas Renovations', '3410 Kilmer Lane N', '', 'Plymouth', '1', '55441', '123-123-8181', '123-123-1185', '', 'fake@thomasrenovations.net', '3', '8', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('15', 'Hopkins Carpet One', '907 Hopkins Center', '', 'Hopkins', '1', '55343', '123-123-6422', '123-123-6422', '', 'fake@hopkinscarpetone.com', '3', '8', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('16', 'McKee & Andrews', '15600 35th Ave N', '202', 'Plymouth', '1', '55447', '123-123-3340', '', '', 'fake@mckeeandrews.com', '3', '8', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('17', 'Sylvan Learning - Minnetonka', '10590 Wayzata Blvd', '150', 'Minnetonka', '1', '55305', '123-123-6253', '123-123-1252', '', 'fake@sylvanmtka.com', '3', '8', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('18', 'Applied Graphics', '2405 Annapolis Lane', '250', 'Plymouth', '1', '55441', '123-123-6970', '', '', 'fake@applied-graphics.com', '3', '8', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('19', 'Math Tutor', '12201 W. North Ave.', '107', 'Wauwatosa', '2', '53226', '123-123-0866', '', '', '', '1', '6', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58'), ('20', 'American Landscape', 'N60 W16073 Kohler Lane', '', 'Menomonee Falls', '2', '53051', '123-123-4260', '123-123-7031', '', 'fake@americanlandscape.com', '1', '6', '1', '2013-01-01 23:29:20', '2012-12-28 10:49:58');
COMMIT;

-- ----------------------------
--  Records of `contract`
-- ----------------------------
BEGIN;
INSERT INTO `contract` VALUES ('2071', '11', '2', '894.00', '0.100', '804.60', '10.00', '814.60', '211.15', '201.15', null, null, '2013-01-01 23:29:24', '2013-01-01 21:38:29'), ('2072', '10', '0', '0.00', '0.000', '0.00', '0.00', '0.00', '0.00', '0.00', null, null, '2013-01-01 23:29:24', '2013-01-01 21:42:30'), ('2073', '5', '0', '0.00', '0.000', '0.00', '0.00', '0.00', '0.00', '0.00', null, null, '2013-01-01 23:29:24', '2013-01-01 21:44:35'), ('2074', '6', '0', '0.00', '0.000', '0.00', '0.00', '0.00', '0.00', '0.00', null, null, '2013-01-01 23:29:24', '2013-01-01 21:50:17'), ('2075', '9', '1', '212.00', '0.050', '201.40', '0.00', '201.40', '67.13', '67.13', null, null, '2013-01-01 23:29:24', '2013-01-01 21:56:33'), ('2076', '11', '1', '354.00', '0.050', '336.30', '0.00', '336.30', '112.10', '112.10', null, null, '2013-01-01 23:29:24', '2013-01-01 22:05:43'), ('2077', '11', '0', '0.00', '0.000', '0.00', '0.00', '0.00', '0.00', '0.00', null, null, '2013-01-01 23:29:24', '2013-01-01 22:11:17'), ('2078', '2', '4', '351.00', '0.000', '351.00', '0.00', '351.00', '117.00', '117.00', null, null, '2013-01-01 23:29:24', '2013-01-01 22:14:20'), ('2079', '12', '1', '254.00', '0.050', '241.30', '0.00', '241.30', '80.43', '80.43', null, null, '2013-01-01 23:29:24', '2013-01-01 22:16:36'), ('2080', '8', '1', '555.00', '0.100', '499.50', '0.00', '499.50', '166.50', '166.50', null, null, '2013-01-01 23:29:24', '2013-01-01 22:29:37'), ('2081', '27', '0', '0.00', '0.000', '0.00', '0.00', '0.00', '0.00', '0.00', null, null, '2013-01-02 09:44:25', '2013-01-02 09:44:25'), ('2082', '6', '0', '0.00', '0.000', '0.00', '0.00', '0.00', '0.00', '0.00', null, null, '2013-01-02 09:47:45', '2013-01-02 09:47:45'), ('2083', '6', '0', '0.00', '0.000', '0.00', '0.00', '0.00', '0.00', '0.00', null, null, '2013-01-02 09:50:31', '2013-01-02 09:50:31'), ('2084', '5', '0', '0.00', '0.000', '0.00', '0.00', '0.00', '0.00', '0.00', null, null, '2013-01-02 09:52:07', '2013-01-02 09:52:07'), ('2085', '5', '1', '1254.21', '0.100', '1128.79', '0.00', '1128.79', '188.13', '188.13', null, null, '2013-01-02 09:52:52', '2013-01-02 09:53:33');
COMMIT;


-- ----------------------------
--  Records of `contract_duration`
-- ----------------------------
BEGIN;
INSERT INTO `contract_duration` VALUES ('57', '2071', '2'), ('58', '2071', '3'), ('59', '2071', '4'), ('60', '2071', '5'), ('69', '2075', '5'), ('68', '2075', '4'), ('67', '2075', '3'), ('70', '2076', '2'), ('71', '2076', '3'), ('72', '2076', '4'), ('73', '2078', '3'), ('74', '2078', '4'), ('75', '2078', '5'), ('76', '2079', '3'), ('77', '2079', '4'), ('78', '2079', '5'), ('79', '2080', '3'), ('80', '2080', '4'), ('81', '2080', '5'), ('82', '2085', '3'), ('83', '2085', '4'), ('84', '2085', '5'), ('85', '2085', '6'), ('86', '2085', '7'), ('87', '2085', '8');
COMMIT;


-- ----------------------------
--  Records of `duration`
-- ----------------------------
BEGIN;
INSERT INTO `duration` VALUES ('1', 'Jan 2013', '2013-01-01'), ('2', 'Feb 2013', '2013-02-01'), ('3', 'Mar 2013', '2013-03-01'), ('4', 'Apr 2013', '2013-04-01'), ('5', 'May 2013', '2013-05-01'), ('6', 'Jun 2013', '2013-06-01'), ('7', 'Jul 2013', '2013-07-01'), ('8', 'Aug 2013', '2013-08-01'), ('9', 'Sep 2013', '2013-09-01'), ('10', 'Oct 2013', '2013-10-01'), ('11', 'Nov 2013', '2013-11-01'), ('12', 'Dec 2013', '2013-12-01');
COMMIT;


-- ----------------------------
--  Records of `payment_type`
-- ----------------------------
BEGIN;
INSERT INTO `payment_type` VALUES ('1', 'Credit Card Monthly', 'Credit Card'), ('2', 'Credit Card in Full', 'Credit Card'), ('3', 'Check in Full', 'Check'), ('4', 'Check Monthly', 'Check'), ('5', 'Check Quarterly', 'Check'), ('6', 'Check for Half', 'Check'), ('7', 'Credit Card Half', 'Credit Card'), ('8', 'Credit Card Quarterly', 'Credit Card');
COMMIT;


-- ----------------------------
--  Records of `publication`
-- ----------------------------
BEGIN;
INSERT INTO `publication` VALUES ('1', 'Brookfield Crusader', 'christina@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('2', 'Cedar Lake Connector', 'christinan@fake.com', '3', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('3', 'Crane Lake Overlook', 'christinan@fake.com', '3', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('4', 'Creekwood Crusader', 'beth@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('5', 'Mequon Beacon', 'nancy@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('6', 'Dunkirk Defender', 'christinan@fake.com', '3', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('7', 'Five Estates', 'christina@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('8', 'Four Estates Guardian', 'christinan@fake.com', '3', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('9', 'Lilly Creek Mill Road Review', 'beth@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('10', 'Naga-Waukee Neighbors', 'laura@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('11', 'North Shore Meadows', 'laura@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('12', 'Northwest Laker', 'katie@fake.com', '3', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('13', 'Pathways of Hartland', 'laura@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('14', 'Pewaukee Lakeview', 'laura@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('15', 'Preserve Hills Informer', 'tarak@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('16', 'Ridges Reporter', 'beth@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('17', 'River Hills Review', 'tricia@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('18', 'Brookfield Connector', 'christina@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('19', 'Fields of Pewaukee', 'laura@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('20', 'Stonefields Guardian', 'nancy@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('21', 'Rundschreiben', 'tara@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('22', 'Washington Highlands', 'julie@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('23', 'Weston Hawk', 'christina@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('24', 'Windsong/Sunberry Messenger', 'tara@fake.com', '1', '2009-04-10 20:14:49', '2012-12-28 15:12:51'), ('25', 'Hawks Landing Examiner', 'holly@fake.com', '2', '2009-04-13 09:18:02', '2012-12-28 15:12:51'), ('26', 'Cherrywood Pointer', 'holly@fake.com', '2', '2009-04-13 09:18:02', '2012-12-28 15:12:51'), ('27', 'High Point Estates', 'holly@fake.com', '2', '2009-04-13 09:18:02', '2012-12-28 15:12:51'), ('28', 'Blackhawk (Hawkeye) Explorer', 'holly@fake.com', '2', '2009-04-13 09:18:02', '2012-12-28 15:12:51'), ('29', 'Ferndale Honker', 'christinan@fake.com', '3', '2009-08-10 09:35:14', '2012-12-28 15:12:51'), ('30', 'Bayside Scene', 'tricia@fake.com', '1', '2010-04-07 10:32:21', '2012-12-28 15:12:51'), ('31', 'Fox Point of View', 'gail@fake.com', '1', '2010-04-07 10:34:43', '2012-12-28 15:12:51'), ('32', 'Seminole', 'holly@fake.com', '2', '2010-06-15 13:43:20', '2012-12-28 15:12:51'), ('33', 'Nakoma', 'rdigman@fake.com', '2', '2010-06-15 14:05:56', '2012-12-28 15:12:51'), ('34', 'Friends of Fairbanks Ranch', 'paulette@fake.com', '4', '2011-02-08 16:31:20', '2012-12-28 15:12:51'), ('35', 'Covenant of Rancho Santa Fe', 'paulette@fake.com', '4', '2011-02-08 16:35:09', '2012-12-28 15:12:51'), ('36', 'Aviara', 'paulette@fake.com', '4', '2011-02-08 16:37:18', '2012-12-28 15:12:51'), ('37', 'La Jolla', 'paulette@fake.com', '4', '2011-02-08 16:39:23', '2012-12-28 15:12:51'), ('38', 'Village Neighbors', 'villageneighbors@fake.com', '6', '2011-08-11 10:02:28', '2012-12-28 15:12:51'), ('39', 'Country Club Living', 'bmartin@fake.com', '5', '2011-08-11 10:06:16', '2012-12-28 15:12:51'), ('40', 'SE Neighbors', 'ron@fake.com', '5', '2011-08-11 10:07:08', '2012-12-28 15:12:51'), ('41', 'Golden Leader Ocala', 'ocalacontent@fake.com', '5', '2011-08-11 10:09:03', '2012-12-28 15:12:51'), ('42', 'Maple Bluff', 'holly@fake.com', '2', '2011-11-18 08:00:46', '2012-12-28 15:12:51'), ('43', 'Monona', 'rdigman@fake.com', '2', '2011-11-18 08:02:14', '2012-12-28 15:12:51'), ('44', 'Crosby at Rancho Santa Fe', 'paulette@fake.com', '4', '2011-12-14 07:40:39', '2012-12-28 15:12:51'), ('45', 'Bridges of Rancho Santa Fe', 'paulette@fake.com', '4', '2011-12-14 07:45:59', '2012-12-28 15:12:51'), ('46', 'Whispering Palms', 'paulette@fake.com', '4', '2011-12-14 07:47:21', '2012-12-28 15:12:51'), ('47', 'Santaluz', 'paulette@fake.com', '4', '2011-12-14 12:11:23', '2012-12-28 15:12:51'), ('48', 'Red Cedar Canyon', 'rwebster@fake.com', '7', '2012-02-03 11:49:51', '2012-12-28 15:12:51'), ('49', 'Troy Burne', 'rwebster@fake.com', '7', '2012-02-03 11:50:21', '2012-12-28 15:12:51'), ('50', 'OTOW \'Neighbors\'', 'ocalacontent@fake.com', '5', '2012-02-06 06:19:41', '2012-12-28 15:12:51'), ('51', 'SW Neighbors', 'ocalacontent@fake.com', '5', '2012-02-06 06:21:27', '2012-12-28 15:12:51'), ('52', 'I75 Neighbors', 'ron@fake.com', '8', '2012-02-06 06:22:06', '2012-12-28 15:12:51'), ('53', 'Linden Hills', 'msublett@fake.com', '9', '2012-03-16 07:07:03', '2012-12-28 15:12:51'), ('54', 'Indian Hills', 'msublett@fake.com', '9', '2012-03-16 07:09:08', '2012-12-28 15:12:51'), ('55', 'Thornberry Creek / Indian Trails', 'sreiser@fake.com', '11', '2012-05-21 15:09:58', '2012-12-28 15:12:51'), ('56', 'Congdon Neighbors', 'amurphy@fake.com', '12', '2012-05-23 10:02:59', '2012-12-28 15:12:51'), ('57', 'Downtown Neighbors', 'bmartin@fake.com', '5', '2012-09-13 09:59:46', '2012-12-28 15:12:51'), ('58', 'Fox River Neighbors', 'gdraftz@fake.com', '13', '2012-09-17 12:23:16', '2012-12-28 15:12:51'), ('59', 'Fox Mill Living', 'gdraftz@fake.com', '13', '2012-09-17 12:24:39', '2012-12-28 15:12:51'), ('60', 'Kohler', 'sclaerbout@fake.com', '14', '2012-09-17 12:29:27', '2012-12-28 15:12:51'), ('61', 'Lido Key Living', 'rnelson@fake.com', '15', '2012-10-19 09:38:43', '2012-12-28 15:12:51'), ('62', 'Bird Key', 'rnelson@fake.com', '15', '2012-10-19 09:39:13', '2012-12-28 15:12:51'), ('63', 'Isleworth Golf & Country Club Neighbors', 'ajohnson@fake.com', '16', '2012-10-19 09:47:35', '2012-12-28 15:12:51'), ('64', 'Bay Hill', 'ajohnson@fake.com', '16', '2012-10-19 09:52:46', '2012-12-28 15:12:51'), ('65', 'Business - Ocala', 'ecummings@fake.com', '8', '2012-10-19 10:15:50', '2012-12-28 15:12:51'), ('66', 'Tioga Neighbors', 'felicia@fake.com', '17', '2012-11-08 13:58:21', '2012-12-28 15:12:51'), ('67', 'Haile Neighbors', 'felicia@fake.com', '17', '2012-11-08 13:59:23', '2012-12-28 15:12:51'), ('68', 'Piper Glen', 'sdraganov@fake.com', '18', '2012-11-20 07:19:41', '2012-12-28 15:12:51'), ('69', 'Panther Creek', 'sdraganov@fake.com', '18', '2012-11-20 07:20:24', '2012-12-28 15:12:51'), ('70', 'Whitefish Bay', 'ndurand@bestversionmedia.com', '19', '2012-12-18 04:24:22', '2012-12-28 15:12:51');
COMMIT;


-- ----------------------------
--  Records of `publication_zip`
-- ----------------------------
BEGIN;
INSERT INTO `publication_zip` VALUES ('1', '55391', '29'), ('2', '55447', '29'), ('3', '53045', '1'), ('4', '53005', '1'), ('5', '55305', '2'), ('6', '55305', '3'), ('7', '53051', '4'), ('8', '53092', '5'), ('9', '55447', '6'), ('10', '53005', '7'), ('11', '53045', '7'), ('12', '55446', '8'), ('13', '53051', '9'), ('14', '53072', '10'), ('15', '53018', '10'), ('16', '53072', '11'), ('17', '53018', '11'), ('18', '55441', '12'), ('19', '55442', '12'), ('20', '53029', '13'), ('21', '53056', '13'), ('22', '53072', '14'), ('23', '53022', '15'), ('24', '53051', '16'), ('25', '53217', '17'), ('26', '53005', '18'), ('27', '53045', '18'), ('28', '53072', '19'), ('29', '53092', '20'), ('30', '53022', '21'), ('31', '53213', '22'), ('32', '53005', '23'), ('33', '53045', '23'), ('34', '53022', '24'), ('35', '53719', '25'), ('36', '53593', '25'), ('37', '53562', '25'), ('38', '53717', '25'), ('39', '53719', '26'), ('40', '53593', '26'), ('41', '53562', '26'), ('42', '53717', '26'), ('43', '53719', '27'), ('44', '53593', '27'), ('45', '53562', '27'), ('46', '53717', '27'), ('47', '53719', '28'), ('48', '53593', '28'), ('49', '53562', '28'), ('50', '53717', '28'), ('51', '53217', '30'), ('52', '53217', '31'), ('53', '53711', '32'), ('54', '53713', '32'), ('55', '53711', '33'), ('56', '53713', '33'), ('57', '53097', '5'), ('58', '53097', '20'), ('59', '92067', '34'), ('60', '92091', '34'), ('61', '92067', '35'), ('62', '92091', '35'), ('63', '92011', '36'), ('64', '92037', '37'), ('65', '92038', '37'), ('66', '92039', '37'), ('67', '92092', '37'), ('68', '92093', '37'), ('69', '32162', '38'), ('70', '34480', '39'), ('71', '34480', '40'), ('72', '34472', '40'), ('73', '34476', '40'), ('74', '34471', '40'), ('75', '34482', '41'), ('76', '53704', '42'), ('77', '53716', '43'), ('78', '92067', '44'), ('79', '92067', '45'), ('80', '92091', '45'), ('81', '92091', '46'), ('82', '92067', '46'), ('83', '92091', '44'), ('84', '92127', '47'), ('85', '54016', '48'), ('86', '54016', '49'), ('87', '34481', '50'), ('91', '34480', '51'), ('92', '34472', '51'), ('93', '34476', '51'), ('94', '34471', '51'), ('95', '34480', '52'), ('96', '34472', '52'), ('97', '34476', '52'), ('98', '34471', '52'), ('99', '55410', '53'), ('100', '55439', '54'), ('101', '54307', '55'), ('102', '54155', '55'), ('103', '55804', '56'), ('104', '55812', '56'), ('105', '55803', '56'), ('106', '55811', '56'), ('107', '55805', '56'), ('108', '55806', '56'), ('109', '34470', '57'), ('110', '34471', '57'), ('111', '34474', '57'), ('112', '34475', '57'), ('113', '60174', '58'), ('114', '60175', '58'), ('115', '60174', '59'), ('116', '60175', '59'), ('117', '53044', '60'), ('118', '34236', '61'), ('119', '34236', '62'), ('120', '34786', '63'), ('121', '34786', '64'), ('122', '32819', '64'), ('123', '32836', '64'), ('124', '32836', '63'), ('125', '32819', '63'), ('126', '34470', '65'), ('127', '32669', '66'), ('128', '32608', '67'), ('129', '62711', '68'), ('130', '62711', '69'), ('131', '32163', '38'), ('132', '32159', '38'), ('133', '53217', '70');
COMMIT;


-- ----------------------------
--  Records of `state`
-- ----------------------------
BEGIN;
INSERT INTO `state` VALUES ('1', 'Minnesota', 'MN'), ('2', 'Wisconsin', 'WI'), ('3', 'California', 'CA'), ('4', 'Florida', 'FL'), ('5', 'Illinois', 'IL'), ('6', 'Pennsylvania', 'PA'), ('7', 'Maryland', 'MD');
COMMIT;

-- ----------------------------
--  Records of `territory`
-- ----------------------------
BEGIN;
INSERT INTO `territory` VALUES ('1', 'Milwaukee', '2', '1'), ('2', 'Madison', '2', '11'), ('3', 'Twin Cities', '1', '2'), ('4', 'San Diego', '3', '40'), ('5', 'Ocala', '4', '41'), ('6', 'Villages', '4', '51'), ('7', 'Hudson', '2', '53'), ('8', 'FL - Ocala - Business', '4', '83'), ('9', 'Edina', '1', '57'), ('11', 'Green Bay', '2', '79'), ('12', 'Duluth', '1', '64'), ('13', 'St. Charles', '5', '73'), ('14', 'Kolher / Sheboygan', '2', '58'), ('15', 'Sarasota', '4', '80'), ('16', 'Orlando', '4', '81'), ('17', 'Gainesville', '4', '59'), ('18', 'Springfield', '5', '89'), ('19', 'Whitefish Bay', '2', '85');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
