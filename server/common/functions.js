const bcrypt=require("bcrypt"),
con=require('../common/database');

// To enter authentication records
const createAuth = (user,hashedpw) => {
    const {email} = user;
    return new Promise((resolve, reject) => {
        const query1 = `INSERT INTO Auth(email, password) VALUES ('${email}','${hashedpw}');`
        con.query(query1,(err,result)=>{
            if(err){
                console.log(err);
                reject(err);
            }
            console.log(result.insertId)
            resolve(result.insertId);
        });
    })
}

// To enter user details
const createUserDetails = (user,authId,role='user') => {
    const { firstName, lastName, phone, dob} = user;
    return new Promise((resolve, reject) => {
    query2=  `INSERT INTO Users(firstName, lastName, phone, DOB, role, user_auth) VALUES ('${firstName}',"${lastName}", ${phone}, '${dob}','${role}', ${authId});` 
        con.query(query2,(err,result)=>{
            if(err){
                console.log(err);
                reject(err);
            }
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


// To check for an existing email
const checkUser=(email)=>{
    return new Promise((resolve,reject)=>{
        const sql = `SELECT * FROM Auth WHERE email='${email}'`;
        con.query(sql,(err,result)=>{
            if(err){
                console.log(err);
                reject(err);
            }
            resolve(result)
        })
    })
}

module.exports = {createAuth, createUserDetails, hashpw, checkUser};
