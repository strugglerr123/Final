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
    return next(ErrorHandler(401, "Update Your own Account And Mind Your Own Business -->> Mahapurus 'Rohit Kumar' "))

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
    res.status(200).json({rest});


  } 
  catch (error) {

    next(error)
  }
}
