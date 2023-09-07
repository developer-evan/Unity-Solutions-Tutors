// src/components/Landing.jsx
// import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

const Landing = () => {
  return (
    <div>
      <Header />
      <div className="bg-gradient-to-r from-blue-400 to-indigo-600 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-3xl font-semibold mb-4 text-center">Welcome to Our Website</h1>
          <p className="text-gray-600 text-center mb-8">Discover amazing features of our platform.</p>
          <div className="flex justify-between">
            <Link to="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Login
            </Link>
            <Link to="/signup" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
