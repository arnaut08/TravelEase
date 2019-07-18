const mysql=require("mysql");

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

module.exports = con;