import express from "express";
import mongoose from "mongoose";
// import { configDotenv } from "dotenv";
// configDotenv();
import dotenv from "dotenv"
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Successfully connected to atlas");
}).catch((e)=>{
    console.log(e);
})
let app=express();
app.get("/",(req,res)=>{
    res.send(`ohhhhh ${req.query.name}`);
})
app.listen(3005,()=>{
    console.log("Server is running");
})