import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import {
  getDashboardData,
  getUserInfo,
  login,
  signout,
  signup,
} from "../controllers/auth.controller.js";
import upload from "../middlewares/multer.js";
import { uploadSingle } from "../middlewares/uploadImage.js";

const router = express.Router();

router.post("/signup", upload.single("profileImage"), uploadSingle, signup);
router.post("/login", login);
router.post("/signout", signout);
router.get("/getUser", verifyUser, getUserInfo);
router.get("/getDashboardData", verifyUser, getDashboardData);

export default router;
