import express from "express";
import {CreateListing} from "../controllers/listining.controller.js"; 
import { VeryfyUser } from "../utilis/Verify_user.js";

let router=express.Router();

router.post("/Create", VeryfyUser, CreateListing)

export default router