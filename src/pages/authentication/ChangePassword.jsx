/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
// import { axiosPublic } from '../../lib/axios/axios';
import axios from 'axios';
// import MainLayout from '../../layouts/MainLayout';
import useAuth from '../../hooks/useAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import MainLayout from '../../layout/MainLayout';
// import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
  const { auth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfrimPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
    //   setErrorMessage("New password and confirm password don't match.");
    toast.error("New password and confirm password don't match.", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
      return;
    }
    console.log('user', auth)
    try {
      // const token = localStorage.getItem('token');
      console.log('token', auth.accessToken)
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.accessToken}`,


      };
      const response = await axios.post('https://unitysolutionstutors.vercel.app/api/change-password', {
        old_password: currentPassword,
        new_password1: newPassword,
        new_password2: confirmPassword,
      },
        { headers, }
      );

      if (response.status === 200) {
        // setSuccessMessage('Password changed successfully.');
        toast.success('Password changed successfully.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            });

        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrorMessage('');
      }
    } catch (error) {
      if (error.response) {
        // setErrorMessage(error.response.data.message);
        toast.error('error occured', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            });

      } else {
        setErrorMessage('An error occurred while changing the password.');
      }
    }
  };

  return (

    <div className='bg-white'>
      {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>} */}
        <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-sm  mx-auto flex flex-col gap-3 items-center justify-center bg-white bg-opacity-97 px-6 md:px-16 py-8 rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2 mb-4">
          <h1 className="text-maroon text-center mb-2 text-2xl font-bold">
            Change Password
          </h1>
        </div>
        <div className="flex items-center justify-center gap-2 flex-col">
          <label className="block mb-2">Current Password</label>
          <div className="flex items-center justify-center bg-slate-100 outline-slate-400 rounded-md input  w-72 xl:w-96  text-sm">
             <input
            type={showPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="flex items-center justify-center bg-slate-100 outline-none rounded-md input  w-72 xl:w-80 p-2 text-sm"
            />
          <button
            onClick={togglePasswordVisibility}
            className="bg-transparent text-slate-600  rounded-r p-3 "
          >
            {showPassword ? <FaEyeSlash /> : <FaEye/>}
          </button>
          </div>
          <label className="block mb-1">New Password</label>
          <div className="flex items-center justify-center bg-slate-100 outline-slate-400 rounded-md input  w-72 xl:w-96  text-sm">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="flex items-center justify-center bg-slate-100 outline-none rounded-md input  w-72 xl:w-80 p-2 text-sm"
            />
            <button
              onClick={toggleNewPasswordVisibility}
              className="bg-transparent text-slate-600  rounded-r p-3 "
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye/>}
            </button>
          </div>
          
          <label className="block mb-1">Confirm New Password</label>
          <div className="flex items-center justify-center bg-slate-100 outline-slate-400 rounded-md input  w-72 xl:w-96  text-sm">
            <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="flex items-center justify-center bg-slate-100 outline-none rounded-md input  w-72 xl:w-80 p-2 text-sm"
            />
          <button
            onClick={toggleConfrimPasswordVisibility}
            className="bg-transparent text-slate-600  rounded-r p-3 "
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye/>}
          </button>
          </div>
          <div className="flex  my-2 gap-3 justify-between items-center w-full">
            <button type='submit' className="py-2 px-2 w-full md-w-full  border bg-[#364258] rounded-lg text-white font-bold hover:bg-white hover:text-[#364258] hover:border-[#364258]">
              Submit
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default MainLayout(ChangePassword);