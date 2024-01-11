/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// import GlobalSearch from '../components/globalsearch/GlobalSearch';

import {
  FaUserCircle,
  FaBars,
  FaUser,
  FaLock,
} from 'react-icons/fa';
import { AiOutlineKey, AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
// import { axiosPublic } from '../lib/axios/axios';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const { id } = useParams();
  const { auth, setAuth} = useAuth();
  console.log(auth, 'auth')
  const id = auth.user_id;
  console.log(id, 'id')

  const navigate = useNavigate();
  
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://unit-solutions.vercel.app/api/user/get-user/${id}/`);
        setUserData(response.data);      
        console.log('user data' ,userData);
        // console.log('user', userData.data.username)
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error(error);
      }
    };
    fetchData();
  }, [id, userData]);

  
  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   // toast.confirm = () => {};
  //   toast.success('Logout successful', {
  //     position: 'top-right',
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //   });
  //   setAuth(null);
  //   // Clear refresh token from local storage
  //   localStorage.removeItem("refresh");
  //   // Clear access token from context
   
  //   // window.location.reload();
  // };
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
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[#364258]  ml-1 p-3 md:ml-[48] overflow-hidden">
      <ToastContainer />
      
      <div className="flex flex-col-reverse gap-4 md:gap-0 md:flex-row items-center">
        <div className="flex items-center flex-grow">
          <div className="md:w-1/4 flex items-center px-3 rounded-full">
            <FaBars className="text-gray-500 mr-2 cursor-pointer" />
            {/* <input
              type="text"
              placeholder="Global Search"
              className="w-full border rounded p-1"
            /> */}
            {/* <GlobalSearch  */}

          </div>
        </div>
        <div className="">
          <div
            onClick={toggleDropdown}
            className={`flex items-center self-end md:self-center mr-6 cursor-pointer bg-slate-300 text-[#364258] rounded-2xl py-1 w-auto px-1 space-x-2 ${isOpen ? 'bg-blue-500' : ''
              }`}
          >
            <p className=" text-xl">
              <AiOutlineUser />
            </p>
            <p className=" text-lg">
              {/* {userData ? userData.email : 'loading...'} */}
              {userData ? userData.first_name : ''} {userData ? userData.last_name : 'loading...'}
            </p>
          </div>
          {isOpen && (
            <div className="origin-top-right ml-[-40px] absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1" role="none">
              <Link to="/profile" className=" flex items-center gap-1  text-sm px-1  hover:bg-slate-200 hover:text-blue-800 cursor-pointer">
                  <p className="items-center  justify-start flex  gap-1 hover:translate-x-2 text-sm px-4 py-2 hover:font-semibold  cursor-pointer">
                    <AiOutlineUser /> Profile
                  </p>
                </Link>
                <Link to="/change-password" className=" flex items-center gap-1  text-sm px-1  hover:bg-slate-200 hover:text-blue-800 cursor-pointer">
                  <p className="items-center  justify-start flex  gap-1 hover:translate-x-2 text-sm px-4 py-2 hover:font-semibold  cursor-pointer">
                    <AiOutlineKey /> Change Password
                  </p>
                </Link>
                <Link to="" className=" flex items-center gap-1  text-sm px-1  hover:bg-slate-200 hover:text-blue-800 cursor-pointer">
          <p 
          onClick={handleLogout}  
          className="flex items-center gap-1 hover:translate-x-2 text-sm px-4 py-2 hover:font-semibold cursor-pointer">
                <AiOutlineLogout /> Logout
          </p>
          </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;