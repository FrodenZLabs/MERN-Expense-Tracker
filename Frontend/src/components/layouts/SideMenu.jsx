import CharAvatar from "../Cards/CharAvatar";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../services/authService";
import { signoutSuccess } from "../../redux/reducers/authSlice";
import { toast } from "react-toastify";

const SideMenu = ({ activeMenu }) => {
  const { currentUser } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (route) => {
    if (route === "logout") {
      handleSignout();
      return;
    }

    navigate(route);
  };

  const handleSignout = async () => {
    try {
      const data = await logoutUser();
      toast.success(data.message);
      dispatch(signoutSuccess());
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while trying to log out");
    }
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {currentUser?.user.profileImage ? (
          <img
            src={currentUser?.user.profileImage || ""}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <CharAvatar
            width="w-20"
            height="h-20"
            style="text-xl"
            fullName={currentUser?.user.fullName}
          />
        )}

        <h5 className="text-gray-950 font-medium leading-6">
          {currentUser?.user.fullName || ""}
        </h5>
        <h5 className="text-gray-950 font-light leading-2">
          {currentUser?.user.email || ""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
