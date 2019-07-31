const express = require("express"),
router = express.Router(),
auth = require("../middleware/authentication"),
con=require('../common/database'),
multer = require("multer"),
storage = multer.diskStorage({destination: (req,file,cb)=>{
    cb(null,'uploads')
}, filename : (req,file,cb)=>{
    cb(null,req.user + "-" +file.originalname)
}
}),
upload = multer({storage : storage}).single('avatar');

// To get user details
router.get("/profile",auth,(req,res)=>{
    const email = req.user;
    const sql = `SELECT * FROM users LEFT JOIN auth ON authId = user_auth WHERE email='${email}'`;
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error Occurred"})
        } else {
            res.send(result[0])
        }
    })
})


// To change profile picture
router.post("/upload",auth,(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.send({"msg":"Error Occurred"})
        } else {
            console.log(req.user , req.file.path)
            const sql = `UPDATE users SET profilePic = '${req.file.path}' WHERE user_auth=(SELECT authId
                FROM auth WHERE email='${req.user}')`
            con.query(sql,(err,result)=>{
                if(err){
                    res.send({"msg":"Error Occurred"})
                }else{
                    res.send({"msg":"Image Uploaded"})
                }
            })
        }
    })
})

// To update user details
router.put("/profile/edit",auth,(req,res)=>{
    const { firstName, lastName, phone, dob } = req.body;
    sql = `UPDATE users SET firstName = '${firstName}', lastName = '${lastName}', phone = ${phone} , DOB = '${dob}'
    WHERE user_auth=(SELECT authId FROM auth WHERE email='${req.user}')`
    con.query(sql,(err)=>{
        if(err){
            res.send({"msg":"Error Occurred"})
        } else {
            res.send({"msg":"Profile Updated"})
        }
    })
})

module.exports = router;
