import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import {
  addExpense,
  deleteExpense,
  downloadExpenseExcel,
  getAllExpense,
} from "../controllers/expense.controller.js";

const router = express.Router();

router.post("/add", verifyUser, addExpense);
router.get("/get", verifyUser, getAllExpense);
router.get("/export-excel-file", verifyUser, downloadExpenseExcel);
router.delete("/delete/:id", verifyUser, deleteExpense);

export default router;
