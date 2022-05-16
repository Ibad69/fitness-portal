import express from "express";
import * as adminController from "../controllers/admin.js";

const router = express.Router();

router.post("/addDietItems", adminController.addDietItems);
router.post("/addCalorieBurned", adminController.addExcercise);


export default router;