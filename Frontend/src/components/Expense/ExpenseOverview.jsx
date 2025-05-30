import React, { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import CustomLineChart from "../Charts/CustomLineChart";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-start md:items-center justify-between">
        <div className="pr-1.5">
          <h5 className="text-base md:text-lg">Expense Overview</h5>
          <p className="text-[10px] md:text-xs text-gray-400 mt-0.5">
            Track your spendings trends over and gain insights into where your
            money goes
          </p>
        </div>

        <button onClick={onAddExpense} className="add-btn">
          <LuPlus className="text-base md:text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
