/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import { FaCommentDollar, FaDatabase, FaHandshake, FaPlusCircle, FaUserCircle, FaUserEdit } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Tasks from "../tasks/Tasks";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from '../../hooks/useAuth';


function AdminDashboard() {
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [showAddWriterModal, setShowAddWriterModal] = useState(false);
  const [writerName, setWriterName] = useState("");
  const [writers, setWriters] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    id: null,
    status: '',
    title: '',
    writer: '',
    book_balance: '',
    deadline: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(4);

  
  const { auth } = useAuth();
  const isAdmin = auth.roles.includes(200) || auth.roles.includes(300);

  const { user_id } = auth;
  console.log(user_id, 'user_id')

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://unit-solutions.vercel.app/api/tasks/');
      if (response.status === 200) {
        setOrders(response.data);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const data = [
    {
      id: 1,
      title: "LAST 30 DAYS",
      content: "TURNOVER",
      value: "0.00",
      icon: <FaDatabase className="text-lg text-slate-100" />,
      bg: "bg-sky-600",
    },
    {
      id: 2,
      title: "LAST 30 DAYS",
      content: "PAYOUT",
      value: "0.00",
      icon: <FaCommentDollar className="text-lg text-slate-100" />,
      bg: "bg-orange-600",
    },
    // Tasks available
    
    {
      id: 3,
      title: "CLIENTS/ACCS",
      content: "ACCOUNTS",
      value: "10",
      icon: <FaHandshake className="text-lg text-slate-100" />,
      bg: "bg-green-600",
    },
    {
      id: 4,
      title: "ACTIVE WRITERS",
      content: "WRITERS",
      value: writers.length.toString(),
      icon: <FaUserEdit className="text-lg text-slate-100" />,
      bg: "bg-red-600",
    },
    // number of orders
    {
      id: 5,
      title: "ORDERS",
      content: "ORDERS",
      value: orders.length.toString(),
      icon: <FaPlusCircle className="text-lg text-slate-100" />,
      bg: "bg-indigo-600",
    },
  ];



  const displayedOrders = showAllOrders ? orders : orders.slice(0, 5);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = orders.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  

  return (
    <div className="flex flex-col space-y-2">
      <ToastContainer />
      {/* Welcome Message */}
      <div className="bg-white shadow-xs rounded-lg p-1">
        <h1 className="text-3xl font-semibold text-gray-800">Welcome Admin!</h1>
      </div>

      {/* Tasks Card */}
      <div className="flex">
        {data.map((item) => (
          <div className="max-w-xs mx-auto p-3" key={item.id}>
            <div className={`bg-white shadow-md rounded-lg p-3 flex space-x-8`}>
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

      <div className="flex flex-row space-x-4">
        <div className="flex-1 w-2/3">
          <div className="bg-white shadow-md rounded-lg p-2">
            {/* <div className="flex justify-between items-center ">
              <h2 className="text-xl font-semibold text-gray-800">Current Orders</h2>
              <a
                href="#"
                className="px-2 py-1 bg-gray-800 text-gray-100 font-bold rounded hover:bg-gray-700"
                onClick={() => setShowAllOrders(!showAllOrders)}
              >
                {showAllOrders ? "Show Less" : "View All"}
              </a>
            </div> */}

            {/* Task List */}
            <div className="flex-1">
      <div className="bg-white shadow-md rounded-lg p-1">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Current Orders</h2>
          {/* {isAdmin && (
            <button
              onClick={toggleAddOrderModal}
              className="px-2 py-1 bg-sky-500 text-gray-100 font-bold rounded hover:bg-gray-700 flex items-center"
            >
              <FaPlus className="inline-block mr-2" />
              Add Task
            </button>
          )} */}
        </div>

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
                  {/* {isAdmin && (
                    <td className="px-2 py-2 gap-4 flex flex-row">
                      <p
                        onClick={() => handleEditOrder(order.id)}
                        className="rounded-lg text-blue-600 text-xs cursor-pointer"
                      >
                        <FaPen className="inline-block" />
                      </p>
                      <p
                        onClick={() => handleDeleteOrder(order.id)}
                        className="rounded-lg text-red-600 text-xs cursor-pointer"
                      >
                        <FaTrash className="inline-block" />
                      </p>
                    </td>
                  )} */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4">
          <ul className="flex justify-center">
            {Array.from({ length: Math.ceil(orders.length / tasksPerPage) }, (_, i) => (
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
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
