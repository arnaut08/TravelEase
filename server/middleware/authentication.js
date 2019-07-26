const con=require('../common/database'),
jwt=require("jsonwebtoken");

const auth = (req,res,next)=>{
    const token = req.headers.auth
    if(!token){
        res.send({"msg":"Authentication Required"})
    }  else {
    user = jwt.decode(token)["user"];
    sql = `SELECT * FROM Auth WHERE email= '${user}'`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"error occurred while authenticating"})
        }else if(result.length==0){
            res.send({"msg":"Authentication Required"})
        }else {
            req.user=user;
            next()
        }
    })
    }
}

module.exports = auth;