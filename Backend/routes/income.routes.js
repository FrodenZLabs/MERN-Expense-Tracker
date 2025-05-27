import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import {
  addIncome,
  deleteIncome,
  getAllIncome,
} from "../controllers/income.controller.js";

const router = express.Router();

router.post("/add", verifyUser, addIncome);
router.get("/get", verifyUser, getAllIncome);
router.delete("/delete/:id", verifyUser, deleteIncome);

export default router;
