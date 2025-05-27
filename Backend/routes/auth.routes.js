import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import {
  getDashboardData,
  getUserInfo,
  login,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getUser", verifyUser, getUserInfo);
router.get("/getDashboardData", verifyUser, getDashboardData);

export default router;
