import express from "express";
import * as adminController from "../controllers/admin.js";

const router = express.Router();

router.post("/addDietItems", adminController.addDietItems);
router.post("/addCalorieBurned", adminController.addExcercise);
router.post("/createPost", adminController.createBlogPost);
router.post("/addDisease", adminController.addDisease);
router.post("/uploadFile", adminController.uploadFile);


export default router;