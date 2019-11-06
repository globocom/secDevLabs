USE a1db;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `ID` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `hashedPassword` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`ID`)
)
