const express=require("express"),
app=express(),
parser=require("body-parser"),
override=require("method-override"),
bcrypt=require("bcrypt"),
jwt=require("jsonwebtoken"),
nodemailer=require("nodemailer"),
mysql=require("mysql");

//Cross Origin Access (To call node APIs from angular)
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    next();
    });

app.use(express.json());
app.use(parser.urlencoded({extended:true}));
app.use(override("_method"));

// Database Connection Object
const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"EvalTaskDb"
});

con.connect ((err)=>{
    if(err){
        throw err;
    }  
})

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'qweasdzxc.112897@gmail.com',
        pass:'qwerty@12345'
    }
});


// To enter authentication records
const createAuth = (user,hashedpw) => {
    const {email} = user;
    return new Promise((resolve, reject) => {
        const query1 = `INSERT INTO Auth(email, password, token) VALUES ('${email}','${hashedpw}','anotherrandom');`
        con.query(query1,(err,result)=>{
            resolve(result.insertId);
        });
    })
}

// To enter user details
const createUseDetails = (user,authId,role='user') => {
    const { firstName, lastName, phone, dob} = user;
    return new Promise((resolve, reject) => {
    query2=  `INSERT INTO Users(firstName, lastName, phone, DOB, role, user_auth) VALUES ('${firstName}','${lastName}', ${phone}, '${dob}','${role}', ${authId});` 
        con.query(query2,(err,result)=>{
            if(err) throw err;
            resolve(result.insertId);
            
        })
    });
}

// To hash the password
const hashpw=(password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.hash(password,10,(err,hash)=>{
        resolve(hash)
        })
    })
}

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

const getCompany=(email)=>{
    return new Promise((resolve, reject) => {
        query=  `SELECT merchantId FROM Merchants LEFT JOIN Users ON owner=userId LEFT JOIN Auth ON authId=user_auth WHERE email='${email}' ;` 
            con.query(query,(err,result)=>{
                if(err) throw err;
                resolve(result[0].merchantId);
            })
        });
}

const getBuses=()=>{
    return new Promise((resolve, reject) => {
        sql= `SELECT * FROM Buses LEFT JOIN Merchants ON company=merchantId ;` 
            con.query(sql,(err,result)=>{
                if(err) throw err;
                resolve(result);
            })
        });
}



// User Registration 
app.post("/signup",async (req,res)=>{
    const user = req.body;
    const {password}=user;
    const hashedpw = await hashpw(password);
    const authId = await createAuth(user,hashedpw);
    const userDetailId = await createUseDetails(user, authId);
    res.send({"message":"Signed up"})
});

// Common Login
app.post("/login",(req,res)=>{
    const {email,password} = req.body;
    const sql=`SELECT * FROM Auth LEFT JOIN Users ON authId=user_auth WHERE email='${email}';`

    con.query(sql,(err,result)=>{
        if(err){
            res.send({"error":err})
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

// To add Merchants
app.post("/merchant/add",async (req,res)=>{
    const user = req.body;
    const {password}=user;
    const {email}=user;
    const hashedpw = await hashpw(password);
    const authId = await createAuth(user,hashedpw);
    const userDetailId = await createUseDetails(user, authId, "merchant");
    const merchantId= await createMerchant(user,userDetailId);
    sendPassword(email,password);
    res.send({"msg":"merchant added"}) 
})

// To fetch merchant details
app.get("/merchant",async(req,res)=>{
    const allMerchants= await getMerchants();
    res.send(allMerchants)
})


// To fetch particular merchant's details
app.get("/merchant/:id",(req,res)=>{
    const id = req.params.id;
    const sql = `SELECT * FROM Merchants LEFT JOIN Users ON owner=userId LEFT JOIN Auth ON authId=user_auth WHERE merchantId=${id}`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"error occurred"})
        }
        res.send(result[0])
    })
})

// To edit merchant's details
app.put("/merchant/:id",(req,res)=>{
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
app.delete("/merchant/:id",(req,res)=>{
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

// To add a bus
app.post("/bus/add",async(req,res)=>{
    const {email, busCategory, busDescription, busTitle, terms} = req.body;
    const company = await getCompany(email);
    const sql=`INSERT INTO Buses(busTitle, busDescription, busCategory, terms, company) VALUES
    ('${busTitle}','${busDescription}','${busCategory}','${terms}',${company});`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error Occurred"})
        }
        res.send({"msg":"Bus added"})
    })  
})


// To get details of a particular bus
app.get("/bus/:id",(req,res)=>{
    const id = req.params.id;
    const sql = `SELECT * FROM Buses WHERE busId=${id}`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"error occurred"})
        }
        res.send(result[0])
    })
})

// To get details of all the buses
app.get("/bus",async(req,res)=>{
    const allBuses= await getBuses();
    res.send(allBuses)
})

// To delete a bus
app.delete("/bus/:id",(req,res)=>{
    const id=req.params.id;
    const sql=`DELETE FROM Buses WHERE busId=${id};`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error occurred"})
        }
        res.send({"msg":"Bus Deleted"})
    })
})

// To edit a bus
app.put("/bus/:id",(req,res)=>{
    const id=req.params.id;
    const {busTitle,busDescription,busCategory,terms}=req.body;
    const sql=`UPDATE Buses SET busTitle='${busTitle}', busDescription='${busDescription}',
    busCategory='${busCategory}', terms='${terms}' WHERE busId=${id};`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error occurred"})
        }
        res.send({"msg":"Updated"})
    })
})


app.listen(3000,()=>{
    console.log("Connected")
});
