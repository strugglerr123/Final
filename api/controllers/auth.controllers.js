import User from "../models/user.model.js";
import bcryptjs from "bcrypt";

export let SignUp=async (req,res)=>{
    // console.log(req.body);
    // res.send(`All set`)

    let {username,email,passwd}=req.body;
    let hashpasswd=bcryptjs.hashSync(passwd,11);
    let new_user=new User({username,email,passwd:hashpasswd});
    try {
        await new_user.save();
        res.status(201).json(`user authentication successful !!!!`)
    } catch (error) {
        
        res.status(201).json(`Error :- ${error}`);
    }
}