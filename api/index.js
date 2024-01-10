import express from "express";
import mongoose from "mongoose";
import UserRouter from "./routes/user.router.js";
import AuthRoter from "./routes/auth.route.js";
import dotenv from "dotenv"
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Successfully connected to atlas");
}).catch((e)=>{
    console.log(e);
})

let app=express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send(`ohhhhh ${req.query.name}`);
})
app.listen(3005,()=>{
    console.log("Server is running");
})
app.use("/api/user", UserRouter)
app.use("/api/auth",AuthRoter);