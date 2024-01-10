import express from "express";
import { test } from "../controllers/user.controllers.js";
import { fun } from "../controllers/user.controllers.js";
let router=express.Router();

router.get("/test",test)
router.get("/test2",fun);

export default router;