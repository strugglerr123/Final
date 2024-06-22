import express from "express";
import {
  CreateListing,
  DeleteListing,
  UpdateUserListing,
  ShowListing
} from "../controllers/listining.controller.js" 
import { VeryfyUser } from "../utilis/Verify_user.js";

let router=express.Router();

router.post("/Create", VeryfyUser, CreateListing);
router.delete("/delete/:id",VeryfyUser,DeleteListing)
router.post("/update/:id",VeryfyUser,UpdateUserListing);
router.get('/showlist/:id',ShowListing)

export default router