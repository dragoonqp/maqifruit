const express = require('express');
const pool = require('../pool.js');
var router = express.Router();

//用户查询路由
router.get('/user_admin_list',(req,res)=>{
	
	var $pageNo = parseInt(req.query.pageNo);
	var $count = parseInt(req.query.count);
	//验证查询起始行和显示数量是否合法
	if($pageNo<1 || $count<1){
		res.send('查询条件不正确');
	}
	console.log($count*($pageNo-1),$count);
	//查询数据库用户表数据
	
	pool.query('SELECT * FROM aq_user LIMIT ?,?',[$count*($pageNo-1),$count],(err1,result1)=>{
		if(err1){throw err1;}
		var result = result1;
		//console.log(result);
		pool.query('SELECT COUNT(*) AS tCount FROM aq_user',(err2,result2)=>{
			if(err2){throw err2}
				result=result.concat(result2);
				//console.log(result);
				res.send(result);
		});
	});
});
router.get('/updateload',(req,res)=>{
	var $uidp = req.query.uidp;
	console.log($uidp);
	pool.query('SELECT * FROM aq_user WHERE uid=?',[$uidp],(err,result)=>{
		if(err){throw err}
		if(result.length>0){
			console.log(result);
			res.send(result);
		}
	});
});
router.post('/userDel',(req,res)=>{
	var $uid = req.body.uid;
	if(!$uid){
		res.send('uid required');
		return;
	}
	pool.query('DELETE FROM aq_user WHERE uid=?',[$uid],(err,result)=>{
		if(err){throw err;}
		if(result.affectedRows>0){
			res.send({code:201,msg:'delete success'});
		}else{
			res.send({code:401,msg:'delete failed'});
		}
	});
});
router.post('/update',(req,res)=>{
	var $uid=req.body.uid;
	var $email=req.body.email;
	var $phone=req.body.phone;
	var $userName=req.body.userName;
	var $gender=req.body.gender;
	var $avatar=req.body.avatar;
	if(!$uid){
		res.send({code:301,msg:'uid required'});
		return;
	}
	pool.query('UPDATE aq_user SET email=?,phone=?,userName=?,gender=?,avatar=? WHERE uid=?',[$email,$phone,$userName,$gender,$avatar,$uid],(err,result)=>{
		if(err){throw err;}
		if(result.affectedRows>0){
			res.send({code:202,msg:'update success'});
		}else{
			res.send({code:302,msg:'update failed'});
		}
	});
});


module.exports=router;