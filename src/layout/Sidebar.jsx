// import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import {
 
  FaHome,
  FaUserCircle,
  // FaAccusoft,
  // FaUserAlt,
  FaUserFriends,
  // FaLock,
  FaCogs,
  // FaCopyright,
  FaTasks,
  FaRegFilePowerpoint,
  FaProjectDiagram
  
} from "react-icons/fa";
import { Link , useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    // toast.confirm = () => {};
    toast.success('Logout successful', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    // console.log('Logout');
    // CLEAR DATA FROM STORAGE
    localStorage.clear();
    sessionStorage.clear();

    navigate("/login");
}
  return (
    <aside className="hidden  bg-slate-800 text-slate-400 w-60 h-full md:flex flex-col fixed">
      <div className="flex items-center justify-center ">
        {/* <img src="./img/logo.png" alt="Logo" className="h-10 w-auto" /> */}

        {/* <Link to={"/"}>
          <FaAccusoft className="text-5xl"/>
        </Link> */}
        <img src="./tutor.png" alt='logo' className='h-40 w-40' />
      </div>
      <div className="flex-grow">
        <Link to="/dashboard">
          <div className="group py-3 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2  text-sm items-center justify-center">
              <FaHome className="pr-2 text-2xl" /> Dashboard
            </h6>
          </div>
        </Link>
        <Link to="/projects">
        <div className="group py-3 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2  text-sm items-center justify-center">
              <FaProjectDiagram className="pr-2 text-2xl" /> Projects
            </h6>
          </div>
        </Link>
       
        <Link to="/writers">
        <div className="group py-3 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2  text-sm items-center justify-center">
              <FaUserFriends className="pr-2 text-xl" /> Writers
            </h6>
          </div>
        </Link>
        <Link to="/analytics">
        <div className="group py-3 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2  text-sm items-center justify-center">
              <FaRegFilePowerpoint className="pr-2 text-xl" />Analytics
            </h6>
          </div>
        </Link>
        <Link to="/tasks">
        <div className="group py-3 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2  text-sm items-center justify-center">
              <FaTasks className="pr-2 text-xl" />Tasks
            </h6>
          </div>
        </Link>
        <Link to="/settings">
        <div className="group py-3 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2  text-sm items-center justify-center">
              <FaCogs className="pr-2 text-2xl" /> Settings
            </h6>
          </div>
        </Link>
        <Link to="/profile">
        <div className="group py-3 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2  text-sm items-center justify-center">
              <FaUserCircle className="pr-2 text-xl" /> Profile
            </h6>
          </div>
        </Link> 
        <Link to="">
        {/* <div className="group py-3 pl-5 flex items-center cursor-pointer  hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500">
            <h6 className="flex group-hover:translate-x-2  text-sm items-center justify-center"
            onClick={handleLogout}
            >
              <FaLock className="pr-2 text-xl" /> Logout
            </h6>
          </div> */}
        </Link> 
      </div>
      <div className="flex-shrink mt-40">
        
        {/* <div className="bg-slate-800 p-2 text-center border-t text-xs text-semibold border-slate-300 flex items-center">
          <FaCopyright className="text-3xl pr-2"/> 2023 Reserved </div> */}
      <div className="bg-slate-800 p-2 text-center pl-3 border-t text-sm text-semibold border-slate-300 flex items-center cursor-pointer hover:text-sky-500 hover:bg-slate-200 hover:border-r-4 hover:border-sky-500"
      onClick={handleLogout}
      >
          <AiOutlineLogout className="text-3xl pr-2"/>Sign Out </div>
      </div>
    </aside>
  );
};

export default Sidebar;