import React, { useEffect, useState } from "react";
import { prepareIncomeBarChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-start md:items-center justify-between">
        <div className="pr-1.5">
          <h5 className="text-base md:text-lg">Income Overview</h5>
          <p className="text-xs md:text-sm text-gray-400 mt-0.5">
            Track your earning over time and analyze your income
          </p>
        </div>

        <button onClick={onAddIncome} className="add-btn">
          <LuPlus className="text-base md:text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
