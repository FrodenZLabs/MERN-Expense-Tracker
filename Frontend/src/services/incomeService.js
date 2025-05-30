import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchAllIncome = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/income/get`, {
      withCredentials: true,
    });

    return response.data || null;
  } catch (error) {
    console.error("Error fetching income:", error);
    throw error.response?.data?.message;
  }
};

export const addIncome = async ({ source, amount, date, icon }) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/income/add`,
      { source, amount, date, icon },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data || null;
  } catch (error) {
    console.error("Error adding income:", error);
    throw error.response?.data?.message;
  }
};

export const deleteIncome = async (incomeId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/v1/income/delete/${incomeId}`,
      { withCredentials: true }
    );

    return response.data || null;
  } catch (error) {
    console.error("Error deleting income:", error);
    throw error.response?.data?.message;
  }
};

export const downloadIncomeExcel = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/income/export-excel-file`,
      { withCredentials: true, responseType: "blob" }
    );

    return response.data || null;
  } catch (error) {
    console.error("Error downloading income:", error);
    throw error.response?.data?.message;
  }
};
