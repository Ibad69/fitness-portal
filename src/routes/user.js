import express from "express";
import * as userAuth from "../controllers/user.js";
import { middleWareFunc } from "../funcs/tokenMiddleware.js";

const router = express.Router();

router.post("/signIn", userAuth.signIn);
router.post("/signUp", userAuth.signUp);
router.post("/getDietItems", middleWareFunc, userAuth.getDietItems);
router.post("/getExcercises",  middleWareFunc, userAuth.getExcercises);
router.post("/addUserHealthDetails",  middleWareFunc, userAuth.addUserHealthDetails);
router.post("/getCustomPosts",  middleWareFunc, userAuth.getCustomPosts);
router.post("/getRandomPosts", userAuth.getRandomPosts);
router.post("/getDiseases", userAuth.getDiseases);
router.post("/getPostsByDiseases", userAuth.getPostByDis);
router.post("/checkUserDetails", middleWareFunc, userAuth.checkUserDetails);
//router.post("/getRecommendations");
// router.post("/sendEmail", userAuth.sendEmail);
// router.post("/verifyCode", userAuth.verifyCode);
// router.post("/updatePassword", userAuth.updatePassword);
// router.post("/createPlacePost", userAuth.createUserPost);
// router.post("/getPosts", userAuth.getPosts);

// module.exports = router;

export default router;
