/* eslint-disable no-unused-vars */
// App.js
import React from 'react';


function App() {
  return (
    <div>
      <header className="bg-blue-700 p-4">
        <div className="container mx-auto">
          <h1 className="text-white text-2xl font-semibold">Adam Admin</h1>
        </div>
      </header>
      <div className="bg-gradient-to-r from-blue-400 to-indigo-600 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-3xl font-semibold mb-4 text-center">Welcome to Our Website</h1>
          <p className="text-gray-600 text-center mb-8">Discover amazing features of our platform.</p>
          <div className="flex justify-between">
            <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Login
            </a>
            <a href="/signup" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
