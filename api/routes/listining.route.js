import express from "express";
import {CreateListing,DeleteListing} from "../controllers/listining.controller.js"; 
import { VeryfyUser } from "../utilis/Verify_user.js";

let router=express.Router();

router.post("/Create", VeryfyUser, CreateListing);
router.delete("/delete/:id",VeryfyUser,DeleteListing)

export default router