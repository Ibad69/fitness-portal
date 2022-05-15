import express from "express";
import * as adminController from "../controllers/admin.js";

const router = express.Router();

router.post("/addPlace", adminController.addPlace);


export default router;