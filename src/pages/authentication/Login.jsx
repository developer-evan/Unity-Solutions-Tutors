/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const clearFormValues = () => {
    setUserData({
      email: '',
      password: '',
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://adamsite-tawny.vercel.app/api/auth/login/', {
        email: userData.email.toLowerCase(),
        password: userData.password,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success('Login successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        const { access, refresh } = response.data;

        localStorage.setItem('refresh', refresh);
        setAuth({
          accessToken: access,
        });

        navigate('/dashboard', { replace: true });
      } else {
        setError('Login failed');
        toast.error('Login failed', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed');
      toast.error('Login failed', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    clearFormValues();
  };

  return (
    <div>
      <div className="bg-blue-700 p-4">
        <div className="container mx-auto">
          {/* <h1 className="text-white text-2xl font-semibold">Adam Admin</h1> */}
          <ToastContainer/>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-400 to-indigo-600 min-h-screen flex items-center justify-center py-16">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <form onSubmit={handleLoginSubmit}>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='loginEmail'
              >
                Email Address <span className='text-red-500'>*</span>
              </label>
              <input
                type='email'
                id='loginEmail'
                name='email'
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className='w-full border rounded-md py-2 px-3'
                placeholder='Enter your email'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='loginPassword'
              >
                Password <span className='text-sky-500'>*</span>
              </label>
              <input
                type='password'
                id='loginPassword'
                name='password'
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className='w-full border rounded-md py-2 px-3'
                placeholder='Enter your password'
                required
              />
            </div>

            {/* checkbox and forgot password */}
            <div className='mb-4 flex flex-wrap  justify-between items-center'>
              <label className='flex items-center'>
                <input type='checkbox' className='form-checkbox text-red-500' />
                <span className='ml-2 text-gray-950'>Keep me signed in</span>
              </label>
              <Link
                to='/login'
                className='text-red-900 font-bold hover:underline'
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type='submit'
              className='w-full bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'
            >
              Sign In
            </button>
          </form>

          {/* {error && <p className='text-red-500 text-center mt-4'>{error}</p>} */}
        </div>
      </div>
    </div>
  );
};

export default Login;
