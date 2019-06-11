# Host: localhost  (Version 5.6.40)
# Date: 2019-06-09 19:30:25
# Generator: MySQL-Front 6.1  (Build 1.26)


#
# Structure for table "moments"
#

CREATE TABLE `moments` (
  `Id` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT '',
  `username` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `content` text COLLATE utf8_bin NOT NULL,
  `thumup_num` int(11) NOT NULL DEFAULT '0',
  `createdAt` bigint(1) NOT NULL DEFAULT '0',
  `updatedAt` bigint(1) NOT NULL DEFAULT '0',
  `version` bigint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

#
# Data for table "moments"
#

INSERT INTO `moments` VALUES ('470f3b87-e480-4bfa-8286-ce236dd35fcd','enhuix','3',0,1558518929143,1558518929143,0),('5eb918bb-2779-4e3a-a3ae-a8694ed6905f','enhuix','1',0,1558518920217,1558518920217,0),('88cb75f1-e0bb-49b1-9b0a-2e23cc44cf94','caijiahao','今天好开心',0,1559023385480,1559023385480,0),('b2b5f9e2-6e49-452c-9e36-74b488c1d5f1','caijiahao','4',0,1558518932385,1558518932385,0),('c526c109-454a-486d-b765-e4fb69963061','enhuix','6',0,1558519347636,1558519347636,0),('cd7644b7-79db-4415-92b8-b29a50e4fcf8','caijiahao','2',0,1558518925687,1558518925687,0),('f590ef33-5c2e-4e46-95f8-3518b6dad917','enhuix','5',0,1558518944413,1558518944413,0),('fd15ac7b-0be9-4095-8176-077cfae754b5','enhuix','我是夏晗',0,1558683411848,1558683411848,0),('fe75d466-d9fc-4380-89b6-070336dd53bf','enhuix','test',0,1559023872474,1559023872474,0);

#
# Structure for table "users"
#

CREATE TABLE `users` (
  `Id` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT '',
  `username` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `passwd` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `nickname` varchar(30) COLLATE utf8_bin NOT NULL DEFAULT '',
  `birth` date NOT NULL DEFAULT '0000-00-00',
  `gender` int(1) NOT NULL DEFAULT '0',
  `goodAtLanguage` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `studyLanguage` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '',
  `introduction` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `createdAt` bigint(1) NOT NULL DEFAULT '0',
  `updatedAt` bigint(1) NOT NULL DEFAULT '0',
  `version` bigint(1) NOT NULL DEFAULT '0',
  `image` int(11) DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

#
# Data for table "users"
#

INSERT INTO `users` VALUES ('02dc670d-c767-402a-bdb3-b3223113fefe','test22222','123','enhuix','2019-06-16',-1,'Chinese;English;French;Japanese;','French;','',1559628168573,1559628168573,0,8),('56c214ae-ee0d-42e9-b3ef-e675e2e2c3c7','test123','123456','1231','2019-05-21',-1,'en;fr;','zh;','test',1558421178478,1558421204839,3,0),('639b3a5b-f7e5-4108-81ff-be798d8223ed','caijiahao','123456','seven','2019-03-15',1,'zh;','en;fr;','我是蔡佳豪',1552971603630,1552971603630,0,1),('816432b6-2bee-4859-93a8-4ba26cfcac01','kingjyh','19980816','king酱','1998-08-16',0,'zh;','en;','测试姬！！',1554786338681,1554790019507,3,2),('8bc7af23-5e27-4a4c-ae28-2205795e5fb5','test2222','123','dada','2019-06-21',0,'English;Korean;','English;French;','',1559627978150,1559627978150,0,7),('8d5c65eb-2a7c-4b3b-a191-17951093c167','test222','123','123','2019-05-18',-1,'zh;','en;','test2',1558429221665,1558429221665,0,0),('ada0e030-a28f-4d03-bb38-761081548169','enhuix','123456','enhuix','2019-03-16',-1,'zh;','en;fr;','我是恩惠',1552916566621,1552916566621,0,3),('dadb5205-2d44-412d-90df-447c686e3c6e','test222222','123','123','2019-06-14',-1,'English;Korean;','Chinese;English;French;','',1559628036327,1559628036327,0,3),('e207014b-57c2-4a58-bd52-642d195b1891','michelle','123456','michelle','2019-03-15',0,'zh;','en;fr;','我是米歇尔',1552971967776,1552971967776,0,4),('f171a502-ac8f-42ab-9874-d02d9f605351','123456','123456','das','2019-06-14',-1,'English;Korean;Japanese;','English;French;','',1559626561201,1559626561201,0,2);
