import { useState } from "react";
import EmojiPickerPopup from "../EmojiPickerPopup";
import Input from "../Inputs/Input";

const AddIncomeForm = ({ onAddIncome, errors }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  return (
    <div>
      <div className="mb-4">
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
        {errors.icon && (
          <p className="text-red-500 text-xs mt-1">{errors.icon}</p>
        )}
      </div>

      <div className="mb-4">
        <Input
          value={income.source}
          onChange={({ target }) => handleChange("source", target.value)}
          label="Income Source"
          placeholder="Freelance, salary, etc."
          type="text"
          name="source"
        />
        {errors.source && (
          <p className="text-red-500 text-xs mt-1">{errors.source}</p>
        )}
      </div>

      <div className="mb-4">
        <Input
          value={income.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          label="Income Amount"
          placeholder="Enter amount"
          type="number"
          name="amount"
        />
        {errors.amount && (
          <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
        )}
      </div>

      <div className="mb-4">
        <Input
          value={income.date}
          onChange={({ target }) => handleChange("date", target.value)}
          label="Income Date"
          placeholder="Income Date"
          type="date"
          name="date"
        />
        {errors.date && (
          <p className="text-red-500 text-xs mt-1">{errors.date}</p>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn-fill"
          type="button"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
