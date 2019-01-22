/*
* @Author: dragoonqp
* @Date:   2018-11-09 21:29:06
* @Last Modified by:   dragoonqp
* @Last Modified time: 2018-12-01 14:34:05
*/
const express = require('express');
const pool = require('../pool.js');
const router = express.Router();



//正常产品接口
router.get('/normallist',(req,res)=>{
	
	//多表查询出产品的所有产品信息和图片地址。
	pool.query('SELECT *,GROUP_CONCAT(aq_fpic.pid),GROUP_CONCAT(aq_fpic.spic),GROUP_CONCAT(aq_fpic.mpic),GROUP_CONCAT(aq_fpic.lpic) FROM aq_fruit LEFT JOIN aq_fpic ON aq_fruit.fId=aq_fpic.fid WHERE aq_fruit.isOnsale=0 GROUP BY aq_fruit.fId LIMIT 0,4',(err,result)=>{
		if(err){throw err;}
		//console.log(result);

		if(result.length>0){
			res.send(result);
		}
		//result=result1;
		/*pool.query('SELECT spic FROM aq_fpic WHERE pid=(SELECT picsId FROM aq_fruit WHERE isOnsale=0 LIMIT 0,4)',(err2,result2)=>{
			if(err2){throw err2}
			//result=result.concat(result2);
			console.log(result2);
			//if(result2.length>0){
				for(var i=0;i<result1.length){
					result1[i].spic
				}

		});*/
		//res.send(result);
	});
});
//礼篮产品接口
router.get('/giftBasketlist',(req,res)=>{
	pool.query('SELECT * FROM aq_fruit WHERE fruitClass=30',(err,result)=>{
		if(err){throw err;}
		res.send(result);
	});
});
//促销产品接口
router.get('/Onsalelist',(req,res)=>{
	pool.query('SELECT * FROM aq_fruit LEFT JOIN aq_fpic ON aq_fruit.fId=aq_fpic.fid WHERE aq_fruit.isOnsale=1 LIMIT 0,8',(err,result)=>{
		//console.log(result);
		if(err){throw err;}
		if(result.length>0){
			res.send(result);
		}
	});
});

// 不同分类产品列表接口
router.get("/productlist",(req,res)=>{
	var $classname=req.query.classname;
	var $pageNo=req.query.pageNo;
	var QPP=parseInt(req.query.QPP);
	console.log(typeof req.query.sortby,req.query.sortby)
    if(req.query.sortby=="null" || req.query.sortby==undefined || req.query.sortby=="undefined"){
        var $sortBy="aq_fruit.fId";
        var $sortMethod="ASC";
	}else{
        var $sortBy=req.query.sortby.split("_")[0];
        var $sortMethod=req.query.sortby.split("_")[1];
	}
	if($classname==undefined || $classname=="undefined"){
		$classname="all"
	}
	if($classname!="null" || $classname!=undefined) {
		
        if (!!$classname && $classname != "all") {
        	//console.log($sortBy)
            //console.log($sortMethod)
            //LEFT JOIN aq_fpic ON aq_fruit.picsId=aq_fpic.pid
            pool.query("SELECT *,GROUP_CONCAT(aq_fpic.pid),GROUP_CONCAT(aq_fpic.spic),GROUP_CONCAT(aq_fpic.mpic),GROUP_CONCAT(aq_fpic.lpic) FROM aq_fruit LEFT JOIN aq_fpic ON aq_fruit.fId=aq_fpic.fid  WHERE  fruitClass=? GROUP BY aq_fruit.fId ORDER BY "+$sortBy +" "+ $sortMethod+" LIMIT ?,?", [$classname,15 * ($pageNo - 1), QPP], (err, result1) => {
                if (err) {
                    throw err;
                }
                var result = result1;
                //console.log(result);
                pool.query('SELECT COUNT(*) AS tCount FROM aq_fruit WHERE fruitClass=?', [$classname], (err2, result2) => {
                    if (err2) {
                        throw err2
                    }
                    result = result.concat(result2);
                    //console.log(result);
                    res.send(result);
                });
            });
            // LEFT JOIN aq_fpic ON aq_fruit.picsId=aq_fpic.pid
        } else if (!!$classname && $classname == "all") {
        	//console.log($sortBy)
            //console.log($sortMethod)
            pool.query("SELECT *,GROUP_CONCAT(aq_fpic.pid),GROUP_CONCAT(aq_fpic.spic),GROUP_CONCAT(aq_fpic.mpic),GROUP_CONCAT(aq_fpic.lpic) FROM aq_fruit LEFT JOIN aq_fpic ON aq_fruit.fId=aq_fpic.fid GROUP BY aq_fruit.fId ORDER BY "+$sortBy+" "+$sortMethod+" LIMIT ?,?", [15 * ($pageNo - 1), QPP], (err, result1) => {
                if (err) {
                    throw err;
                }

                var result = result1;
                pool.query('SELECT COUNT(*) AS tCount FROM aq_fruit', (err2, result2) => {
                    if (err2) {
                        throw err2
                    }
                    result = result.concat(result2);
                    //console.log(result);
                    res.send(result);
                });
            });
        }
    }
});
router.get("/search",(req,res)=>{
	var kwords=req.query.kwords;
	console.log(kwords);
})


//产品详情页信息获取接口
router.get('/product_detail',(req,res)=>{
	var $fId=req.query.fId;
	pool.query("SELECT * FROM aq_fruit  WHERE fId=?",[$fId],(err,result)=>{
		if(err){throw err;}
			pool.query("SELECT * FROM aq_fpic WHERE fid=?",[$fId],(err,result2)=>{
				if(err){throw err;}
				if(result2.length>0){
					result=result.concat(result2);
				}
				res.send(result);
			})
	});
});

router.get("/prouductcount",(req,res)=>{
	pool.query("SELECT COUNT(*) AS Pcount FROM aq_fruit",(err,result)=>{
		if(err){ throw err;}
		res.send(result);
	})
})

router.get("/getComments",(req,res)=>{
	var fid=parseInt(req.query.fid);
	var QPP=parseInt(req.query.QPP);
	var cpno=parseInt(req.query.cpno);
	if(!fid){
		res.send({code:301,msg:"uid required"})
		return;
	}
	pool.query("SELECT *,(SELECT avatar FROM aq_user WHERE aq_user.uid=aq_productComment.userId) AS avatar,(SELECT uname FROM aq_user WHERE aq_user.uid=aq_productComment.userId) AS uname,(SELECT COUNT(cid) FROM aq_productComment WHERE fid=?) AS commentQTY FROM aq_productComment  WHERE fid=? ORDER BY cTime DESC LIMIT ?,?",[fid,fid,(cpno-1)*QPP,QPP],(err,result)=>{
		if(err){throw err}
		if(result.length>0){
			res.send(result)
		}
	})
})

router.get("/getCommentsQTY",(req,res)=>{
    var fid=parseInt(req.query.fid);
    if(!fid){
        res.send({code:301,msg:"fid required"})
        return;
    }
    pool.query("SELECT COUNT(cid) AS CommentsQTY FROM aq_productComment WHERE fid=?",[fid],(err,result)=>{
        if(err){throw err}
        if(result.length>0){
            res.send(result)
        }
    })
})

router.post("/addComments",(req,res)=>{
	var uid=req.session.uid;
	var fid=req.body.fid;
	var score=parseInt(req.body.score);
	var cmtContent=req.body.cmtContent;
	if(!uid){
		res.send({code:301,msg:"uid required"})
	}
	pool.query("INSERT INTO aq_productComment VALUES(null,?,now(),?,?,?);",[cmtContent,fid,uid,score],(err,result)=>{
		if(err){throw err}
		if(result.affectedRows>0){
			res.send({code:201,msg:"comment success"})
		}else{
			res.send({code:101,msg:"commnt failed"})
		}
	})
})

module.exports=router;