
//引入必要的模块
const express = require('express');
const userRouter = require('./routers/user.js');
const productRouter = require('./routers/product.routes.js');
const bodyPaser = require('body-parser');
const user_adminRouter = require('./routers/user_admin.js');
const shopcart=require("./routers/shopcart.routes");
const session=require("express-session");
const cors=require("cors");
var app = express();
app.listen(5050);
app.use(bodyPaser.urlencoded({
	extended:false
}));
//使用被托管的静态资源
app.use(express.static('public'));
app.use(session({
	secret:"128位随机字符串",       //128位随机字符，安全令牌
	resave:false,   //每次请求是否创建session
	saveUninitialized:true,  //初始化值
	cookie:{					//将session id 保存到cookie
		maxAge:1000*60*60*24  //保存时间
	}
}))
app.use(cors({
	origin:["http://aqfruit.applinzi.com","https://aqfruit.applinzi.com","http://maqfruit.applinzi.com","https://maqfruit.applinzi.com"],
	credentials:true
}))

//使用路由器
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/user_admin',user_adminRouter);
app.use("/shopcart",shopcart);