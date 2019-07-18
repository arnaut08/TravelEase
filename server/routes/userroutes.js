const express = require("express"),
router = express.Router(),
con=require('../common/database');


const getSource=()=>{
    return new Promise((resolve, reject) => {
        sql= `SELECT DISTINCT(source) FROM Timetable;` 
            con.query(sql,(err,result)=>{
                if(err) throw err;
                resolve(result);
            })
        });
}

const getDestination=()=>{
    return new Promise((resolve, reject) => {
        sql= `SELECT DISTINCT(destination) FROM Timetable;` 
            con.query(sql,(err,result)=>{
                if(err) throw err;
                resolve(result);
            })
        });
}

// To get all the timetables
router.get("/timetable",(req,res)=>{
    con.query("SELECT * FROM Timetable LEFT JOIN Buses ON bus=busID;",(err,result)=>{
        if(err){
            res.send({"msg":"Error Occurred"})
        }
        res.send(result)
    })
})

// To get distinct source and destination
router.get("/distinct",async(req,res)=>{
    const source = await getSource();
    const destination = await getDestination();
    res.send({"source":source,"destination":destination})
})

// To get buses as per the user's search params
router.get("/search",(req,res)=>{
    const {source,destination,date,category}=req.query;
    const sql= `SELECT * FROM Timetable LEFT JOIN Buses ON bus=busID LEFT JOIN Merchants ON
    merchantId=company WHERE source='${source}' AND destination='${destination}' AND date='${date}'
    AND busCategory='${category}';`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error Occurred"})
        }
        res.send(result)
    })
})

module.exports = router;