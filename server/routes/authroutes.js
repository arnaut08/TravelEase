const express = require("express"),
router = express.Router(),
bcrypt = require("bcrypt"),
jwt = require("jsonwebtoken"),
nodemailer = require("nodemailer"),
auth = require("../middleware/authentication"),
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

// To reset password
const resetPw = (password,email) => {
    const sql = `UPDATE auth SET password='${password}' WHERE email='${email}'`
    con.query(sql,(err)=>{
        if(err){
            console.log(err)
        }
    })
}

// To compare entered password with the user's password in the database
const checkPw = (email,password) => {
    return new Promise((resolve,reject)=>{
        const sql = `SELECT * FROM auth WHERE email='${email}';`
        con.query(sql,(err,result)=>{
            if(err){
                reject({"msg":"Error Occurred"})
            }else{
            bcrypt.compare(password,result[0].password).then(authenticated=>{
                if(authenticated){
                    resolve("Correct Password");
                } else {
                    resolve("Incorrect Password")  
                }
            })}
        })
    })
}

// User Registration 
router.post("/signup",async (req,res)=>{
    const user = req.body;
    const { email, password } = user;
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
    const sql = `SELECT * FROM auth LEFT JOIN users ON authId=user_auth WHERE email='${email}';`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":err})
        }else if(result.length==0){
            res.send({"msg":"Invalid Credentials"})
        }else{
        bcrypt.compare(password,result[0].password).then(authenticated=>{
            if(authenticated){
                const payload={user:email};
                const options={expiresIn:3600000};
                const secret="gloryglorymanchesterunited";
                const token= jwt.sign(payload,secret,options);
                res.send({"token":token,expiry:options.expiresIn,"role":result[0].role});
            } else {
                res.send({"msg":"Invalid Credentials"})  
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


// To change a user's password
router.put("/changePassword", auth, async(req,res)=>{
    const email = req.user;
    const { oldPassword, newPassword } = req.body;
    console.log(oldPassword, newPassword);
    const msg = await checkPw(email,oldPassword);
    console.log(msg);
    if(msg=="Incorrect Password"){
        res.send({"msg":msg})
    } else {
        const hashedpw = await hashpw(newPassword);
        const sql = `UPDATE auth SET password='${hashedpw}' WHERE email='${email}'`;
        con.query(sql,(err)=>{
            if(err){
                res.send({"msg":"Error Occurred"})
            } else {
                res.send({"msg":"Password Changed"})
            }
        })
    }
})

module.exports = router;
