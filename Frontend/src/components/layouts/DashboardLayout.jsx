import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const DashboardLayout = ({ children, activeMenu }) => {
  const { currentUser } = useSelector((state) => state.authentication);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar activeMenu={activeMenu} />

      {currentUser && (
        <div className="flex flex-1 overflow-hidden">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow overflow-y-auto px-3 md:px-5 py-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
