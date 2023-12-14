/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from '../../layout/MainLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Tasks() {
  const [orders, setOrders] = useState([]);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    id: null,
    status: '',
    writer: '',
    client: '',
    book_balance: '',
    deadline: '',
  });
  const [writers, setWriters] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://adamsite-tawny.vercel.app/api/tasks/');
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

  const toggleAddOrderModal = () => {
    setShowAddOrderModal(!showAddOrderModal);
    setNewOrder({
      id: null,
      status: '',
      writer: '',
      client: '',
      book_balance: '',
      deadline: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleAddOrder = async () => {
    if (
      newOrder.status.trim() !== '' &&
      newOrder.writer.trim() !== '' &&
      newOrder.client.trim() !== '' &&
      newOrder.book_balance.trim() !== '' &&
      newOrder.deadline.trim() !== ''
    ) {
      try {
        if (newOrder.id) {
          // If an ID exists, it's an existing task that needs updating
          const response = await axios.put(`https://adamsite-tawny.vercel.app/api/tasks/${newOrder.id}`, newOrder);

          if (response.status === 200) {
            // alert('The task has been successfully updated');
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
          // If no ID, it's a new task that needs adding
          const response = await axios.post('https://adamsite-tawny.vercel.app/api/tasks/', newOrder);

          if (response.status === 201) {
            // alert('The task has been successfully added');
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
  }

  const handleEditOrder = (orderId) => {
    const orderToEdit = orders.find((order) => order.id === orderId);
    setNewOrder(orderToEdit);
    setShowAddOrderModal(true);
  };

  // const handleDeleteOrder = async (orderId) => {
  //   try {
  //     const response = await axios.delete(`https://adamsite-tawny.vercel.app/api/tasks/${orderId}`);
  //     if (response.status === 204) {
  //       const updatedOrders = orders.filter((order) => order.id !== orderId);
  //       setOrders(updatedOrders);
  //       toast.success('Task deleted successfully', {
  //         position: "top-center",
  //         autoClose: 3000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         draggable: true,
  //       });
  //     } else {
  //       // console.error('Failed to delete the task');
  //       toast.error('Failed to delete the task', {
  //         position: "top-center",
  //         autoClose: 3000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         draggable: true,
  //       });

  //     }
  //   } catch (error) {
  //     console.error('Error deleting task:', error);
  //   }
  // };
  const handleDeleteOrder = (orderId) => {
    setOrderToDelete(orderId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`https://adamsite-tawny.vercel.app/api/tasks/${orderToDelete}`);
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
        // console.error('Failed to delete the task');
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
        const response = await axios.get('https://adamsite-tawny.vercel.app/api/writers/all/');
        setWriters(response.data);
      } catch (error) {
        console.error('Error fetching writers:', error);
      }
    };
  
    fetchWriters();
  }, []);
  


  return (
    <div className="flex flex-col md:flex-row p-4 md:p-0">
      <ToastContainer />
      <div className="flex-1">
        <div className="bg-white shadow-md rounded-lg p-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>
            <button
              onClick={toggleAddOrderModal}
              className="px-2 py-1 bg-gray-800 text-gray-100 font-bold rounded hover:bg-gray-700"
            >
              Add Task
            </button>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-slate-400">
                  <th className="px-4 py-2 text-start">Status</th>
                  <th className="px-2 py-2 text-start">Writer</th>
                  <th className="px-2 py-2 text-start">Client</th>
                  <th className="px-2 py-2 text-start">Book Balance</th>
                  <th className="px-2 py-2 text-start">Deadline</th>
                  <th className="px-2 py-2 text-start">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-300 hover:bg-slate-100">
                    <td className="px-2 py-2">
                      <button
                        className={`bg-${order.status.toLowerCase()}-400 py-2 px-2 rounded-lg w-28 bg-sky-600 text-xs font-bold text-slate-100`}
                      >
                        {order.status}
                      </button>
                    </td>
                    <td className="px-2 py-2 text-gray-500">{order.writer}</td>
                    <td className="px-2 py-2 text-gray-500">{order.client}</td>
                    <td className="px-2 py-2 text-slate-600 font-semibold">{order.book_balance}</td>
                    <td className="px-2 py-2 text-slate-600 font-semibold">{order.deadline}</td>
                    <td className="px-2 py-2">
                      <button
                        onClick={() => handleEditOrder(order.id)}
                        className=" py-2 px-4 w-20 rounded-lg  bg-blue-600 text-xs font-bold text-slate-100 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="py-2 px-4 w-20 rounded-lg  bg-red-600 text-xs font-bold text-slate-100"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddOrderModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              {newOrder.id ? 'Edit Task' : 'Add Task'}
            </h2>
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
            {/* <div className="mb-4">
              <label className="block text-gray-800">Writer</label>
              <input
                type="text"
                name="writer"
                value={newOrder.writer}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div> */}

<div className="mb-4">
  <label className="block text-gray-800">Writer</label>
  <select
    name="writer"
    value={newOrder.writer}
    onChange={handleInputChange}
    className="w-full p-2 border border-gray-300 rounded"
  >
    <option value="">Select Writer</option>
    {writers.map((writer) => (
      <option key={writer.id} value={writer.name}>
        {writer.name}
      </option>
    ))}
  </select>
</div>

            <div className="mb-4">
              <label className="block text-gray-800">Client</label>
              <input
                type="text"
                name="client"
                value={newOrder.client}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
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
