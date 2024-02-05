/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUp = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    specialization: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    specialization: '',
    email: '',
    phone: '',
    password: '',
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const clearFormValues = () => {
    setUserData({
      first_name: '',
      last_name: '',
      email: '',
      specialization: '',    
      phone: '',
      password: '',
    });
    setErrors({
      first_name: '',
      last_name: '',
      specialization: '',
      email: '',
      phone: '',
      password: '',
    });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://unit-solutions.vercel.app/api/user/register/', {
        first_name: userData.first_name,
        last_name: userData.last_name,
        specialization: userData.specialization,
        email: userData.email.toLowerCase(),
        phone: userData.phone,
        password: userData.password,
      });
      // Clear existing errors
      setErrors({
        first_name: '',
        last_name: '',
        specialization: '',
        email: '',
        phone: '',
        password: '',
      });
      if (response.status === 201 || response.status === 200) {
        toast.success('Signup successful', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // You can handle additional logic after successful signup, e.g., redirect to login page
        navigate('/login');
      } else {
        toast.error('Signup failed', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Set error messages based on the response
        setErrors(error.response.data);
      }
      console.error('Error during signup:', error);
      toast.error('Signup failed', {
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
    <div className='min-h-screen flex justify-center items-center bg-slate-900'>
      {/* <ToastContainer /> */}
      <ToastContainer/> 
      <div className='p-6 rounded-lg bg-white shadow-md'>
        <div className='mb-4'>
          <Link to='/'>
            <div className='flex justify-center w-full items-end gap-2'>
            <img src='./dark.png' alt='logo' className='h-16 ' />
            </div>
          </Link>
          <h3 className='text-3xl text-gray-500 font-bold mb-1'>
            Create an Account
          </h3>
          <p className='text-gray-500 mb-6'>Sign up for a new account below.</p>
        </div>

        <form onSubmit={handleSignupSubmit}>
          <div className='grid grid-cols-2 gap-4'>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='firstName'
              >
                First Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                value={userData.first_name}
                onChange={(e) =>
                  setUserData({ ...userData, first_name: e.target.value })
                }
                className={`w-full border rounded-md py-2 px-3 ${
                  errors.first_name ? 'border-red-500' : ''
                }`}
                placeholder='Enter your first name'
                required
              />
              {errors.first_name && (
                <p className='text-red-500 text-sm'>{errors.first_name[0]}</p>
              )}
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='lastName'
              >
                Last Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                value={userData.last_name}
                onChange={(e) =>
                  setUserData({ ...userData, last_name: e.target.value })
                }
                className={`w-full border rounded-md py-2 px-3 ${
                  errors.last_name ? 'border-red-500' : ''
                }`}
                placeholder='Enter your last name'
                required
              />
              {errors.last_name && (
                <p className='text-red-500 text-sm'>{errors.last_name[0]}</p>
              )}
            </div>
          </div>

          {/* ... (other input fields) */}
          <div className='grid grid-cols-2 gap-4'>
          <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='specialization'
              >
                Specialization <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='specialization'
                name='specialization'
                value={userData.specialization}
                onChange={(e) =>
                  setUserData({ ...userData, specialization: e.target.value })
                }
                className={`w-full border rounded-md py-2 px-3 ${
                  errors.specialization ? 'border-red-500' : ''
                }`}
                placeholder='Enter your specialization'
                required
              />
              {errors.specialization && (
                <p className='text-red-500 text-sm'>{errors.specialization[0]}</p>
              )}
            </div>
            <div className='mb-4'>
                <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='phone'
                >
                Phone Number <span className='text-red-500'>*</span>
                </label>
                <input
                type='text'
                id='phone'
                name='phone'
                value={userData.phone}
                onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                }
                className={`w-full border rounded-md py-2 px-3 ${
                    errors.phone ? 'border-red-500' : ''
                }`}
                placeholder='Enter your phone number'
                required
                />
                {errors.phone && (
                <p className='text-red-500 text-sm'>{errors.phone[0]}</p>
                )}
                </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>

            <div className='mb-4'>
                <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='email'
                >
                Email Address <span className='text-red-500'>*</span>
                </label>
                <input
                type='email'
                id='email'
                name='email'
                value={userData.email}
                onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                }
                className={`w-full border rounded-md py-2 px-3 ${
                    errors.email ? 'border-red-500' : ''
                }`}
                placeholder='Enter your email'
                required
                />
                {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email[0]}</p>
                )}
                </div>
                
                <div className='mb-4'>
                <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='password'
                >
                Password <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                value={userData.password}
                onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                }
                className={`w-full border rounded-md py-2 px-3 pr-10 ${
                    errors.password ? 'border-red-500' : ''
                }`}
                placeholder='Enter your password'
                required
                />
                <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none'
                >
                {showPassword ? (
                    <FaEyeSlash
                    className='text-gray-500 hover:text-gray-700 cursor-pointer' />
                ) : (
                    <FaEye
                    className='text-gray-500 hover:text-gray-700 cursor-pointer' />
                )}
                </button>
                </div>
                </div>
                </div>



          <button
            type='submit'
            className='w-full bg-[#364258] text-white px-4 py-2 rounded-lg hover:bg-blue-600'
          >
            Sign Up
          </button>
        </form>      


        {/* {error && <p className='text-red-500 text-center mt-4'>{error}</p>} */}

        <div className='text-center mt-4'>
          <hr />
          <small className='text-gray-500'>
            Already have an account?{' '}
            <Link to='/login' className='text-sky-500'>
              Sign In
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
