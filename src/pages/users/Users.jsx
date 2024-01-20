/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
// import React from 'react';
import MainLayout from '../../layout/MainLayout';

const userData = [
  {
    id: 1,
    name: 'John Doe',
    status: 'Writer',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  },
  {
    id: 2,
    name: 'Jane Smith',
    status: 'Admin',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    status: 'Writer',
    email: 'bob@ju.ki',
    phone: '555-555-5555',
  }
  // Add more user data as needed
];

function Users() {
  const getRandomColor = () => {
    const colors = ['sky-500', 'red-500', 'blue-600', 'green-500', 'yellow-500', 'indigo-500', 'pink-500', 'purple-500' ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-semibold mb-4">User List</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            {/* <th className="border border-gray-300 p-2">ID</th> */}
            {/* <th className="border border-gray-300 p-2">Profile</th> */}
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id} 
            className=''
            >
              {/* <td className="p-2">{user.id}</td> */}
              {/* <td className="p-2 text-center">
                <div className={`w-8 h-8 text-white rounded-full flex items-center justify-center bg-${getRandomColor()}`}>
                  {user.name.split(' ').map((word) => word.charAt(0)).join('')}
                </div> */}
              {/* </td> */}
              <td className="p-2 text-start flex flex-row justify-start items-center ">
              {/* <td className="p-2 text-center"> */}
                <div className={`w-10 h-10 mr-4 text-white rounded-full flex items-center justify-center bg-sky-600 `}>
                  {user.name.split(' ').map((word) => word.charAt(0)).join('')}
                </div>
                {user.name}
                </td>
              <td className="p-2 text-start">{user.email}</td>
              <td className="p-2 text-start">{user.phone}</td>
              <td className="p-2 text-start">
                {user.status === 'Admin' ? (
                  <span className="text-green-500">Admin</span>
                ) : (
                  <span className="text-blue-500">Writer</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MainLayout(Users);
