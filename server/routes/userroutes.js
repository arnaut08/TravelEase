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

const payment=(receipt,transId,amount)=>{
    return new Promise((resolve, reject) => {
        sql= `INSERT INTO Payment(transactionId, amount, receipt) VALUES ('${transId}',${amount},'${receipt}');` 
        con.query(sql,(err,result)=>{
            if(err) throw err;
            resolve(result.insertId);
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

// To get amount of particular bus's timetable
router.get("/timetable/:id/price",(req,res)=>{
    const sql = `SELECT price FROM Timetable WHERE tId=${req.params.id}`
    con.query(sql,(err,result)=>{
        if(err){
            res.send({"msg":"error occurred"})
        }
        res.send(result[0])
    })
})

router.post("/payment",(req,res)=>{
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
router.post("/book",(req,res)=>{
    const {count} = req.body;
    const keys=Object.keys(req.body)
    console.log(req.body);
    console.log(keys);
    // for(let i=1; i < count+1,i++){
    //     const {}
    // }
})


module.exports = router;