import User from "../models/user.model.js";
import bcryptjs from "bcrypt";
import { ErrorHandler } from "../utilis/error.js";
import jwt from "jsonwebtoken";

export let SignUp=async (req,res,next)=>{
    // console.log(req.body);
    // res.send(`All set`)

    let {username,email,passwd}=req.body;
    let hashpasswd=bcryptjs.hashSync(passwd,11);
    let new_user=new User({username,email,passwd:hashpasswd});
    try {
        await new_user.save();
        res.status(201).json(`user authentication successful !!!!`)
    } catch (error) {
        
        next(error);
    }
}

export let SignIn=async (req,res,next)=>{
    let {email,passwd}=req.body;
    try {
        let validuser=await User.findOne({email:email});
        if(!validuser)return next(ErrorHandler(404,"user not found"));
        let validpasswd=bcryptjs.compareSync(passwd,validuser.passwd);
        if(!validpasswd)return next(ErrorHandler(401,"Wrong Informations has been provided"));
        let token=jwt.sign({id:validuser._id},process.env.JWT_SECRET);
        let {passwd:pass,...rest}=validuser._doc;
        res.cookie("Access_token",token,{httpOnly:true}).status(200).json(rest);
    } catch (error) {
        next(error);
    }
}