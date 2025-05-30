import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { useState } from "react";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-300 py-2 md:py-4 px-4 md:px-7 top-0 z-10 md:sticky md:z-30">
      {/* App Title */}
      <h2 className="text-lg md:text-xl font-semibold text-black px-5">
        Expense <span className="text-purple-600">Tracker</span>
      </h2>

      {/* Toggle Button (only on mobile) */}
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu((prev) => !prev)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      {/* Mobile Side Menu */}
      {openSideMenu && (
        <div className="fixed top-[46px] left-0 w-full h-full z-40 bg-white overflow-y-auto shadow-md lg:hidden transition-all duration-500">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
