import express from "express";
import { SignUp,SignIn } from "../controllers/auth.controllers.js";
let router = express.Router();

router.post("/SignUp",SignUp);
router.post("/Sign-in",SignIn);

export default router