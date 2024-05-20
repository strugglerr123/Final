import mongoose from "mongoose"

let listingschema = new mongoose.Schema(
  {
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
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    refurbunished: {
      type: Boolean,
      required: true,
    },

    deliverable: {
      type: Boolean,
      required: true,
    },

    sell: {
      type: Boolean,
      required: true,
    },

    offer: {
      type: Boolean,
      required: true,
    },

    sell:{
      type:Boolean,
      required:true,
    },

    buy:{
      type:Boolean,
      required:true,
    },

    imageurl: {
      type: Array,
      required: true,
    },

    userref: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

let Listing = mongoose.model("Listing", listingschema);

export default Listing;
