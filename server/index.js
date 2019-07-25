const express=require("express"),
app=express(),
parser=require("body-parser"),
override=require("method-override");


const authRoutes = require('./routes/authroutes'),
adminRoutes = require('./routes/adminroutes'),
merchantRoutes = require('./routes/merchantroutes'),
userRoutes = require('./routes/userroutes');

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
app.use(authRoutes);
app.use(adminRoutes);
app.use(merchantRoutes);
app.use(userRoutes);



app.listen(3000,()=>{
    console.log("Connected")
});
