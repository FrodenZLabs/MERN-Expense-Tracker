import { errorHandler } from "../middlewares/errorHandler.js";
import Auth from "../models/auth.models.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Income from "../models/income.models.js";
import Expense from "../models/expense.models.js";
import mongoose from "mongoose";

export const signup = async (request, response, next) => {
  try {
    const { fullName, email, password, profileImage } = request.body;

    if (!fullName || !email || !password) {
      return next(errorHandler(400, "Please enter all fields"));
    }

    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "Email already exists."));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new Auth({
      fullName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const { password: pass, ...rest } = savedUser._doc;

    response.status(201).json({
      success: true,
      message: "Sign Up successful.",
      user: rest,
    });
  } catch (error) {
    next(errorHandler(500, "Error registering users."));
  }
};

export const login = async (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return next(errorHandler(404, "All fields are required."));
  }

  try {
    const validUser = await Auth.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found."));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(
        errorHandler(400, "Invalid password. The password is incorrect.")
      );
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password: pass, ...rest } = validUser._doc;

    response
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({
        success: true,
        message: "User has sign in successfully.",
        user: rest,
      });
  } catch (error) {
    next(errorHandler(500, "Error logging in users."));
  }
};

export const getDashboardData = async (request, response, next) => {
  try {
    const userId = request.user.id;

    const totalIncome = await Income.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast60Days = last30DaysExpenseTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    const incomeTransactions = await Income.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    const expenseTransactions = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    const lastTransactions = [
      ...incomeTransactions.map((transaction) => ({
        ...transaction.toObject(),
        type: "Income",
      })),
      ...expenseTransactions.map((transaction) => ({
        ...transaction.toObject(),
        type: "Expense",
      })),
    ].sort((a, b) => b.date - a.date);

    response.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully.",
      totalBalance: (totalIncome[0].total || 0) - (totalExpense[0].total || 0),
      totalIncome: totalIncome[0].total || 0,
      totalExpense: totalExpense[0].total || 0,
      last30DaysExpenseTransactions: {
        total: expenseLast60Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncomeTransactions: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Error fetching dashboard data."));
  }
};

export const getUserInfo = async (request, response, next) => {
  try {
    const userId = request.user.id;

    const user = await Auth.findById(userId);
    if (!user) {
      return next(errorHandler(400, "User not found."));
    }

    response.status(200).json({
      success: true,
      message: "User Info fetched successfully.",
      user,
    });
  } catch (error) {
    next(errorHandler(500, "Error getting user info."));
  }
};
