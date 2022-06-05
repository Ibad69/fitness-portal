import express from "express";
import * as userAuth from "../controllers/user.js";

const router = express.Router();

router.post("/signIn", userAuth.signIn);
router.post("/signUp", userAuth.signUp);
router.post("/getDietItems", userAuth.getDietItems);
router.post("/getExcercises", userAuth.getExcercises);
router.post("/addUserHealthDetails", userAuth.addUserHealthDetails);
router.post("/getCustomPosts", userAuth.getCustomPosts);
//router.post("/getRecommendations");
// router.post("/sendEmail", userAuth.sendEmail);
// router.post("/verifyCode", userAuth.verifyCode);
// router.post("/updatePassword", userAuth.updatePassword);
// router.post("/createPlacePost", userAuth.createUserPost);
// router.post("/getPosts", userAuth.getPosts);

// module.exports = router;

export default router;
