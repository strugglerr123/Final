import express from "express";
let app=express();
app.get("/",(req,res)=>{
    res.send(`ohhhhh ${req.query.name}`);
})
app.listen(3005,()=>{
    console.log("Server is running");
})