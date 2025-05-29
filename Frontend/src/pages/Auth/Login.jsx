import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useState } from "react";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { loginUser } from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/reducers/authSlice";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { loading } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Please enter your password";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    dispatch(signInStart());

    try {
      const response = await loginUser(email, password);
      dispatch(signInSuccess(response));
      toast.success(response.message);
      navigate("/dashboard");
    } catch (error) {
      dispatch(signInFailure());
      setErrors({
        general:
          error.response?.data?.message || "Something went wrong during login",
      });
      toast.error(error);
    }
  };

  return (
    <AuthLayout>
      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <HashLoader color="#ffcb00" size={200} />
        </div>
      )}

      <div className="flex flex-col justify-center lg:w-[70&] h-3/4 md:h-full">
        <h3 className="text-xl text-black font-semibold">Welcome Back</h3>
        <p className="text-xs text-slate-700 mb-6 mt-[5px]">
          Please enter your details to log in.
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="example@email.com"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <Input
              type="password"
              placeholder="Password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className="text-red-500 text-xs mt-2">{errors.general}</p>
          )}

          <div className="flex justify-between mt-10">
            <p className="text-[13px] text-slate-800">
              Don't have an account?
              <Link
                to="/signup"
                className="cursor-pointer text-primary font-medium underline px-1"
              >
                Sign Up
              </Link>
            </p>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-primary hover:text-purple-600 hover:bg-purple-600/15 rounded-md"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
