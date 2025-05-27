import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Root = () => {
  // Check if token exists in cookies
  const isAuthenticated = !!Cookies.get("token");

  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default Root;
