import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Root = () => {
  const { currentUser } = useSelector((state) => state.authentication);

  return currentUser ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default Root;
