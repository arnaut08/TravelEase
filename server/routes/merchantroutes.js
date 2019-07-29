const express = require("express"),
router = express.Router(),
auth = require("../middleware/authentication"),
con=require('../common/database');


const getCompany=(email)=>{
    return new Promise((resolve, reject) => {
        query=  `SELECT merchantId FROM Merchants LEFT JOIN Users ON owner=userId LEFT JOIN Auth ON authId=user_auth WHERE email='${email}' ;` 
            con.query(query,(err,result)=>{
                if(err) throw err;
                resolve(result[0].merchantId);
            })
        });
}

const getBusesCount=(search)=>{
    return new Promise((resolve, reject) => {
        sql= `SELECT COUNT(busId) AS count FROM Buses LEFT JOIN Merchants ON company=merchantId 
        WHERE busTitle LIKE '%${search}%' OR busDescription LIKE '%${search}%' OR busCategory LIKE '%${search}%' ;` 
            con.query(sql,(err,result)=>{
                if(err) throw err;
                resolve(result[0]);
            })
        });
}


// To add a bus
router.post("/bus/add",auth,async(req,res)=>{
    const {email, busCategory, busDescription, busTitle, terms} = req.body;
    const company = await getCompany(email);
    const sql=`INSERT INTO Buses(busTitle, busDescription, busCategory, terms, company) VALUES
    ('${busTitle}','${busDescription}','${busCategory}','${terms}',${company});`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error Occurred"})
        }
        res.send({"msg":"Bus Added"})
    })  
})


// To get details of a particular bus
router.get("/bus/:id",auth,(req,res)=>{
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
router.get("/bus",auth,async(req,res)=>{
    const {search} = req.query;
    const allBuses= await getBusesCount(search);
    res.send(allBuses)
})

// To delete a bus
router.delete("/bus/:id",auth,(req,res)=>{
    const id=req.params.id;
    const sql=`DELETE FROM Buses WHERE busId=${id};`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error occurred"})
        }
        res.send({"msg":"Bus Details Deleted"})
    })
})

// To edit a bus
router.put("/bus/:id",auth,(req,res)=>{
    const id=req.params.id;
    const {busTitle,busDescription,busCategory,terms}=req.body;
    const sql=`UPDATE Buses SET busTitle='${busTitle}', busDescription='${busDescription}',
    busCategory='${busCategory}', terms='${terms}' WHERE busId=${id};`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error occurred"})
        }
        res.send({"msg":"Bus Details Updated"})
    })
})

// To add a Timetable
router.post("/timetable/add",auth,async(req,res)=>{
    const {source,destination,route,date,time,capacity,price,id} = req.body;
    const sql=`INSERT INTO Timetable(source, destination, route, date, time, capacity, available, price, bus)
    VALUES  ('${source}','${destination}','${route}','${date}','${time}',${capacity},${capacity},${price},${id});`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error Occurred"})
        }
        res.send({"msg":"Timetable added"})
    })  
})

// To get timetable details of a particular bus
router.get("/:id/timetable",auth,async(req,res)=>{
    const id = req.params.id
    sql= `SELECT * FROM Timetable LEFT JOIN Buses ON bus=busId WHERE busId=${id};` 
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error occurred"})
        };
        if(result.length==0){
            res.send({"msg":"Current bus has no timetables"});
            return
        }
        res.send(result);
    })
});

// To get a particular timetable
router.get("/timetable/:id",auth,(req,res)=>{
    const id = req.params.id;
    const sql = `SELECT * FROM Timetable WHERE tId=${id}`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"error occurred"})
        }
        res.send(result[0])
    })
})

// To edit a timetable
router.put("/timetable/:id",auth,(req,res)=>{
    const id=req.params.id;
    const {source,destination,route,date,time,capacity,price} = req.body;
    const sql=`UPDATE Timetable SET source='${source}', destination='${destination}',
    route='${route}', date='${date.substring(0,10)}', time='${time}', capacity=${capacity}, price=${price}
    WHERE tId=${id};`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error occurred"})
        }
        res.send({"msg":"Timetable Updated"})
    })
})

// To delete a timetable
router.delete("/timetable/:id",auth,(req,res)=>{
    const id=req.params.id;
    const sql=`DELETE FROM Timetable WHERE tId=${id};`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error occurred"})
        }
        res.send({"msg":"Timetable Deleted"})
    })
})


// To get all customers of a particular
router.get("/customers",auth,(req,res)=>{
    const {email} = req.query;
    console.log(email);
    const sql = `SELECT * FROM Bookings LEFT JOIN Travellers ON booking=bookingId LEFT JOIN Timetable ON bookedBus = tId LEFT JOIN Buses 
    ON bus = busId LEFT JOIN Users ON bookedBy = userId LEFT JOIN Auth on user_auth = authId WHERE company=( SELECT merchantId FROM Merchants 
    LEFT JOIN Users ON owner = userId LEFT JOIN Auth on user_auth = authId WHERE email ='${email}')`;
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"error occurred"})
        }
        console.log(result)
        res.send(result)
    })
})

// To get details of all the buses with pagination
router.get("/bus/view/:page",auth,async(req,res)=>{
    const {search} = req.query;
    console.log(search);
    const page = req.params.page
    sql= `SELECT * FROM Buses LEFT JOIN Merchants ON company=merchantId WHERE busTitle LIKE '%${search}%' 
    OR busDescription LIKE '%${search}%' OR busCategory LIKE '%${search}%' LIMIT ${(page-1)*2}, 2 ;` 
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"error"})
        }
        res.send(result);
    })
})


module.exports = router;