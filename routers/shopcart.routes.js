const express=require("express");
const pool=require("../pool");
const router=express.Router();

router.post("/add",(req,res)=>{
    var fid=parseInt(req.body.fid);
    var uid=req.session.uid
    if(!fid){
        res.send({code:302,msg:'fid required'});
        return;
    }
    if(!uid){
        res.send({code:301,msg:'uid required'});
        return;
    }
    pool.query("SELECT * FROM aq_shoppingcart_item WHERE userId=?",[uid],(err,result)=>{
        if(err){throw err}
        if(result.length>0){
            var bool=result.some(function(elem,i,arr){
                return elem.productId==fid;
            })
        }
        if(bool){
            pool.query("UPDATE aq_shoppingcart_item SET count=(count+1) WHERE userId=? and productId=?",[uid,fid],(err,result)=>{
                if(err){throw err}
                if(result.affectedRows>0){
                    pool.query("SELECT *,(SELECT nUnitPrice FROM aq_fruit WHERE aq_fruit.fid=aq_shoppingcart_item.productId) AS nUnitPrice,(SELECT title FROM aq_fruit WHERE aq_fruit.fid=aq_shoppingcart_item.productId) AS title,(SELECT spic FROM aq_fpic WHERE aq_fpic.fid=aq_shoppingcart_item.productId LIMIT 1) AS spic FROM aq_shoppingcart_item WHERE userId=?",[uid],(err,result)=>{
                        if(err){throw err}
                        res.send(result);
                    })
                }
            })
        }else{
            pool.query("INSERT INTO aq_shoppingcart_item VALUES(null,?,?,1,1)",[uid,fid],(err,result)=>{
                if(err){throw err}
                if(result.affectedRows>0){
                    pool.query("SELECT *,(SELECT nUnitPrice FROM aq_fruit WHERE aq_fruit.fid=aq_shoppingcart_item.productId) AS nUnitPrice,(SELECT title FROM aq_fruit WHERE aq_fruit.fid=aq_shoppingcart_item.productId) AS title,(SELECT spic FROM aq_fpic WHERE aq_fpic.fid=aq_shoppingcart_item.productId LIMIT 1) AS spic FROM aq_shoppingcart_item WHERE userId=?",[uid],(err,result)=>{
                        if(err){throw err}
                        res.send(result);
                    })
                }
            })
        }
    })
})

router.post("/countchange",(req,res)=>{
    var uid=req.session.uid
    var fid=req.body.fid;
    var num=parseInt(req.body.num);
    var quantity=parseInt(req.body.quantity);
    if(!uid){
        res.send({code:301,msg:"uid required"});
        return
    }
    if(num>0) {//如果num大于0，则执行数据库操作对该用户的购物车商品+1
        pool.query("UPDATE aq_shoppingcart_item SET count=(count+?) WHERE userId=? and productId=?", [num, uid, fid], (err, result) => {
            if (err) {
                throw err
            }
            if (result.affectedRows > 0) {
                pool.query("SELECT *,(SELECT nUnitPrice FROM aq_fruit WHERE aq_fruit.fid=aq_shoppingcart_item.productId) AS nUnitPrice,(SELECT title FROM aq_fruit WHERE aq_fruit.fid=aq_shoppingcart_item.productId) AS title,(SELECT spic FROM aq_fpic WHERE aq_fpic.fid=aq_shoppingcart_item.productId LIMIT 1) AS spic FROM aq_shoppingcart_item WHERE userId=?", [uid], (err, result) => {
                    if (err) {
                        throw err
                    }
                    res.send(result);
                })
            }
        })
    }else if(num<0){
        //若果num小于0，则判断购物车该商品数量：为1则删除该商品记录，如果大于1则减少1.
        num=1
        pool.query("SELECT count FROM aq_shoppingcart_item WHERE userId=? and productId=?",[uid, fid],(err,result)=>{
            if(err){throw err}
            if(result.length>0){
                if(result[0].count==1){
                    pool.query("DELETE FROM aq_shoppingcart_item WHERE userId=? and productId=?",[uid, fid],(err,result)=>{
                        if(err){throw err}
                        if(result.affectedRows>0){
                            pool.query("SELECT *,(SELECT nUnitPrice FROM aq_fruit WHERE aq_fruit.fid=aq_shoppingcart_item.productId) AS nUnitPrice,(SELECT title FROM aq_fruit WHERE aq_fruit.fid=aq_shoppingcart_item.productId) AS title,(SELECT spic FROM aq_fpic WHERE aq_fpic.fid=aq_shoppingcart_item.productId LIMIT 1) AS spic FROM aq_shoppingcart_item WHERE userId=?", [uid], (err, result) => {
                                if (err) {
                                    throw err
                                }
                                res.send(result);
                            })
                        }
                    })
                }else{
                    pool.query("UPDATE aq_shoppingcart_item SET count=(count-?) WHERE userId=? and productId=?", [num, uid, fid], (err, result) => {
                        if (err) {
                            throw err
                        }
                        if (result.affectedRows > 0) {
                            pool.query("SELECT *,(SELECT nUnitPrice FROM aq_fruit WHERE aq_fruit.fid=aq_shoppingcart_item.productId) AS nUnitPrice,(SELECT title FROM aq_fruit WHERE aq_fruit.fid=aq_shoppingcart_item.productId) AS title,(SELECT spic FROM aq_fpic WHERE aq_fpic.fid=aq_shoppingcart_item.productId LIMIT 1) AS spic FROM aq_shoppingcart_item WHERE userId=?", [uid], (err, result) => {
                                if (err) {
                                    throw err
                                }
                                res.send(result);
                            })
                        }
                    })
                }
            }
        })
    }else if(quantity>0){
        pool.query("UPDATE aq_shoppingcart_item SET count=? WHERE userId=? and productId=?", [quantity, uid, fid],(err,result)=>{
            if(err){throw err}
            if(result.affectedRows>0){
                res.send({code:201,msg:"quantity update success"})
            }
        })
    }
})

router.post("/init",(req,res)=>{
    var uid=req.session.uid;
    if(!uid){
        res.send({code:301,msg:"uid required"})
        return;
    }
    pool.query("SELECT *,(SELECT nUnitPrice FROM aq_fruit WHERE aq_fruit.fid=aq_shoppingcart_item.productId) AS nUnitPrice,(SELECT title FROM aq_fruit WHERE aq_fruit.fid=aq_shoppingcart_item.productId) AS title,(SELECT spic FROM aq_fpic WHERE aq_fpic.fid=aq_shoppingcart_item.productId LIMIT 1) AS spic FROM aq_shoppingcart_item WHERE userId=?",[uid],(err,result)=>{
        if(err){throw err}
            res.send(result)
    })
})

router.post("/deleteItem",(req,res)=>{
    var uid=req.session.uid;
    var fid=req.body.fid;
    if(!uid){
        res.send({code:301,msg:"uid required"})
        return;
    }
    if(!fid){
        res.send({code:401,msg:"fid required"})
        return;
    }
    pool.query("DELETE FROM aq_shoppingcart_item WHERE userId=? and productId=?",[uid,fid],(err,result)=>{
        if(err){throw err}
        if(result.affectedRows>0){
            res.send({code:201,msg:"delete success",fid})
        }
    })
})

router.post("/clear",(req,res)=>{
    var uid=req.session.uid;
    if(!uid){
        res.send({code:301,msg:"uid required"});
        return;
    }
    pool.query("DELETE FROM aq_shoppingcart_item WHERE userId=?",[uid],(err,result)=>{
        if(err){ throw err}
        if(result.affectedRows>0){
            res.send({code:201,msg:"clear shopcart success"})
        }
    })
})

router.post("/detailadd",(req,res)=>{
    var uid=req.session.uid;
    var fid=req.body.fid;
    var qty=parseInt(req.body.qty);
    if(!uid){
        res.send({code:301,msg:"uid required"});
        return;
    }
    if(!fid){
        res.send({code:302,msg:"fid required"});
        return;
    }
    if(!qty){
        res.send({code:303,msg:"qty required"});
        return;
    }
    pool.query("SELECT * FROM aq_shoppingcart_item WHERE userId=?",[uid],(err,result)=>{
        if(err){throw err}
        if(result.length>0){
            var bool=result.some(function(elem,i,arr){
                return elem.productId==fid;
            })
        }
        if(bool){
            pool.query("UPDATE aq_shoppingcart_item SET count=(count+?) WHERE userId=? and productId=?",[qty,uid,fid],(err,result)=>{
                if(err){throw err}
                if(result.affectedRows>0){
                    pool.query("SELECT *,(SELECT nUnitPrice FROM aq_fruit WHERE aq_fruit.fid=aq_shoppingcart_item.productId) AS nUnitPrice,(SELECT title FROM aq_fruit WHERE aq_fruit.fid=aq_shoppingcart_item.productId) AS title,(SELECT spic FROM aq_fpic WHERE aq_fpic.fid=aq_shoppingcart_item.productId LIMIT 1) AS spic FROM aq_shoppingcart_item WHERE userId=?",[uid],(err,result)=>{
                        if(err){throw err}
                        res.send({code:201,data:result});
                    })
                }
            })
        }else{
            pool.query("INSERT INTO aq_shoppingcart_item VALUES(null,?,?,?,1)",[uid,fid,qty],(err,result)=>{
                if(err){throw err}
                if(result.affectedRows>0){
                    pool.query("SELECT *,(SELECT nUnitPrice FROM aq_fruit WHERE aq_fruit.fid=aq_shoppingcart_item.productId) AS nUnitPrice,(SELECT title FROM aq_fruit WHERE aq_fruit.fid=aq_shoppingcart_item.productId) AS title,(SELECT spic FROM aq_fpic WHERE aq_fpic.fid=aq_shoppingcart_item.productId LIMIT 1) AS spic FROM aq_shoppingcart_item WHERE userId=?",[uid],(err,result)=>{
                        if(err){throw err}
                        res.send({code:201,data:result});
                    })
                }
            })
        }
    })
})

module.exports=router;