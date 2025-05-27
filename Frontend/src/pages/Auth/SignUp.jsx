import { Link } from "react-router-dom";
import Input from "../../components/inputs/Input";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useState } from "react";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullName) {
      newErrors.fullName = "Please enter your full name";
    }

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
      console.log("Handle Sign up.");
      // Implement signup logic here
    } catch (error) {
      setErrors({
        general:
          error.response?.data?.message ||
          "Something went wrong during sign up",
      });
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center lg:w-[70&] h-3/4 md:h-full">
        <h3 className="text-xl text-black font-semibold">Sign Up</h3>
        <p className="text-xs text-slate-700 mb-6 mt-[5px]">
          Please enter your details to sign up.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Full Name"
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="mb-4">
              <Input
                type="text"
                placeholder="Email Address"
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
          </div>

          {errors.general && (
            <p className="text-red-500 text-xs mt-2">{errors.general}</p>
          )}

          <div className="flex justify-between mt-10">
            <p className="text-xs text-slate-700">
              Already have an account?
              <Link to="/login" className="cursor-pointer text-violet- px-1">
                Login
              </Link>
            </p>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-medium text-white bg-violet-400 hover:bg-violet-600 rounded-md"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
