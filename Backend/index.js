import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import error from "./config/error.js";
import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import incomeRoutes from "./routes/income.routes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/income", incomeRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/Frontend/dist")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(error);
