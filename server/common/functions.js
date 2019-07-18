const bcrypt=require("bcrypt"),
con=require('../common/database');

// To enter authentication records
createAuth = (user,hashedpw) => {
    const {email} = user;
    return new Promise((resolve, reject) => {
        const query1 = `INSERT INTO Auth(email, password, token) VALUES ('${email}','${hashedpw}','anotherrandom');`
        con.query(query1,(err,result)=>{
            resolve(result.insertId);
        });
    })
}

// To enter user details
createUserDetails = (user,authId,role='user') => {
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
hashpw=(password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.hash(password,10,(err,hash)=>{
        resolve(hash)
        })
    })
}

module.exports = {createAuth, createUserDetails, hashpw};
