/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : burmacausemanagement

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2018-03-12 15:16:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for CauseReferences
-- ----------------------------
DROP TABLE IF EXISTS `CauseReferences`;
CREATE TABLE `CauseReferences` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CauseId` int(11) DEFAULT NULL,
  `Url` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for Causes
-- ----------------------------
DROP TABLE IF EXISTS `Causes`;
CREATE TABLE `Causes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `Description` varchar(2000) CHARACTER SET utf8 DEFAULT NULL,
  `Image` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for DonationUrls
-- ----------------------------
DROP TABLE IF EXISTS `DonationUrls`;
CREATE TABLE `DonationUrls` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CauseId` int(11) DEFAULT NULL,
  `Url` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for Events
-- ----------------------------
DROP TABLE IF EXISTS `Events`;
CREATE TABLE `Events` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CauseId` int(11) DEFAULT NULL,
  `Title` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `Location` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `Notes` varchar(2000) CHARACTER SET utf8 DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for Notifications
-- ----------------------------
DROP TABLE IF EXISTS `Notifications`;
CREATE TABLE `Notifications` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `CauseId` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for Resources
-- ----------------------------
DROP TABLE IF EXISTS `Resources`;
CREATE TABLE `Resources` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CauseId` int(11) DEFAULT NULL,
  `Title` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `Description` varchar(2000) CHARACTER SET utf8 DEFAULT NULL,
  `File` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for ResourceUrls
-- ----------------------------
DROP TABLE IF EXISTS `ResourceUrls`;
CREATE TABLE `ResourceUrls` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ResourceId` int(11) DEFAULT NULL,
  `Url` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for Survey
-- ----------------------------
DROP TABLE IF EXISTS `Survey`;
CREATE TABLE `Survey` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CauseId` int(11) DEFAULT NULL,
  `Title` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for SurveyQuestions
-- ----------------------------
DROP TABLE IF EXISTS `SurveyQuestions`;
CREATE TABLE `SurveyQuestions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SurveyId` int(11) DEFAULT NULL,
  `Question` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `AnswerType` varchar(45) DEFAULT NULL,
  `Option1` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `Option2` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `Option3` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `Option4` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for TalkingPoints
-- ----------------------------
DROP TABLE IF EXISTS `TalkingPoints`;
CREATE TABLE `TalkingPoints` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CauseId` int(11) DEFAULT NULL,
  `Title` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `Description` varchar(2000) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for UserResponseSurvey
-- ----------------------------
DROP TABLE IF EXISTS `UserResponseSurvey`;
CREATE TABLE `UserResponseSurvey` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SurveyId` int(11) DEFAULT NULL,
  `Question` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `Answer` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for users
-- ----------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `mob_no` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;



-- ----------------------------
-- Table structure for localmedia
-- ----------------------------
DROP TABLE IF EXISTS `localmedia`;
CREATE TABLE `localmedia` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Contact` varchar(255) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `CityId` int(11) DEFAULT NULL,
  `StateId` int(11) DEFAULT NULL,
  `CountryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `devicetokens`;
CREATE TABLE `devicetokens` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `tokens` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

alter table devicetokens
add unique(tokens);