const express = require("express"),
router = express.Router(),
bcrypt = require("bcrypt"),
jwt = require("jsonwebtoken"),
nodemailer = require("nodemailer"),
con = require('../common/database');

const {createAuth, createUserDetails, hashpw, checkUser} = require('../common/functions')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'qweasdzxc.112897@gmail.com',
        pass:'qwerty@12345'
    }
});

const sendLink = (email, token) => {
    transporter.sendMail({
        from:'qweasdzxc.112897@gmail.com',
        to:email,
        subject:'Reset Password',
        text:`http://192.168.2.90:4200/reset?id=${token}`
    },(err)=>{
        if(err){
            console.log(err)
        } else{
            console.log("email sent")
        }
    })    
}

const resetPw = (password,email) => {
    const sql = `UPDATE Auth SET password='${password}' WHERE email='${email}'`
    con.query(sql,(err)=>{
        if(err){
            console.log(err)
        }
    })
}

// User Registration 
router.post("/signup",async (req,res)=>{
    const user = req.body;
    const { email, password} = user;
    const exists = await checkUser(email);
    if(exists.length!=0){
        res.send({"msg":"Email already exists"})
        return
    }
    const hashedpw = await hashpw(password);
    const authId = await createAuth(user,hashedpw);
    const userDetailId = await createUserDetails(user, authId);
    res.send({"msg":"Signed up"})
});

// Common Login
router.post("/login",(req,res)=>{
    const {email,password} = req.body;
    const sql = `SELECT * FROM Auth LEFT JOIN Users ON authId=user_auth WHERE email='${email}';`
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
                const secret="gloryglorymanchesterunited";
                const token= jwt.sign(payload,secret,options);
                res.send({"token":token,expiry:options.expiresIn,"msg":"Logged In","role":result[0].role});
            } else {
                res.send({"msg":"Error"})  
            }
        })}
    })
})

// If user forgets their password (To send an email containing a link to reset password)
router.post("/forgot",async (req,res)=>{
    const {email} = req.body;
    const exists = await checkUser(email);
    if(exists.length==0){
        res.send({"msg":"Email Doesn't exists"})
        return
    }
    const payload={user:email};
    const options={expiresIn:3600000};
    const secret="gloryglorymanchesterunited";
    const token= jwt.sign(payload,secret,options);
    sendLink(email,token);
    res.send({"msg":"Email Sent"})
})

// Check Reset token of a user
router.post("/reset/checkToken",(req,res)=>{
    const {token} = req.body;
    if(jwt.decode(token)==null){
        res.send({"msg":"Token is invalid"})
    } else if ((jwt.decode(token)['exp'] * 1000)<Date.now()){
        res.send({"msg":"Token is has expired"})
    } else {
        res.send({"msg":"Valid Token"})
    }
})

// To reset a user's password
router.post("/reset",async(req,res)=>{
    const { token, password} = req.body;
    // console.log(token,password);
    const email = jwt.decode(token)['user']
    const hashedpw = await hashpw(password);
    resetPw(hashedpw,email);
    res.send({"msg":"Password changed successfully"})
})

module.exports = router;
