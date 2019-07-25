const express = require("express"),
router = express.Router(),
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

const getBuses=()=>{
    return new Promise((resolve, reject) => {
        sql= `SELECT * FROM Buses LEFT JOIN Merchants ON company=merchantId ;` 
            con.query(sql,(err,result)=>{
                if(err) throw err;
                resolve(result);
            })
        });
}


// To add a bus
router.post("/bus/add",async(req,res)=>{
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
router.get("/bus/:id",(req,res)=>{
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
router.get("/bus",async(req,res)=>{
    const allBuses= await getBuses();
    res.send(allBuses)
})

// To delete a bus
router.delete("/bus/:id",(req,res)=>{
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
router.put("/bus/:id",(req,res)=>{
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

// To add a Timetable
router.post("/timetable/add",async(req,res)=>{
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
router.get("/:id/timetable",async(req,res)=>{
    const id = req.params.id
    sql= `SELECT * FROM Timetable LEFT JOIN Buses ON bus=busId WHERE busId=${id};` 
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error occurred"})
        };
        if(result.length==0){
            res.send({"msg":"Current bus has no timetables"});
        }
        res.send(result);
    })
});

// To get a particular timetable
router.get("/timetable/:id",(req,res)=>{
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
router.put("/timetable/:id",(req,res)=>{
    const id=req.params.id;
    const {source,destination,route,date,time,capacity,price} = req.body;
    const sql=`UPDATE Timetable SET source='${source}', destination='${destination}',
    route='${route}', date='${date.substring(0,10)}', time='${time}', capacity=${capacity}, price=${price}
    WHERE tId=${id};`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error occurred"})
        }
        res.send({"msg":"Updated"})
    })
})

// To delete a timetable
router.delete("/timetable/:id",(req,res)=>{
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
router.get("/customers",(req,res)=>{
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


module.exports = router;