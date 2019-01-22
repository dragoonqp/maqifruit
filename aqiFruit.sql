SET NAMES utf8;
DROP DATABASE IF EXISTS aqiFruit;
CREATE DATABASE aqiFruit CHARSET=utf8;
USE aqiFruit;
CREATE TABLE aq_user(
    uid SMALLINT PRIMARY KEY AUTO_INCREMENT,             #用户编号
    uname VARCHAR(16) NOT NULL UNIQUE, #用户名
    upwd VARCHAR(16) NOT NULL,      #用户密码
    email VARCHAR(32),      #用户邮箱
    phone CHAR(11),			#用户电话
    userName VARCHAR(8),	#真实姓名
    gender int,				#性别
    avatar VARCHAR(64),     #头像
	isOnline int DEFAULT 0,			#是否在线
    safeQue VARCHAR(64),    #安全问题
    safeAns VARCHAR(64)     #安全答案
);

CREATE TABLE aq_fclass(
    fcID SMALLINT PRIMARY KEY,	#水果分类编号
    className VARCHAR(16),		#分类名称
    disc VARCHAR(64)			#描述
);

/*CREATE TABLE fruit_class(
	cid SMALLINT PRIMARY KEY,	#分类编号
	cname VARCHAR(16),	#分类名称
	cdesc VARCHAR(128)	#分类描述
);*/

#产品图片集
CREATE TABLE aq_fpic(
	pid SMALLINT PRIMARY KEY AUTO_INCREMENT,
	fid SMALLINT ,
	spic VARCHAR(128),
	mpic VARCHAR(128),
	lpic VARCHAR(128)
);

CREATE TABLE aq_fruit(
    fId SMALLINT PRIMARY KEY AUTO_INCREMENT,        #产品编号
    pName VARCHAR(16),      #产品名称
    title VARCHAR(32),      #标题
    fdesc VARCHAR(128),     #产品描述
    packSpec SMALLINT,      #包装规格
    packWeight SMALLINT,	#包装重量
    nUnitPrice DECIMAL(6,2),	#单位现价
    oUnitPrice DECIMAL(6,2),	#单位旧价
    shelfTime BIGINT,		#上架时间
	fruitClass SMALLINT,	#水果分类
	FOREIGN KEY(fruitClass) REFERENCES aq_fclass(fcID),
    isOnsale int,			#是否促销
    oCountry VARCHAR(8)		#原产国
);




CREATE TABLE aq_shoppingcart_item(
	iid SMALLINT PRIMARY KEY AUTO_INCREMENT,	#购物车编号
	userId SMALLINT NOT NULL,	#用户编号
	FOREIGN KEY (userId) REFERENCES aq_user(uid),
	productId SMALLINT NOT NULL,	#产品编号
	FOREIGN KEY(productId) REFERENCES aq_fruit(fId),
	count SMALLINT,			#产品总数量
	isChecked int		#是否已付款
);

CREATE TABLE rec_address(
	aid SMALLINT PRIMARY KEY AUTO_INCREMENT,		#地址编号
	userId SMALLINT,		#用户编号
	FOREIGN KEY (userId) REFERENCES aq_user(uid),
	recName VARCHAR(8),	#收货人姓名
	recPhone CHAR(11),		#收货电话
	province VARCHAR(16),	#省
	city VARCHAR(16),		#城市
	county VARCHAR(16),		#镇
	addDetail VARCHAR(128),	#详细地址
	postcode CHAR(6),		#邮编
	isDefault int			#是否为默认地址
);

CREATE TABLE aq_order(
	oid SMALLINT PRIMARY KEY AUTO_INCREMENT,		#订单编号
	userId SMALLINT,			#用户编号
	FOREIGN KEY (userId) REFERENCES aq_user(uid),
	addressId SMALLINT,		#地址编号
	FOREIGN KEY (addressId) REFERENCES rec_address(aid),
	status TINYINT,				#订单状态
	orderTime BIGINT,			#订单日期
	payTime BIGINT,				#付款日期
	deliverTime BIGINT,			#派送时间
	receiveTime BIGINT			#收货时间
);
/*
CREATE TABLE aq_fruit_pic(
	pid SMALLINT PRIMARY KEY AUTO_INCREMENT,		#图片编号
	fruitID SMALLINT,				#水果编号
	FOREIGN KEY(fruitID) REFERENCES aq_order(oid),
	bigpic VARCHAR(128),			#大图url
	middlepic VARCHAR(128),			#中图url
	smallpic VARCHAR(128)			#小图url
);*/

CREATE TABLE aq_orderDetail(
	did SMALLINT PRIMARY KEY AUTO_INCREMENT,	#订单明细表编号
	orderId SMALLINT,			#订单编号
	FOREIGN KEY(orderId) REFERENCES aq_order(oid),
	productId SMALLINT,			#产品编号
	FOREIGN KEY(productId) REFERENCES aq_fruit(fId),
	count SMALLINT				#产品总数
);

CREATE TABLE aq_productComment(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	content VARCHAR(2000),
	cTime DATETIME,
	fid SMALLINT,
	FOREIGN KEY(fid) REFERENCES aq_fruit(fId),
	userId SMALLINT,
	score SMALLINT CHECK(score>=1 AND score<=5)
);

#插入评论
/*INSERT INTO aq_productComment VALUES
(null,"山东福利机构时间POI去",NOW(),1,1,5),
(null,"山是的法规",NOW(),1,2,3),
(null,"突然福传给你时间POI去",NOW(),1,3,2),
(null,"山东福利机构时间POI去",NOW(),1,4,4),
(null,"山东请问机构时间POI去",NOW(),1,5,1),
(null,"山东福利富商大贾 间POI去",NOW(),1,6,2),
(null,"山阿斯蒂芬福利机构时间POI去",NOW(),1,7,5),
(null,"切尔奇利机构时间POI去",NOW(),1,8,4),
(null,"亲亲我二东福利机构时间POI去",NOW(),1,9,3),
(null,"企鹅窝若福利机构时间POI去",NOW(),1,10,5)
;*/

INSERT INTO aq_fclass VALUES
(10,'import','kinds of fruits from many counties'),
(20,'original','new fresh fruits grown in China'),
(30,'giftBasket','fruits basket for gift'),
(40,'fruitForBaby','fruits well prepared for baby'),
(50,'forpregnant','fruits good for pregnant wemen'),
(60,'forolder','fruits suit for forolder'),
(70,'other','other fresh fruits');


INSERT INTO aq_user VALUES
(null,'tom1','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom2','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom3','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom4','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom5','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom6','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom7','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom8','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom9','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom10','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom11','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom12','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom13','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom14','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom15','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom16','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom17','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom18','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom19','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom20','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom21','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom22','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom23','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom24','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom25','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom26','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom27','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom28','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom29','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom30','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom31','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom32','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom33','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom34','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom35','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom36','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom37','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom38','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom39','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom40','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom41','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom42','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom43','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom44','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom45','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom46','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom47','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom48','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom49','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom50','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null),
(null,'tom51','123456','ken@aliyun.com','15877777777','tom',1,null,0,null,null);

INSERT INTO aq_fpic VALUES
(null,1,'/image/fruit/fruit_03.jpg','/image/fruit/fruit_03.jpg','/image/fruit/fruit_03.jpg'),
(null,1,'/image/fruit/fruit_03_2.jpg','/image/fruit/fruit_03_2.jpg','/image/fruit/fruit_03_2.jpg'),
(null,1,'/image/fruit/fruit_03_3.jpg','/image/fruit/fruit_03_3.jpg','/image/fruit/fruit_03_3.jpg'),
(null,1,'/image/fruit/fruit_03_4.jpg','/image/fruit/fruit_03_4.jpg','/image/fruit/fruit_03_4.jpg'),
(null,1,'/image/fruit/fruit_03_5.jpg','/image/fruit/fruit_03_5.jpg','/image/fruit/fruit_03_5.jpg'),
(null,2,'/image/fruit/fruit_05.jpg','/image/fruit/fruit_05.jpg','/image/fruit/fruit_05.jpg'),
(null,2,'/image/fruit/fruit_05_2.jpg','/image/fruit/fruit_05_2.jpg','/image/fruit/fruit_05_2.jpg'),
(null,2,'/image/fruit/fruit_05_3.jpg','/image/fruit/fruit_05_3.jpg','/image/fruit/fruit_05_3.jpg'),
(null,2,'/image/fruit/fruit_05_4.jpg','/image/fruit/fruit_05_4.jpg','/image/fruit/fruit_05_4.jpg'),
(null,2,'/image/fruit/fruit_05_5.jpg','/image/fruit/fruit_05_5.jpg','/image/fruit/fruit_05_5.jpg'),
(null,3,'/image/fruit/fruit_07.jpg','/image/fruit/fruit_07.jpg','/image/fruit/fruit_07.jpg'),
(null,3,'/image/fruit/fruit_07_2.jpg','/image/fruit/fruit_07_2.jpg','/image/fruit/fruit_07_2.jpg'),
(null,3,'/image/fruit/fruit_07_3.jpg','/image/fruit/fruit_07_3.jpg','/image/fruit/fruit_07_3.jpg'),
(null,3,'/image/fruit/fruit_07_4.jpg','/image/fruit/fruit_07_4.jpg','/image/fruit/fruit_07_4.jpg'),
(null,3,'/image/fruit/fruit_07_5.jpg','/image/fruit/fruit_07_5.jpg','/image/fruit/fruit_07_5.jpg'),
(null,4,'/image/fruit/fruit_09.jpg','/image/fruit/fruit_09.jpg','/image/fruit/fruit_09.jpg'),
(null,4,'/image/fruit/fruit_09_2.jpg','/image/fruit/fruit_09_2.jpg','/image/fruit/fruit_09_2.jpg'),
(null,4,'/image/fruit/fruit_09_3.jpg','/image/fruit/fruit_09_3.jpg','/image/fruit/fruit_09_3.jpg'),
(null,4,'/image/fruit/fruit_09_4.jpg','/image/fruit/fruit_09_4.jpg','/image/fruit/fruit_09_4.jpg'),
(null,4,'/image/fruit/fruit_09_5.jpg','/image/fruit/fruit_09_5.jpg','/image/fruit/fruit_09_5.jpg'),
(null,5,'/image/fruit/fruit_16.jpg',null,null),
(null,6,'/image/fruit/fruit_19.jpg',null,null),
(null,7,'/image/fruit/fruit_22.jpg',null,null),
(null,8,'/image/fruit/fruit_25.jpg',null,null),
(null,9,'/image/fruit/fruit_31.jpg',null,null),
(null,10,'/image/fruit/fruit_32.jpg',null,null),
(null,11,'/image/fruit/fruit_34.jpg',null,null),
(null,12,'/image/fruit/fruit_36.jpg',null,null),
(null,13,'/image/fruit/fruit_37.jpg',null,null),
(null,14,'/image/fruit/fruit_38.jpg',null,null),
(null,15,'/image/fruit/fruit_39.jpg',null,null),
(null,16,'/image/fruit/fruit_40.jpg',null,null);

INSERT INTO aq_fruit VALUES
(null,'青芒','越南小青芒5斤装','越南进口，乐享热带甜蜜滋味',null,5,39.50,46.00,null,10,0,'越南'),
(null,'香梨','新疆库尔勒香梨','清热解毒，润肺止咳',null,5,48.00,57.60,null,20,0,'中国'),
(null,'火龙果','越南白心火龙果5斤装','果汁丰盈，甜而不腻',null,5,59,70.00,null,10,0,'越南'),
(null,'凤梨','台湾金钻凤梨2只装','自然农法，不添加氮肥，足足.....',null,2,78.00,93.00,null,10,0,'中国'),
(null,'山竹',null,null,null,4,24.80,29.80,null,10,1,'泰国'),
(null,'进口富士王',null,null,null,4,49.80,69.80,null,10,1,'泰国'),
(null,'林师傅 哈密瓜',null,null,null,1,40.80,52.80,null,10,1,'泰国'),
(null,'国产车厘子',null,null,null,1,36.80,49.80,null,10,1,'泰国'),
(null,'香梨',null,null,null,1,16.80,23.80,null,10,1,'泰国'),
(null,'冰糖蜜梨',null,null,null,1,4.98,5.80,null,10,1,'泰国'),
(null,'进口香蕉',null,null,null,1,5.38,7.80,null,10,1,'泰国'),
(null,'桂圆1','进口桂圆1',null,null,5,17.80,19.80,null,10,1,'泰国'),
(null,'桂圆2',null,null,null,3,18.80,19.80,null,20,0,'中国'),
(null,'桂圆3','进口桂圆2',null,null,5,19.80,19.80,null,10,0,'泰国'),
(null,'桂圆4',null,null,null,2,20.80,19.80,null,20,1,'中国'),
(null,'桂圆5','进口桂圆3',null,null,1,28.80,19.80,null,10,1,'越南'),
(null,'桂圆6','进口桂圆4',null,null,4,38.80,19.80,null,10,1,'马来西亚'),
(null,'桂圆7','进口桂圆5',null,null,2,14.80,19.80,null,30,1,'美国'),
(null,'桂圆8','进口桂圆6',null,null,3,25.80,19.80,null,30,0,'英国'),
(null,'香蕉1','香甜香蕉1',null,null,1,15.80,19.80,null,50,1,'中国'),
(null,'香蕉2','香甜香蕉12',null,null,5,24.80,19.80,null,70,1,'马来西亚'),
(null,'香蕉3','香甜香蕉22',null,null,6,27.80,19.80,null,40,0,'菲律宾'),
(null,'香蕉4','香甜香蕉14',null,null,5,13.80,19.80,null,60,0,'美国'),
(null,'香蕉5','香甜香蕉15',null,null,4,10.80,19.80,null,60,1,'法国'),
(null,'香蕉6','香甜香蕉8',null,null,3,24.80,19.80,null,50,1,'新加坡'),
(null,'香蕉7','香甜香蕉12',null,null,2,35.80,19.80,null,70,1,'老挝'),
(null,'香蕉8','香甜香蕉9',null,null,1,30.80,19.80,null,10,0,'日本'),
(null,'香蕉9','香甜香蕉12',null,null,5,28.80,19.80,null,20,1,'韩国'),
(null,'车厘子1','进口超甜车厘子',null,null,5,2.80,19.80,null,40,1,'马来西亚'),
(null,'车厘子2','进口超甜车厘子2',null,null,4,18.80,19.80,null,50,0,'菲律宾'),
(null,'车厘子3','超甜车厘子',null,null,5,34.80,19.80,null,30,1,'美国'),
(null,'车厘子4','进口车厘子',null,null,2,13.80,19.80,null,20,1,'新加坡'),
(null,'车厘子5','进口超甜车厘子13',null,null,3,25.80,19.80,null,70,0,'老挝'),
(null,'车厘子6','韩国车厘子',null,null,5,11.80,19.80,null,20,1,'韩国'),
(null,'车厘子7','进口超甜车厘子7',null,null,6,12.80,19.80,null,30,1,'英国'),
(null,'车厘子8','进口超甜车厘子3',null,null,4,28.80,19.80,null,60,1,'泰国'),
(null,'鲜桃','国产鲜桃',null,null,2,18.80,19.80,null,20,0,'中国'),
(null,'鲜桃2','进口鲜桃',null,null,3,28.80,19.80,null,10,1,'泰国'),
(null,'葡萄','国产甜葡萄',null,null,4,18.80,19.80,null,20,1,'中国'),
(null,'葡萄2','进口甜葡萄',null,null,3,12.80,19.80,null,10,0,'泰国'),
(null,'苹果','国产甜苹果',null,null,2,19.80,19.80,null,20,1,'中国'),
(null,'火龙果','国产甜葡萄',null,null,5,12.80,19.80,null,60,0,'中国'),
(null,'山竹1',null,null,null,5,24.80,29.80,null,20,0,'中国'),
(null,'山竹2',null,null,null,2,24.80,29.80,null,30,1,'韩国'),
(null,'山竹3',null,null,null,3,24.80,29.80,null,40,0,'英国'),
(null,'山竹4',null,null,null,5,24.80,29.80,null,50,0,'马来西亚'),
(null,'山竹5',null,null,null,4,24.80,29.80,null,70,1,'新加坡'),
(null,'山竹6',null,null,null,5,24.80,29.80,null,10,1,'越南'),
(null,'山竹7',null,null,null,1,24.80,29.80,null,10,0,'泰国'),
(null,'山竹8',null,null,null,3,24.80,29.80,null,30,0,'老挝')
;

INSERT INTO aq_shoppingcart_item VALUES(1,1,1,1,1);






/*INSERT INTO aq_fpic VALUES
(null,'/image/fruit/fruit_03.jpg',),
(null,'/image/fruit/fruit_04.jpg'),
(null,'/image/fruit/fruit_07.jpg'),
(null,'/image/fruit/fruit_09.jpg');*/