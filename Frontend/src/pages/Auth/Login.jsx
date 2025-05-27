import { Link } from "react-router-dom";
import Input from "../../components/inputs/Input";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useState } from "react";
import { validateEmail } from "../../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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
    try {
      console.log("Handle Login.");
      // Implement login logic here
    } catch (error) {
      setErrors({
        general:
          error.response?.data?.message || "Something went wrong during login",
      });
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center lg:w-[70&] h-3/4 md:h-full">
        <h3 className="text-xl text-black font-semibold">Welcome Back</h3>
        <p className="text-xs text-slate-700 mb-6 mt-[5px]">
          Please enter your details to log in.
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Email"
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
            <p className="text-xs text-slate-700">
              Don't have an account?
              <Link to="/signup" className="cursor-pointer text-violet- px-1">
                Sign Up
              </Link>
            </p>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-medium text-white bg-violet-400 hover:bg-violet-600 rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
