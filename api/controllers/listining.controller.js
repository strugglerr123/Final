import Listing from "../models/listing.model.js"
import { ErrorHandler } from "../utilis/error.js";
// import { useSelector } from "react-redux"

export let CreateListing = async (req, res, next) => {
  try {
    let listing = await Listing.create(req.body)
    return res.status(201).json(listing);
  } catch (error) {
    next(error)
  }
}

export let DeleteListing = async (req, res, next) => {
  // let { currentuser } = useSelector((state) => state.user)

  let check_listing = await Listing.findById(req.params.id)
  if (!check_listing) {
    return next(ErrorHandler(404, "Listing Not Found !!!"))
  }
  if (req.user._id !== Listing.userref) {
    return next(ErrorHandler(401, "Unauthorised To delete others Listings"))
  }

  try {
    await Listing.findByIdAndDelete(req.params.id)
    res.status(200).json("Listing Deleted successfully !!!")
  } catch (error) {
    next(error)
  }
}

export let UpdateUserListing=async (req,res,next)=>{
  let check_listing=await Listing.findById(req.params.id);
  if(!check_listing){
    return next(ErrorHandler(404,'Listing Not Found !!'));
  }
  if(req.user._id!==Listing.userref){
    return next(ErrorHandler(401, "Unauthorised To update others Listings"))
  }

  try {
    let new_listing=await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    )
    res.status(200).json(new_listing)
  }
  catch (error) {
    
  }
}

export let ShowListing=async(req,res,next)=>{
  try {
    let listdata=await Listing.findById(req.params.id);
    if(!listdata){
      return next(ErrorHandler(404,"List Not Found !!!!!!!!"))
    }
    res.status(200).json(listdata)
  }
  catch (error) {
    next(error)
  }
}
