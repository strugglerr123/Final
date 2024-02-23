import express from "express";

import mongoose from "mongoose";
import UserRouter from "./routes/user.router.js";
import AuthRoter from "./routes/auth.route.js";
import Listingrouter from "./routes/listining.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Successfully connected to atlas");
}).catch((e)=>{
    console.log(e);
})

let app=express();
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send(`ohhhhh ${req.query.name}`);
})
app.listen(3005,()=>{
    console.log("Server is running");
})
app.use("/api/user", UserRouter)
app.use("/api/auth",AuthRoter);
app.use("/api/listing",Listingrouter)

app.use((error,req,res,next)=>{
    let statuscode=error.statusCode||500;
    let msg=error.message||"Internal Error";
    return res.status(statuscode).json({
        success:false,
        statuscode,
        msg,
    })
})