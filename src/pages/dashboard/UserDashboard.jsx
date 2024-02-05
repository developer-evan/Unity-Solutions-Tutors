/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import { FaCommentDollar, FaDatabase, FaUserCircle, FaUserEdit } from "react-icons/fa";
import MainLayout from "../../layout/MainLayout";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPen, FaDollarSign } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';

function UserDashboard() {
    const [tasks, setTasks] = useState([]);
    const [earnings, setEarnings] = useState(0);
    const [profileCompletion, setProfileCompletion] = useState(79);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { auth, setAuth } = useAuth();
    const id = auth.user_id;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://unit-solutions.vercel.app/api/user/get-user/${id}/`);
            setUserData(response.data);
            setLoading(false);
          } catch (error) {
            setError(error);
            setLoading(false);
            console.error(error);
          }
        };
        fetchData();
      }, [id]);

    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://unit-solutions.vercel.app/api/tasks/');
        if (response.status === 200) {
          setTasks(response.data);
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    const fetchEarnings = async () => {
      // You would implement a function to fetch earnings based on the user's ID or other criteria
      // Example: const earningsResponse = await axios.get('https://api.example.com/earnings/user_id');
      // Set earnings based on the response
      // setEarnings(earningsResponse.data.totalEarnings);
    };

    const fetchProfileCompletion = async () => {
      // Placeholder for fetching profile completion information
      // Implement a function to fetch the user's profile completion status
      // Example: const profileCompletionResponse = await axios.get('https://api.example.com/profile-completion/user_id');
      // Set profileCompletion based on the response
      // setProfileCompletion(profileCompletionResponse.data.completionPercentage);
    };
  
    useEffect(() => {
      fetchTasks();
      fetchEarnings();
      fetchProfileCompletion();
    }, []);
  
    const data = [
      {
        id: 1,
        title: "Total Tasks",
        content: "WRITING",
        value: tasks.length,
        icon: <FaPen className="text-lg text-slate-100" />,
        bg: "bg-blue-500",
      },
      {
        id: 2,
        title: "Total Earnings",
        content: "USD",
        value: earnings,
        icon: <FaDollarSign className="text-lg text-slate-100" />,
        bg: "bg-green-500",
      },
    ];
  
    return (
      <div className="flex flex-col space-y-4">
        <ToastContainer />
        <div className="bg-white shadow-xs rounded-lg p-6">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome, 
          <span className="text-green-500"> {userData.username}</span>!
          </h1>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 ">
          <h2 className="text-xl font-semibold text-gray-800">Profile Completion</h2>
          <p className="text-gray-600 mt-2">Complete your profile to enhance your experience and unlock additional features.</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <FaUserEdit className="text-2xl text-sky-600" />
              <span className="text-slate-600 font-semibold">{profileCompletion}% Complete</span>
            </div>
            <div className="w-2/3 mr-2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-sky-600 rounded-full h-2"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
            <button className="bg-sky-600 text-slate-100 px-3 py-2 rounded-full">Complete Profile</button>
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          {data.map((item) => (
            <div className="max-w-md w-1/2 mx-auto p-3" key={item.id}>
              <div className={`bg-white shadow-md rounded-lg p-3 flex space-x-16`}>
                <div>
                  <h2 className="text-xs font-semibold mb-2">{item.title}</h2>
                  <p className="text-gray-600 flex flex-col space-y-2 ">
                    <span className="text-slate-400 text-xs">{item.content}</span>
                    <span className="font-bold text-slate-400">{item.value} </span>
                  </p>
                </div>
                <div className=" ">
                  <p className={`${item.bg} p-3 rounded-full`}>
                    {item.icon}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1">
          <div className="bg-white shadow-md rounded-lg p-3 mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Your Writing Tasks</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-slate-400">
                    <th className="px-4 py-2 text-start">Status</th>
                    <th className="px-2 py-2 text-start">Title</th>
                    <th className="px-2 py-2 text-start">Book Balance</th>
                    <th className="px-2 py-2 text-start">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-t border-gray-300 hover:bg-slate-100">
                      <td className="px-2 py-2">
                        <button
                          className={`bg-${task.status.toLowerCase()}-400 py-2 px-2 rounded-lg w-28 bg-sky-600 text-xs font-bold text-slate-100`}
                        >
                          {task.status}
                        </button>
                      </td>
                      <td className="px-2 py-2 text-gray-500">{task.title}</td>
                      <td className="px-2 py-2 text-slate-600 font-semibold">{task.book_balance}</td>
                      <td className="px-2 py-2 text-slate-600 font-semibold">{task.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default UserDashboard;
