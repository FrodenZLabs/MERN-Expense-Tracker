import { errorHandler } from "../middlewares/errorHandler.js";
import Expense from "../models/expense.models.js";
import xlsx from "xlsx";

export const addExpense = async (request, response, next) => {
  try {
    const { icon, category, amount, date } = request.body;
    const userId = request.user.id;

    if (!category | !amount) {
      return next(errorHandler(400, "Please enter all fields."));
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date,
    });
    await newExpense.save();

    response.status(201).json({
      success: true,
      message: "Added expense successfully.",
      newExpense,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Error adding expense."));
  }
};

export const getAllExpense = async (request, response, next) => {
  try {
    const userId = request.user.id;

    const expense = await Expense.find({ userId }).sort({ date: -1 });
    response.status(200).json({
      success: true,
      message: "Expense fetched successfully.",
      expense,
    });
  } catch (error) {
    next(errorHandler(500, "Error getting all expense."));
  }
};

export const deleteExpense = async (request, response, next) => {
  try {
    const userId = request.params.id;

    await Expense.findByIdAndDelete(userId);
    response.status(200).json({
      message: "Expense deleted successfully.",
    });
  } catch (error) {
    next(errorHandler(500, "Error deleting expense."));
  }
};

export const downloadExpenseExcel = async (request, response, next) => {
  try {
    const userId = request.user.id;

    const expense = await Expense.find({ userId }).sort({ date: -1 });
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");

    xlsx.writeFile(wb, "Expense_details.xlsx");
    response.download("Expense_details.xlsx");
  } catch (error) {
    next(errorHandler(500, "Error generating Excel file."));
  }
};
