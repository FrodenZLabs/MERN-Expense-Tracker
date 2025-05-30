import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useState } from "react";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../services/authService";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../../redux/reducers/authSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [profilePic, setProfilePic] = useState(null); // New state for profile image
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.authentication);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Please enter your full name";
    if (!validateEmail(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.password) newErrors.password = "Please enter your password";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    dispatch(signUpStart());

    try {
      const submissionData = new FormData();
      submissionData.append("fullName", formData.fullName);
      submissionData.append("email", formData.email);
      submissionData.append("password", formData.password);
      if (profilePic) submissionData.append("profileImage", profilePic);

      const response = await registerUser(submissionData);

      dispatch(signUpSuccess());
      toast.success(response.message);
      navigate("/login");
    } catch (error) {
      dispatch(signUpFailure());
      setErrors({
        general: error || "Something went wrong during sign up",
      });
      toast.error(error);
    }
  };

  return (
    <AuthLayout>
      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <ClipLoader color="#ad46ff" size={130} />
        </div>
      )}

      <div className="h-full flex-grow md:mt-0 flex flex-col justify-center">
        <h2 className="text-lg font-medium text-black mb-10">
          Expense Tracker
        </h2>
        <h3 className="text-xl text-black font-semibold">Create an Account</h3>
        <p className="text-xs md:text-base text-slate-700 mb-6 mt-[5px]">
          Join us today by entering your details below to get started!.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="mb-1 md:mb-4">
            <Input
              type="text"
              name="fullName"
              placeholder="Full Name"
              label="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          <div className="mb-1 md:mb-4">
            <Input
              type="text"
              name="email"
              placeholder="Email Address"
              label="Email Address"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-1 md:mb-4 col-span-2">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className="text-red-500 text-xs mt-2">{errors.general}</p>
          )}

          <div className="flex items-center justify-between mt-10">
            <p className="text-xs md:text-base text-slate-800">
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-primary underline cursor-pointer px-1"
              >
                Login
              </Link>
            </p>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-medium text-white bg-violet-400 hover:bg-violet-600 rounded-md"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
