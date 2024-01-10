import mongoose from "mongoose";

let userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    passwd:{
        type:String,
        required:true,
    }
},{timestamps:true});

let User=mongoose.model("User",userSchema);

export default User;