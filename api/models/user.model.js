import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwd: {
      type: String,
      required: true,
    },
    imageurl: {
      type: String, 
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
  },
  { timestamps: true }
)

let User=mongoose.model("User",userSchema);

export default User;