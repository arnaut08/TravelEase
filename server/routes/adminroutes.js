const express = require("express"),
router = express.Router(),
nodemailer=require("nodemailer"),
con=require('../common/database');

const {createAuth, createUserDetails, hashpw} = require('../common/functions')


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'qweasdzxc.112897@gmail.com',
        pass:'qwerty@12345'
    }
});

// To insert Merchant details
const createMerchant=(user,userDetailId)=>{
    const {companyName}=user;
    return new Promise((resolve, reject) => {
        query2=  `INSERT INTO Merchants(companyName, owner) VALUES ('${companyName}', ${userDetailId});` 
            con.query(query2,(err,result)=>{
                if(err) throw err;
                resolve(result.insertId);
            })
        });
}

// To get Merchants
const getMerchants=()=>{
    return new Promise((resolve, reject) => {
        query=  `SELECT * FROM Merchants LEFT JOIN Users ON owner=userId ;` 
            con.query(query,(err,result)=>{
                if(err) throw err;
                resolve(result);
            })
        });
}

// To Send mail containing the password to the added merchant
const sendPassword=(email,password)=>{
    transporter.sendMail({
        from:'qweasdzxc.112897@gmail.com',
        to:email,
        subject:'Account Credentials',
        text:`Email: ${email}
        Password: ${password}`
    },(err,info)=>{
        if(err){
            console.log(err)
        } else{
            console.log("email sent")
        }
    })
}


// To add Merchants
router.post("/merchant/add",async (req,res)=>{
    const user = req.body;
    const {password,email}=user;
    const hashedpw = await hashpw(password);
    const authId = await createAuth(user,hashedpw);
    const userDetailId = await createUserDetails(user, authId, "merchant");
    const merchantId= await createMerchant(user,userDetailId);
    sendPassword(email,password);
    res.send({"msg":"merchant added"}) 
})

// To fetch merchant details
router.get("/merchant",async(req,res)=>{
    const allMerchants= await getMerchants();
    res.send(allMerchants)
})


// To fetch particular merchant's details
router.get("/merchant/:id",(req,res)=>{
    const id = req.params.id;
    const sql = `SELECT * FROM Merchants LEFT JOIN Users ON owner = userId LEFT JOIN Auth ON authId = user_auth WHERE merchantId=${id}`
    con.query(sql, (err, result) => {
        if(err){
            res.send({"msg":"error occurred"})
        }
        res.send(result[0])
    })
})

// To edit merchant's details
router.put("/merchant/:id",(req,res)=>{
    const id=req.params.id;
    const {firstName,dob,lastName,phone,companyName,email}=req.body;
    const sql=`UPDATE Merchants LEFT JOIN Users ON owner=userId LEFT JOIN Auth ON authId=user_auth
    SET firstName='${firstName}', lastName='${lastName}', DOB='${dob}', phone=${phone}, email='${email}',
    companyName='${companyName}' WHERE merchantId=${id};`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error occurred"})
        }
        res.send({"msg":"Updated"})
    })
})

// To delete a merchant
router.delete("/merchant/:id",(req,res)=>{
    const id=req.params.id;
    const sql=`DELETE FROM Auth WHERE authId=(SELECT authId FROM Merchants LEFT JOIN 
        Users ON owner=userId LEFT JOIN Auth ON authId=user_auth WHERE merchantId=${id});`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error occurred"})
        }
        res.send({"msg":"Merchant Deleted"})
    })
})

module.exports = router;