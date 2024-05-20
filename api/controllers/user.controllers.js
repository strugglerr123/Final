import Listing from "../models/listing.model.js"
import User from "../models/user.model.js"
import { ErrorHandler } from "../utilis/error.js"
import bcryptjs from "bcrypt"

export let test = (req, res) => {
  res.json({ name: "Rohit Kumar", age: 21 })
}
export let fun = (req, res) => {
  res.send(`Hello ${req.query.name}`)
}

export let Updateuser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(
      ErrorHandler(
        401,
        "Update Your own Account And Mind Your Own Business -->> Mahapurus 'Rohit Kumar' "
      )
    )

  try {
    if (req.body.passwd) {
      req.body.passwd = bcryptjs.hashSync(req.body.passwd, 11)
    }

    let updateuser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          passwd: req.body.passwd,
          imageurl: req.body.imageurl,
        },
      },
      { new: true }
    )

    let { passwd, ...rest } = updateuser._doc
    res.status(200).json({ rest })
  } catch (error) {
    next(error)
  }
}

export let Deleteuser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(ErrorHandler(401, "You Can Only Delete Your wn Account !!!~~"))
  }
  try {
    await User.findByIdAndDelete(req.params.id)
    res.clearCookie("Access_token");
    res.status(200).json(`User Has Been Deleted !!!!`)
  } catch (error) {
    next(error)
  }
}

export let ShowListing=async (req,res,next)=>{
  if(req.user._id===req.params._id){
    try {
      let listing = await Listing.find({userref:req.params.id})
      res.status(200).json(listing)
    } 
    catch (error) {
      next(error)
    }
  }
  else{
    return next(ErrorHandler(401,"You Can Only View Your Own Listing"))
  }
}
