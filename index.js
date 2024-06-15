const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const authRouter=require('./routes/authRoutes');

// the middle the we have to use 
const app=express();
app.use(cors())
app.use(express.json());

// app.use(mongoose.json());

//  where we go the ----Route---- to use 

app.use('/api/auth',authRouter);




//lets start connection setup
mongoose.connect('mongodb://127.0.0.1:27017/authentication')
.then(()=>console.log("connected to data base!"))
.catch((error)=>console.error("failed to connect :",error));


// these used for global error haldling 
app.use((err,res,req,next)=>{
    err.statuCode = err.statuCode || 500;
    err.status = err.status|| 'error';
res.status(err.statuCode).json({
    status:err.status,
    message:err.message,

})})











const PORT=3000;
app.listen(PORT,(req,res)=>{
    console.log(`server is listening ${PORT}`)
})


// middle ware is neccessery