const mysql = require('mysql');
var pool = mysql.createPool({
	host:'w.rdc.sae.sina.com.cn',
	port:3306,
	user:'ml11yk110o',
	password:'01x2j4h0ilih5yjw0w5h1240h3xii5mkmjwk5014',
	database:'app_aqfruit',
	connectionLimit:20,
	multiplestatements:true
});

module.exports=pool;