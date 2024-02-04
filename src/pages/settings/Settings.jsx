/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { TailSpin } from "react-loader-spinner";
import { FaEdit, FaEye, FaEyeSlash, FaPen } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Settings() {
  const [showProfile, setShowProfile] = useState(true);
  const { auth } = useAuth();
  const id = auth.user_id;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
  // const { auth } = useAuth();
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
      const response = await axios.post('https://unit-solutions.vercel.app/api/change-password', {
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://unit-solutions.vercel.app/api/user/get-user/${id}/`);
        setUserData(response.data);
        console.log('user data', userData);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [id, userData]);


  const handleToggle = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 ${showProfile ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={handleToggle}
        >
          Profile
        </button>
        <button
          className={`px-4 py-2 ${!showProfile ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={handleToggle}
        >
          Change Password
        </button>
      </div>
      {showProfile ? (
        <div className="bg-white p-4 rounded shadow">
          {/* Profile information goes here */}
          <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
        {loading && <div className="text-gray-600 italic text-center">
          {/* Loading... */}
          <TailSpin
            visible={true}
            height="40"
            width="40"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "30vh",
            }}
            wrapperClass=""
            // className="items-center justify-center ml-16"
          />
        </div>}
        {error && <div className="text-red-500 text-center">{error.message}</div>}
        {userData && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={userData.profile_image || 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'}
                  alt="profile"
                  className="w-16 h-16 rounded-full"
                />
                </div>
                {/* <div>
                  <h2 className="text-lg font-semibold">{userData.first_name || 'loading...'} {userData.last_name || 'loading...'}</h2>
                  <p className="text-gray-600">{userData.email || 'loading...'}</p>
                  {/* <p className="text-gray-600">{userData.date_joined || 'loading...'}</p> */}
              
              
              <div>
                <h2 className="text-lg font-semibold">{userData.first_name || 'loading...'} {userData.last_name || 'loading...'}</h2>
                <p className="text-gray-600">{userData.email || 'loading...'}</p>
                {/* <p className="text-gray-600">{userData.date_joined || 'loading...'}</p> */}

              </div>
              <button className="text-blue-500  px-4 py-2 rounded-md">
                <FaPen className="mr-2" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-md font-semibold mb-1">Phone</h3>
                <p className="text-gray-600">{userData.phone || 'loading...'}</p>
              </div>
              <div>
                <h3 className="text-md font-semibold mb-1">Phone</h3>
                <p className="text-gray-600">{userData.phone || 'loading...'}</p>
              </div>
              <div>
                <h3 className="text-md font-semibold mb-1">Phone</h3>
                <p className="text-gray-600">{userData.phone || 'loading...'}</p>
              </div>
              <div>
                <h3 className="text-md font-semibold mb-1">Phone</h3>
                <p className="text-gray-600">{userData.phone || 'loading...'}</p>
              </div>

              {/* Add more details as needed */}
              {/* profile image */}

            </div>
            {/* Add more sections or details as needed */}
          </div>
        )}
      </div>
    </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow">
          {/* Change password form or content goes here */}
          {/* <ChangePassword /> */}
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
        </div>
      )}
    </div>
  );
}

export default MainLayout(Settings);
