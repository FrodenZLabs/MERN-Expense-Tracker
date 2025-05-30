import { errorHandler } from "../middlewares/errorHandler.js";
import Income from "../models/income.models.js";
import xlsx from "xlsx";

export const addIncome = async (request, response, next) => {
  try {
    const { icon, source, amount, date } = request.body;
    const userId = request.user.id;

    if (!source | !amount) {
      return next(errorHandler(400, "Please enter all fields."));
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date,
    });
    await newIncome.save();

    response.status(201).json({
      success: true,
      message: "Added income successfully.",
      newIncome,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Error adding income."));
  }
};

export const getAllIncome = async (request, response, next) => {
  try {
    const userId = request.user.id;

    const income = await Income.find({ userId }).sort({ date: -1 });
    response.status(200).json({
      success: true,
      message: "Income fetched successfully.",
      income,
    });
  } catch (error) {
    next(errorHandler(500, "Error getting all income."));
  }
};

export const deleteIncome = async (request, response, next) => {
  try {
    const incomeId = request.params.id;

    await Income.findByIdAndDelete(incomeId);
    response.status(200).json({
      message: "Income deleted successfully.",
    });
  } catch (error) {
    next(errorHandler(500, "Error deleting income."));
  }
};

export const downloadIncomeExcel = async (request, response, next) => {
  try {
    const userId = request.user.id;

    const income = await Income.find({ userId }).sort({ date: -1 });
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    xlsx.writeFile(wb, "Income_details.xlsx");
    response.download("Income_details.xlsx");
  } catch (error) {
    next(errorHandler(500, "Error generating Excel file."));
  }
};
