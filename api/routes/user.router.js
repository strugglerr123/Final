import express from "express"
import { Updateuser, test, Deleteuser } from "../controllers/user.controllers.js"
import { fun } from "../controllers/user.controllers.js";
import { VeryfyUser } from "../utilis/Verify_user.js";
let router = express.Router()

router.get("/test", test)
router.get("/test2", fun)
router.post("/update/:id",VeryfyUser, Updateuser)
router.delete("/delete/:id",VeryfyUser, Deleteuser)

export default router
