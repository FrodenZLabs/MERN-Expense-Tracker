import heroLogin from "../../assets/images/heroLogin.jpeg";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen">
      {/* Left side – Login form */}
      <div className="w-1/2 flex flex-col justify-center px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black mb-4">Expense Tracker</h2>
        {children}
      </div>

      {/* Right side – Image */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-violet-50 overflow-hidden relative">
        <img
          src={heroLogin}
          alt="Login Hero"
          className="h-full w-full object-fill"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
