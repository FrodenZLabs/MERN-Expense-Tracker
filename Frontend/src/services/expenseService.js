import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchAllExpense = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/expense/get`,
      {},
      { withCredentials: true }
    );

    return response.data || null;
  } catch (error) {
    console.error("Error fetching expense:", error);
    throw error.response?.data?.errorMessage;
  }
};

export const addExpense = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/expense/add`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data || null;
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error.response?.data?.errorMessage;
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/v1/expense/delete/${expenseId}`,
      { withCredentials: true }
    );

    return response.data || null;
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error.response?.data?.errorMessage;
  }
};
