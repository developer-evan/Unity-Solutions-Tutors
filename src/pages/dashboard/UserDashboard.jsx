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
import { Link } from "react-router-dom";

function UserDashboard() {
    const [tasks, setTasks] = useState([]);
    const [earnings, setEarnings] = useState(0);
    const [profileCompletion, setProfileCompletion] = useState(79);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(2);
    const [orders, setOrders] = useState([]);
  
    const { auth, setAuth } = useAuth();
    const id = auth.user_id;    
    const isAdmin = auth.roles.includes(200) || auth.roles.includes(300);
    const { user_id } = auth;
    console.log(user_id, 'user_id');

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

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const url = isAdmin ? `https://unit-solutions.vercel.app/api/tasks/` : `https://unit-solutions.vercel.app/api/tasks/user-specific/${user_id}/`;
                const response = await axios.get(url);
                if (response.status === 200) {
                    setTasks(response.data);
                } else {
                    console.error('Failed to fetch tasks');
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        
        fetchTasks();
    }, [isAdmin, user_id]);

    useEffect(() => {
        // Placeholder for fetchEarnings and fetchProfileCompletion
        // You can implement these functions to fetch data as needed
        const fetchEarnings = async () => {
            // Example implementation
            // const earningsResponse = await axios.get('https://api.example.com/earnings/user_id');
            // setEarnings(earningsResponse.data.totalEarnings);
        };

        const fetchProfileCompletion = async () => {
            // Example implementation
            // const profileCompletionResponse = await axios.get('https://api.example.com/profile-completion/user_id');
            // setProfileCompletion(profileCompletionResponse.data.completionPercentage);
        };

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

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col space-y-1 mb-10">
            <ToastContainer />
            <div className="bg-white shadow-xs rounded-lg p-3">
                <h1 className="text-3xl font-semibold text-gray-800">Welcome,
                    <span className="text-green-500"> {userData.username}</span>!
                </h1>
            </div>
            {/* <div className="bg-white shadow-md rounded-lg p-2 ">
                <h2 className="text-xl font-semibold text-gray-800">Profile Completion</h2>
                <p className="text-gray-600 ">Complete your profile to enhance your experience and unlock additional features.</p>
                <div className="flex items-center justify-between mt-2">
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
            </div> */}
            <div className="flex flex-row space-x-4 mx-8">
                {data.map((item) => (
                    <div className="max-w-md w-1/2 mx-auto " key={item.id}>
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
                <div className="bg-white shadow-md rounded-lg p-3 ">
                    <h2 className="text-xl font-semibold text-gray-800">Your Writing Tasks</h2>
                    <div className="overflow-x-auto mt-2">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-slate-400">
                                    <th className="px-2 py-2 text-start">Project Title</th>
                                    <th className="px-2 py-2 text-start">Writer Assigned</th>
                                    {isAdmin && <th className="px-2 py-2 text-start">Book Balance</th>}
                                    <th className="px-2 py-2 text-start">Deadline</th>
                                    <th className="px-2 py-2 text-start">File</th>
                                    <th className="px-4 py-2 text-start">Status</th>
                                    {isAdmin && <th className="px-2 py-2 text-start">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {currentTasks.map((order) => (
                                    <tr key={order.id} className="border border-gray-300 hover:bg-slate-100">
                                        <td className="px-2 py-2 text-gray-500">{order.title}</td>
                                        <td className="px-2 py-2 text-gray-500">{order.writer}</td>
                                        {isAdmin && (
                                            <td className="px-2 py-2 text-slate-600 font-semibold">{order.book_balance}</td>
                                        )}
                                        <td className="px-2 py-2 text-slate-600 font-semibold">{order.deadline}</td>
                                        <td className="p-2">
                                            <Link to={order.fileUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                                                Open File
                                            </Link>
                                        </td>
                                        <td className="px-2 py-2">
                                            <button
                                                className={`bg-${order.status.toLowerCase()}-400 py-2 px-2 rounded-lg w-28 bg-sky-600 text-xs font-bold text-slate-100`}
                                            >
                                                {order.status}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4">
                        <ul className="flex justify-center">
                            {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (_, i) => (
                                <li key={i} className="mr-1">
                                    <button
                                        onClick={() => paginate(i + 1)}
                                        className={`px-3 py-1 rounded ${
                                            currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
