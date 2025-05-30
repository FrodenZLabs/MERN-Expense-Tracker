import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchAllExpense = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/expense/get`, {
      withCredentials: true,
    });

    return response.data || null;
  } catch (error) {
    console.error("Error fetching expense:", error);
    throw error.response?.data?.message;
  }
};

export const addExpense = async ({ category, amount, date, icon }) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/expense/add`,
      { category, amount, date, icon },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data || null;
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error.response?.data?.message;
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/expense/delete/${expenseId}`,
      { withCredentials: true }
    );

    return response.data || null;
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error.response?.data?.message;
  }
};

export const downloadExpenseExcel = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/expense/export-excel-file`,
      { withCredentials: true, responseType: "blob" }
    );

    return response.data || null;
  } catch (error) {
    console.error("Error downloading expense:", error);
    throw error.response?.data?.message;
  }
};
