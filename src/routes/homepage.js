import express from "express";
import * as homePage from '../controllers/homepage.js';

const router = express.Router();

router.post('/topPlaces', homePage.topPlaces);

export default router;
