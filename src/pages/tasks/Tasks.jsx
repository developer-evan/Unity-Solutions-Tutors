/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from '../../layout/MainLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
// import Admin from '../../layout/dash/Admin';
import { Link } from 'react-router-dom';

function Tasks() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(4);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    id: null,
    status: '',
    title: '',
    writer: '',
    book_balance: '',
    deadline: '',
    attachment: '', // Change 'fileUrl' to 'attachment'
  });
  const [writers, setWriters] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [projects, setProjects] = useState([]);

  const { auth } = useAuth();
  const isAdmin = auth.roles.includes(200) || auth.roles.includes(300);

  const { user_id } = auth;

  const url = isAdmin ? `https://unit-solutions.vercel.app/api/tasks/` : `https://unit-solutions.vercel.app/api/tasks/user-specific/${user_id}/`;

  const fetchTasks = async () => {
    try {
      const response = await axios.get(url);
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

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://unit-solutions.vercel.app/api/projects/');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleAddOrderModal = () => {
    setShowAddOrderModal(!showAddOrderModal);
    setNewOrder({
      id: null,
      status: '',
      title: '',
      writer: '',
      book_balance: '',
      deadline: '',

      attachment: '', // Reset attachment when modal opens
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title') {
      const project = projects.find((project) => project.title === value);
      setNewOrder({ ...newOrder, [name]: value, attachment: project ? project.attachment : '' });
    } else {
      setNewOrder({ ...newOrder, [name]: value });
    }
  };

  const handleAddOrder = async () => {
    if (
      newOrder.status.trim() !== '' &&
      newOrder.writer.trim() !== '' &&
      newOrder.title.trim() !== '' &&
      newOrder.book_balance.trim() !== '' &&
      newOrder.deadline.trim() !== '' &&
      newOrder.attachment.trim() !== ''
    ) {
      try {
        if (newOrder.id) {
          const response = await axios.put(`https://unit-solutions.vercel.app/api/tasks/${newOrder.id}/`, newOrder);
          if (response.status === 200) {
            toast.success('Task updated successfully', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              draggable: true,
            });
          } else {
            console.error('Failed to update the task');
            toast.error('Failed to update the task', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              draggable: true,
            });
          }
        } else {
          const response = await axios.post('https://unit-solutions.vercel.app/api/tasks/', newOrder);
          if (response.status === 201) {
            toast.success('Task added successfully', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              draggable: true,
            });
          } else {
            console.error('Failed to add the task');
            toast.error('Failed to add the task', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              draggable: true,
            });
          }
        }
        fetchTasks();
        toggleAddOrderModal();
      } catch (error) {
        console.error('Error adding/updating task:', error);
      }
    }
  };

  const handleEditOrder = (orderId) => {
    const orderToEdit = orders.find((order) => order.id === orderId);
    setNewOrder(orderToEdit);
    setShowAddOrderModal(true);
  };

  const handleDeleteOrder = (orderId) => {
    setOrderToDelete(orderId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`https://unit-solutions.vercel.app/api/tasks/${orderToDelete}/`);
      if (response.status === 204) {
        const updatedOrders = orders.filter((order) => order.id !== orderToDelete);
        setOrders(updatedOrders);
        toast.success('Task deleted successfully', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
      } else {
        toast.error('Failed to delete the task', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setShowDeleteModal(false);
      setOrderToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const response = await axios.get('https://unit-solutions.vercel.app/api/user/');
        setWriters(response.data);
      } catch (error) {
        console.error('Error fetching writers:', error);
      }
    };
    fetchWriters();
  }, []);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = orders.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-0">
      <ToastContainer />
      <div className="flex-1">
        <div className="bg-white shadow-md rounded-lg p-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>
            {isAdmin && (
              <button
                onClick={toggleAddOrderModal}
                className="px-2 py-1 bg-sky-500 text-gray-100 font-bold rounded hover:bg-gray-700 flex items-center"
              >
                <FaPlus className="inline-block mr-2" />
                Add Task
              </button>
            )}
          </div>

          <div className="overflow-x-auto mt-6">
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
                      <Link
                        to={`${order.attachment}`} 
                        className="text-blue-500 hover:underline"
                      >
                        Project File
                      </Link>
                    </td>
                    <td className="px-2 py-2">
                      <button
                        className={`bg-${order.status.toLowerCase()}-400 py-2 px-2 rounded-lg w-28 bg-sky-600 text-xs font-bold text-slate-100`}
                      >
                        {order.status}
                      </button>
                    </td>
                    {isAdmin && (
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
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <ul className="flex justify-center">
              {Array.from({ length: Math.ceil(orders.length / tasksPerPage) }, (_, i) => (
                <li key={i} className="mr-1">
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
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

      {showAddOrderModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{newOrder.id ? 'Edit Task' : 'Add Task'}</h2>
            <div className="mb-4">
              <label className="block text-gray-800">Status</label>
              <select
                name="status"
                value={newOrder.status}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Status</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="New">New</option>
                <option value="Revision">Revision</option>
                <option value="Resubmission">Resubmission</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-800">Project</label>
              <select
                name="title"
                value={newOrder.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.title}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
            {newOrder.title && (
              <div className="mb-4">
                <label className="block text-gray-800">File URL</label>
                <input
                  type="text"
                  name="attachment"
                  value={newOrder.attachment}
                  className="w-full p-2 border border-gray-300 rounded"
                  readOnly
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-800">Writer Assigned</label>
              <select
                name="writer"
                value={newOrder.writer}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Writer</option>
                {writers.map((writer) => (
                  <option key={writer.id} value={writer.name}>
                    {writer.first_name} {writer.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-800">Book Balance</label>
              <input
                type="text"
                name="book_balance"
                value={newOrder.book_balance}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={newOrder.deadline}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddOrder}
                className="px-4 py-2 bg-green-500 text-white rounded hover-bg-green-600"
              >
                {newOrder.id ? 'Save' : 'Add'}
              </button>
              <button
                onClick={toggleAddOrderModal}
                className="ml-2 px-4 py-2 bg-gray-400 text-gray-900 rounded hover-bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this task?</p>
            <div className="flex mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainLayout(Tasks);
