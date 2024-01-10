/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {jwt_decode} from 'jwt-decode'; // Import jwt_decode
import { jwtDecode } from "jwt-decode";

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
      const response = await axios.post('https://unit-solutions.vercel.app/api/user/sign-in/', {
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
        // const decoded = jwt_decode(access);
        const decoded = jwtDecode(access);
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        setAuth({
          user_id: decoded.user_id,
          user: decoded.email,
          roles: [decoded.user_group],
          username: decoded.username,
          accessToken: access,
        });

        localStorage.setItem('cat', [decoded.user_group]);

        navigate('/dashboard', { replace: true });

      } else {
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
    <div
      className='min-h-screen flex justify-center items-center bg-sky-500'
      // style={{ backgroundImage: "url('/Images/amboseli.jpg')" }}
    >
      <ToastContainer />
      {/* <div
        className='top-left-logo w-30 h-30'
        style={{ position: 'absolute', top: '10px', left: '10px' }}
      >
        <img
          src='/Images/sopalodges-logo.png'
          alt='logo'
          className='w-full h-full'
        />
      </div> */}

      <div className='p-6 rounded-lg bg-white opacity-80 shadow-md'>
        <div className='mb-4'>
          <h3 className='text-3xl text-gray-500 font-bold mb-1'>
            Welcome Back
          </h3>
          <p className='text-gray-500 mb-6'>Sign in to your account below.</p>
        </div>

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
              Password <span className='text-red-500'>*</span>
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
          <div className='mb-4 flex flex-wrap justify-between items-center'>
            <label className='flex items-center'>
              <input type='checkbox' className='form-checkbox text-red-500' />
              <span className='ml-2 text-gray-950'>Keep me signed in</span>
            </label>
            <Link
              to='/forgot-password'
              className='text-red-900 font-bold hover:underline'
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type='submit'
            className='w-full bg-[#4B0006] text-white px-4 py-2 rounded-lg hover:bg-blue-600'
          >
            Sign In
          </button>
        </form>

        {error && <p className='text-red-500 text-center mt-4'>{error}</p>}

        <div className='text-center mt-4'>
          <hr />
          <small className='text-gray-500'>
            Don&apos;t have an account?
          </small>{' '}
          <small className='text-gray-500'>
            Please{' '}
            <a href='mailto:johnnjauv@gmail.com' className='text-red-950'>
              contact
            </a>{' '}
            {/* Sopa Lodges */}
            
             Administrator to get an account
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
