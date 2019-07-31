const express = require("express"),
router = express.Router(),
auth = require("../middleware/authentication"),
con=require('../common/database');


const getSource=()=>{
    return new Promise((resolve, reject) => {
        sql= `SELECT DISTINCT(source) FROM timetable;` 
            con.query(sql,(err,result)=>{
                if(err) throw err;
                resolve(result);
            })
        });
}

const getDestination=()=>{
    return new Promise((resolve, reject) => {
        sql= `SELECT DISTINCT(destination) FROM timetable;` 
            con.query(sql,(err,result)=>{
                if(err) throw err;
                resolve(result);
            })
        });
}

const payment=(receipt,transId,amount)=>{
    return new Promise((resolve, reject) => {
        sql= `INSERT INTO payment(transactionId, amount, receipt) VALUES ('${transId}',${amount},'${receipt}');` 
        con.query(sql,(err,result)=>{
            if(err) throw err;
            resolve(result.insertId);
        })
    });
}


const getId=(email)=>{
    return new Promise((resolve, reject) => {
        sql= `SELECT userId FROM users LEFT JOIN auth ON user_auth=authId WHERE email='${email}';` 
        con.query(sql,(err,result)=>{
            if(err) throw err;
            resolve(result[0].userId);
        })
    });
}


const getBookingId=(bookedBy,bookedBus,payment)=>{
    return new Promise((resolve,reject)=>{
        const sql = `INSERT INTO bookings(bookedBy, bookedBus, payment) VALUES (${bookedBy},${bookedBus},${payment})`
        con.query(sql,(err,result)=>{
            if(err){
                console.log(err)
            }
            resolve(result.insertId);

        })
    })
}

// To get all the timetables
router.get("/timetable",auth,(req,res)=>{
    con.query("SELECT * FROM timetable LEFT JOIN buses ON bus=busID;",(err,result)=>{
        if(err){
            res.send({"msg":"Error Occurred"})
        }
        res.send(result)
    })
})

// To get distinct source and destination
router.get("/distinct",auth,async(req,res)=>{
    const source = await getSource();
    const destination = await getDestination();
    res.send({"source":source,"destination":destination})
})

// To get buses as per the user's search params
router.get("/search",auth,(req,res)=>{
    const {source,destination,date,category}=req.query;
    const sql= `SELECT * FROM timetable LEFT JOIN buses ON bus=busID 
    LEFT JOIN merchants ON merchantId=company 
    WHERE source='${source}' AND destination='${destination}' 
    AND date='${date}' AND busCategory='${category}';`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"Error Occurred"})
        }
        res.send(result)
    })
})  

// To get amount of particular bus's timetable
router.get("/timetable/:id/price",auth,(req,res)=>{
    const sql = `SELECT price FROM timetable WHERE tId=${req.params.id}`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"error occurred"})
        }
        res.send(result[0])
    })
})

// Payment Gateway
router.post("/payment",auth,(req,res)=>{
    const {token,email,amount}= req.body
    const stripe = require('stripe')('sk_test_7Fe2sqAjXQobbklio599hFIX00BlKUNp3O');
    
    stripe.customers.create({
    email: email,
    }).then((customer) => {
    return stripe.customers.createSource(customer.id, {
      source: token,
    });
    }).then((source) => {
    return stripe.charges.create({
      amount: Math.round(amount),
      currency: 'usd',
      customer: source.customer,
    });
    }).then(async (charge) => {
    const receipt = charge.receipt_url;
    const transId = charge.balance_transaction;
    const id = await payment(receipt, transId, amount*0.69);
    res.send({payment:id})
    }).catch((err) => {
    res.send({"msg":"Error Occurred"})
    });
})


// To insert booking records
router.post("/book",auth,async (req,res)=>{
    const {values, bookedBus, count, email, payment} = req.body;
    
    const bookedBy = await getId(email);
    
    const booking = await getBookingId(bookedBy,bookedBus,payment);
    
    con.query(`INSERT INTO ratings(journey) VALUES (${booking})`,(err)=>{
        if(err){
            res.send({"msg":"error occurred"})
        }
    })
    // To insert travellers details
    for(let traveller of values){
        console.log(booking);
        const sql = `INSERT INTO travellers(travellerName, booking) VALUES ('${traveller}',${booking})`
        con.query(sql,(err,result)=>{
            if(err){
                res.send({"msg":"error"})
            }
        })
    }
    
    const sql = `UPDATE timetable SET available = (SELECT available FROM timetable WHERE tId=${bookedBus})-${count} WHERE tId=${bookedBus}`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"error occurred"})
        }
    })
    
    res.send({"msg":"success"})
})


// To get upcoming tickets of a particular user
router.get("/tickets/upcoming",auth,(req,res)=>{
    const email = req.user;
    sql = `SELECT * FROM bookings LEFT JOIN timetable ON bookedBus = tId 
    LEFT JOIN buses ON bus = busId 
    LEFT JOIN users ON bookedBy = userId 
    LEFT JOIN auth on user_auth = authId 
    WHERE email='${email}' AND (date>CURRENT_DATE() OR (date=CURRENT_DATE() AND time>=CURRENT_TIME()))`;
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"error occurred"})
        }
        res.send(result)
    })
})


// To get past tickets of a particular user
router.get("/tickets/past",auth,(req,res)=>{
    const email = req.user;
    sql = `SELECT * FROM bookings LEFT JOIN ratings ON bookingId = journey 
    LEFT JOIN timetable ON bookedBus = tId 
    LEFT JOIN buses ON bus = busId 
    LEFT JOIN users ON bookedBy = userId 
    LEFT JOIN auth on user_auth = authId 
    WHERE email='${email}' AND (date<CURRENT_DATE() OR (date=CURRENT_DATE() AND time<CURRENT_TIME()))`;
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"error occurred"})
        }
        res.send(result)
    })  
})


// To insert ratings and review
router.post("/rating",auth,(req,res)=>{
    const { rating, review, journey } = req.body;
    console.log(rating,review,journey)
    sql = `UPDATE ratings SET rating=${rating}, review='${review}' WHERE journey = ${journey}`;
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"error occurred"})
        }
        res.send({"msg":"success"})
    })
})

module.exports = router;                                                                                                                                