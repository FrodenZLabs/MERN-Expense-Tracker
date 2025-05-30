import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import {
  addIncome,
  deleteIncome,
  downloadIncomeExcel,
  getAllIncome,
} from "../controllers/income.controller.js";

const router = express.Router();

router.post("/add", verifyUser, addIncome);
router.get("/get", verifyUser, getAllIncome);
router.get("/export-excel-file", verifyUser, downloadIncomeExcel);
router.delete("/delete/:id", verifyUser, deleteIncome);

export default router;
