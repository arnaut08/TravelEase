const express=require("express"),
app=express(),
parser=require("body-parser");


const authRoutes = require('./routes/authroutes'),
adminRoutes = require('./routes/adminroutes'),
merchantRoutes = require('./routes/merchantroutes'),
userRoutes = require('./routes/userroutes'),
commonRoutes = require('./routes/commonroutes');

//Cross Origin Access (To call node APIs from angular)
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, auth');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(parser.urlencoded({extended:true}));
app.use(authRoutes);
app.use(adminRoutes);
app.use(merchantRoutes);
app.use(userRoutes);
app.use(commonRoutes);


app.listen(3000,()=>{
    console.log("Connected")
});
