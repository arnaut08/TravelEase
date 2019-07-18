const express = require("express"),
router = express.Router(),
bcrypt=require("bcrypt"),
jwt=require("jsonwebtoken"),
con=require('../common/database');

const {createAuth, createUserDetails, hashpw} = require('../common/functions')


// User Registration 
router.post("/signup",async (req,res)=>{
    const user = req.body;
    const {password}=user;
    const hashedpw = await hashpw(password);
    const authId = await createAuth(user,hashedpw);
    const userDetailId = await createUserDetails(user, authId);
    res.send({"message":"Signed up"})
});

// Common Login
router.post("/login",(req,res)=>{
    const {email,password} = req.body;
    const sql=`SELECT * FROM Auth LEFT JOIN Users ON authId=user_auth WHERE email='${email}';`

    con.query(sql,(err,result)=>{
        if(err){
            res.send({"error":err})
        }else if(result.length==0){
            res.send({"error":"Email Doesn't exist"})
        }else{
        bcrypt.compare(password,result[0].password).then(authenticated=>{
            if(authenticated){
                const payload={user:email};
                const options={expiresIn:3600000};
                const secret="gloryglorymanchesterunited"
                const token= jwt.sign(payload,secret,options);
                res.send({"token":token,expiry:options.expiresIn,"msg":"Success","role":result[0].role})
            } else {
                res.send({"msg":"Error"})  
            }
        })}
    })
})

module.exports = router;
