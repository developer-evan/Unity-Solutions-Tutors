// import React from "react";
import {
  FaCcMastercard,
  FaFolder,
  FaClock,
  FaAddressBook,
  FaCalendarAlt,
  FaAcquisitionsIncorporated,
  FaHome,
  FaUserCircle,
  FaAccusoft
  
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="hidden  bg-white text-slate-500 mx-6 my-4 rounded-xl  w-56 h-full md:flex flex-col">
      <div className="flex items-center justify-center h-20">
        {/* <img src="./img/logo.png" alt="Logo" className="h-10 w-auto" /> */}
        <Link to={"/"}>
          <FaAccusoft className="text-5xl"/>
        </Link>
      </div>
      <div className="flex-grow">
        <Link to="/dashboard">
          <div className="group py-3 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2 font-medium text-sm items-center justify-center">
              <FaHome className="pr-2 text-2xl" /> Dashboard
            </h6>
          </div>
        </Link>
        <Link to="/post-orders">
        <div className="group py-3 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2 font-medium text-sm items-center justify-center">
              <FaFolder className="pr-2 text-2xl" /> Post Orders
            </h6>
          </div>
        </Link>
        <Link to="/list-orders">
        <div className="group py-3 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2 font-medium text-sm items-center justify-center">
              <FaClock className="pr-2 text-2xl" /> List Orders
            </h6>
          </div>
        </Link>
        <Link to="/writers-profiles">
        <div className="group py-3 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2 font-medium text-sm items-center justify-center">
              <FaCalendarAlt className="pr-2 text-xl" /> Writers Profiles
            </h6>
          </div>
        </Link>
        <Link to="/add-writer">
        <div className="group py-3 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2 font-medium text-sm items-center justify-center">
              <FaAcquisitionsIncorporated className="pr-2 text-xl" /> Add Writer
            </h6>
          </div>
        </Link>
        <Link to="/order">
        <div className="group py-3 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2 font-medium text-sm items-center justify-center">
              <FaAddressBook className="pr-2 text-xl" />Order Resources
            </h6>
          </div>
        </Link>
        <Link to="/settings">
        <div className="group py-3 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2 font-medium text-sm items-center justify-center">
              <FaCcMastercard className="pr-2 text-2xl" /> Settings
            </h6>
          </div>
        </Link>
      </div>
      <div className="flex-shrink mt-52">
        
        <div className="bg-white p-2 text-center border-t text-xs text-semibold border-slate-300 flex items-center"><FaUserCircle className="text-3xl pr-2"/> 2023 Reserved </div>
      </div>
    </aside>
  );
};

export default Sidebar;