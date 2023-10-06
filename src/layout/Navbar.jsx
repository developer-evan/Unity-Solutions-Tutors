// eslint-disable-next-line no-unused-vars
import React from "react";
// eslint-disable-next-line no-unused-vars
import {
  FaUserCircle,
  FaCog,
  FaBell,
  FaBars,
  // FaSearch,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="bg-white ml-1 p-3 md:ml-[60] overflow-hidden">
      <div className="flex flex-col-reverse gap-4 md:gap-0 md:flex-row items-center">
        <div className="flex items-center flex-grow">
          <div className="md:w-1/4 flex items-center  px-3  rounded-full">
            <FaBars className="text-gray-500  mr-2 cursor-pointer" />
            User
          </div>
        </div>
        <div className="flex items-center self-end md:self-center space-x-4">
          <p className="text-darkMaroon text-xl">
            <FaCog />
          </p>
          <p className="text-darkMaroon text-xl">
            <FaBell />
          </p>
          <p className="text-darkMaroon text-xl">
            <FaUserCircle />
          </p>
          <p className="text-darkMaroon ">
            Logout
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;