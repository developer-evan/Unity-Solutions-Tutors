/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from 'react';
import MainLayout from '../../layout/MainLayout';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

function Users() {
  const [userData, setUserData] = useState([]);
  const { auth, setAuth } = useAuth();

  const isAdmin = auth.roles.includes(200) || auth.roles.includes(300);


  const getRandomColor = () => {
    const colors = ['sky-500', 'red-500', 'blue-600', 'green-500', 'yellow-500', 'indigo-500', 'pink-500', 'purple-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://unit-solutions.vercel.app/api/user/'); // Replace 'YOUR_API_ENDPOINT' with the actual endpoint
        setUserData(response.data); // Assuming the response is an array of user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-semibold mb-4">User List</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td className="p-2 text-start flex gap-2 flex-row border justify-start items-center capitalize">
                {/* Uncomment the following section if you want to include the avatar with a random color based on initials */}
                {/* <div className={`w-10 h-10 mr-4 text-white rounded-full flex items-center justify-center bg-${getRandomColor()}`}>
    {user.name.split(' ').map((word) => word.charAt(0)).join('')}
  </div> */}
                {/* {user.first_name} {user.last_name} */}
                {user.first_name ? <span className="text-gray-800">{user.first_name}</span>  : <span className="text-gray-400">admin</span>}
                {user.last_name ? <span className="text-gray-800">{user.last_name}</span> : <span className="text-gray-400">admin</span>}
              </td>

              <td className="p-2  border  text-start">{user.email}</td>
              <td className="p-2 border text-start">
                {user.phone ? user.phone : <span className="text-gray-400">admin</span>}
              </td>
              <td className="p-2 border text-start">
                {/* {isAdmin ? (
                  <span className="text-green-500">Admin</span>
                ) : (
                  <span className="text-blue-500">Writer</span>
                )} */}
                {user.phone ? <span className="text-green-500">Writer</span>
                  : <span className="text-gray-400">admin</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MainLayout(Users);
