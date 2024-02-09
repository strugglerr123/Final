import jwt from "jsonwebtoken"
import { ErrorHandler } from "./error.js"

export let VeryfyUser = (req, res, next) => {
  let token = req.cookies.Access_token;
//   console.log(token);

  if (!token) return next(ErrorHandler(401, "Failed Authentication"))

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(ErrorHandler(403, "User Are Not Allowed"))

    req.user = user;
    next();
  })
}
