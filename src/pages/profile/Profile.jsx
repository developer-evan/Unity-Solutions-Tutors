/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { TailSpin } from "react-loader-spinner";
function Profile() {
  const { auth } = useAuth();
  const id = auth.user_id;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
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
              <div>
                <h2 className="text-lg font-semibold">{userData.first_name || 'loading...'} {userData.last_name || 'loading...'}</h2>
                <p className="text-gray-600">{userData.email || 'loading...'}</p>
                {/* <p className="text-gray-600">{userData.date_joined || 'loading...'}</p> */}

              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Edit Profile
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
            </div>
            {/* Add more sections or details as needed */}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainLayout(Profile);
