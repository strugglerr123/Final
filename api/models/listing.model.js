import mongoose from "mongoose"

let listingschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  descriptions: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  originalprice: {
    type: Number,
    required: true,
  },

  sellingprice: {
    type: String,
    required: true,
  },

  
})
