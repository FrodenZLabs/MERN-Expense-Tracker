import axios from "axios";

const API_URL = "http://localhost:8000";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/auth/signout`,
      {},
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error logging out.";
  }
};

export const registerUser = async (submissionData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/auth/signup`,
      submissionData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
  }
};

// Fetch user profile
export const fetchUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/auth/getUser`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user profile.";
  }
};

// Fetch user profile
export const getDashboardData = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/auth/getDashboardData`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user profile.";
  }
};
