const mysql=require("mysql");

// Database Connection Object
const con=mysql.createConnection({
    host:"192.168.2.90",
    user:"root",
    password:"root",
    database:"EvalTaskDb"
});

con.connect ((err)=>{
    if(err){
        console.log(err);
    }  
})

module.exports = con;