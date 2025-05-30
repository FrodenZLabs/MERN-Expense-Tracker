import { useState } from "react";
import EmojiPickerPopup from "../EmojiPickerPopup";
import Input from "../inputs/Input";

const AddExpenseForm = ({ onAddExpense, errors }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  return (
    <div>
      <div className="mb-4">
        <EmojiPickerPopup
          icon={expense.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
        {errors.icon && (
          <p className="text-red-500 text-xs mt-1">{errors.icon}</p>
        )}
      </div>

      <div className="mb-4">
        <Input
          value={expense.category}
          onChange={({ target }) => handleChange("category", target.value)}
          label="Category"
          placeholder="Rent, Groceries, etc."
          type="text"
          name="category"
        />
        {errors.category && (
          <p className="text-red-500 text-xs mt-1">{errors.category}</p>
        )}
      </div>

      <div className="mb-4">
        <Input
          value={expense.amount}
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
          value={expense.date}
          onChange={({ target }) => handleChange("date", target.value)}
          label="Expense Date"
          placeholder="Expense Date"
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
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
