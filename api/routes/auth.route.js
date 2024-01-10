import express from "express";
import { SignUp } from "../controllers/auth.controllers.js";
let router = express.Router();

router.post("/SignUp",SignUp);

export default router