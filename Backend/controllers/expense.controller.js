import Expense from "../models/expense.models.js";

export const addExpense = async (request, response, next) => {
  try {
    const { icon, category, amount, date } = request.body;
    const userId = request.user.id;

    if (!category | !amount | !date) {
      return next(errorHandler(400, "Please enter all fields."));
    }

    const newIncome = new Income({
      userId,
      icon,
      category,
      amount,
      date: new Date.now(),
    });
    await newIncome.save();

    response.status(201).json({
      success: true,
      message: "Added expense successfully.",
      newIncome,
    });
  } catch (error) {
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
