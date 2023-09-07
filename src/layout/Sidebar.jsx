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
  
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="hidden bg-white text-slate-500 mx-6 my-4 rounded-xl  w-56 h-full md:flex flex-col">
      <div className="flex items-center justify-center h-20">
        <img src="./img/logo.png" alt="Logo" className="h-10 w-auto" />
      </div>
      <div className="flex-grow">
        <Link to="/dashboard">
          <div className="group py-3 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-active_menu hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2 font-medium">
              <FaHome className="pr-2 text-2xl" /> Dashboard
            </h6>
          </div>
        </Link>
        <Link to="/feed">
          <div className="group py-3 pl-5 flex items-center cursor-pointer hover:text-sky-500 hover:bg-active_menu hover:border-r-4 hover:border-sky-500">
            <h6 className="flex transition-all group-hover:translate-x-2 font-medium">
              <FaFolder className="pr-2 text-2xl" /> Feed
            </h6>
          </div>
        </Link>
        <Link to="/events">
          <div className="group py-3 pl-5 flex items-center cursor-pointer hover:text-sky-500 hover:bg-active_menu hover:border-r-4 hover:border-sky-500">
            <h6 className="flex transition-all group-hover:translate-x-2 font-medium">
              <FaClock className="pr-2 text-2xl" /> Events
            </h6>
          </div>
        </Link>
        <Link to="/chapters">
          <div className="group py-3 pl-5 flex items-center cursor-pointer hover:text-sky-500 hover:bg-active_menu hover:border-r-4 hover:border-sky-500">
            <h6 className="flex transition-all group-hover:translate-x-2 font-medium items-center">
              <FaCalendarAlt className="pr-2 text-xl" /> Chapters
            </h6>
          </div>
        </Link>
        <Link to="/hubs">
          <div className="group py-3 pl-5 flex items-center cursor-pointer hover:text-sky-500 hover:bg-active_menu hover:border-r-4 hover:border-sky-500">
            <h6 className="flex items-center transition-all group-hover:translate-x-2 font-medium">
              <FaAcquisitionsIncorporated className="pr-2 text-xl" /> Hubs
            </h6>
          </div>
        </Link>
        <Link to="/opportunities">
          <div className="group py-3 pl-5 flex items-center cursor-pointer hover:text-sky-500 hover:bg-active_menu hover:border-r-4 hover:border-sky-500">
            <h6 className="flex items-center transition-all group-hover:translate-x-2 font-medium">
              <FaAddressBook className="pr-2 text-xl" /> Opportunities
            </h6>
          </div>
        </Link>
        <Link to="/alumni">
          <div className="group py-3 pl-5 flex items-center cursor-pointer hover:text-sky-500 hover:bg-active_menu hover:border-r-4 hover:border-sky-500">
            <h6 className="flex transition-all group-hover:translate-x-2 font-medium">
              <FaCcMastercard className="pr-2 text-2xl" /> Alumni Directory
            </h6>
          </div>
        </Link>
      </div>
      <div className="flex-shrink mt-52">
        
        <div className="bg-white p-2 text-center border-t text-xs text-semibold border-slate-300 flex items-center"><FaUserCircle className="text-3xl pr-2"/> 2023 ELP Portal</div>
      </div>
    </aside>
  );
};

export default Sidebar;