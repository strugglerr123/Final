import express from "express";
import { SignUp,SignIn,Google } from "../controllers/auth.controllers.js";
let router = express.Router();

router.post("/SignUp",SignUp);
router.post("/SignIn",SignIn);
router.post("/Gooogle",Google);

export default router