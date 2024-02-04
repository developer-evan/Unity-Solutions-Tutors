// import React from "react";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { FaHome, FaTasks, FaUserEdit, FaCogs } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const User = () => {
  const navigate = useNavigate();
  const [isTasksMenuOpen, setTasksMenuOpen] = useState(true);
  const toggleTasksMenu = () => {
    setTasksMenuOpen(!isTasksMenuOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    toast.success('Logout successful', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  }

  return (
    <aside className="hidden  bg-slate-800 text-slate-400 w-60 h-full md:flex flex-col fixed">
      <div className="flex items-center justify-center ">
        <img src="./tutor.png" alt='logo' className='h-30 w-40' />
      </div>
      <div className="flex-grow">
        <Link to="/dashboard">
          <div className="group py-2 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2  text-sm items-center justify-center">
              <FaHome className="pr-2 text-2xl" /> Dashboard
            </h6>
          </div>
        </Link>
        <div
          className={`group py-2 pl-5 flex items-center cursor-pointer ${isTasksMenuOpen
            ? ''
            : 'hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500'
            }`}
          onClick={toggleTasksMenu}
        >
          <h6 className='flex font-medium text-sm items-center space-x-4'>
            <span className='flex items-center'>
              <span className='text-md'>
                <FaTasks className='text-2xl pr-2' />
              </span>
              <span className='ml-2'>Tasks</span>
            </span>
          </h6>
        </div>

        {isTasksMenuOpen && (
          <div className='pl-10 items-start space-y-4'>
            <Link to='/all-tasks'>
              <div className="group py-2 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
                <h6 className="flex group-hover:translate-x-2  text-sm items-center justify-center">
                  <FaUserEdit className='text-2xl pr-2' />
                  All Tasks
                </h6>
              </div>
            </Link>
          </div>
        )}

        <Link to="/settings">
          <div className="group py-2 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2  text-sm items-center justify-center">
              <FaCogs className="pr-2 text-2xl" /> Settings
            </h6>
          </div>
        </Link>
      </div>
      <div className="flex-shrink ">
        <div className="bg-slate-800 p-2 text-center pl-3 border-t text-sm text-semibold border-slate-300 flex items-center cursor-pointer hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500"
          onClick={handleLogout}
        >
          <AiOutlineLogout className="text-3xl pr-2" />Sign Out
        </div>
      </div>
    </aside>
  );
};

export default User;
