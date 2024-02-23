import Listing from "../models/listing.model.js"

export let CreateListing = async (req, res, next) => {
  try {
    let listing = await Listing.create(req.body)
    return res.status(201).json(listing);
  } catch (error) {
    next(error)
  }
}
