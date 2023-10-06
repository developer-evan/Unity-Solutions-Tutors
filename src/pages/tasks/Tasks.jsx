import { useState } from 'react';
import MainLayout from '../../layout/MainLayout';

const initialTasks = [
  {
    id: 1,
    status: 'New',
    writer: 'John Denver',
    client: 'Client A',
    bookBalance: '$500',
    deadline: '2021-10-10',
  },
  {
    id: 2,
    status: 'Pending',
    writer: 'Jane Erickson',
    client: 'Client B',
    bookBalance: '$800',
    deadline: '2021-10-10',
  },
];

function Tasks() {
  const [orders, setOrders] = useState(initialTasks);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    id: null, // Add an ID field for tracking edited order
    status: '',
    writer: '',
    client: '',
    bookBalance: '',
    deadline: '',
  });

  const toggleAddOrderModal = () => {
    setShowAddOrderModal(!showAddOrderModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleAddOrder = () => {
    if (
      newOrder.status.trim() !== '' &&
      newOrder.writer.trim() !== '' &&
      newOrder.client.trim() !== '' &&
      newOrder.bookBalance.trim() !== '' &&
      newOrder.deadline.trim() !== ''
    ) {
      if (newOrder.id !== null) {
        // Edit existing order
        const updatedOrders = orders.map((order) =>
          order.id === newOrder.id ? newOrder : order
        );
        setOrders(updatedOrders);
      } else {
        // Add new order
        setOrders([...orders, { ...newOrder, id: Date.now() }]);
      }

      // Clear the newOrder state
      setNewOrder({
        id: null,
        status: '',
        writer: '',
        client: '',
        bookBalance: '',
        deadline: '',
      });

      setShowAddOrderModal(false);
    }
  };

  const handleEditOrder = (orderId) => {
    // Find the order you want to edit by its ID
    const orderToEdit = orders.find((order) => order.id === orderId);

    // Set the newOrder state to the order you want to edit
    setNewOrder(orderToEdit);

    // Show the modal for editing
    setShowAddOrderModal(true);
  };

  const handleDeleteOrder = (orderId) => {
    // Filter out the order with the given ID and update the orders state
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
  };

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-0">
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
                    <td className="px-2 py-2 text-slate-600 font-semibold">{order.bookBalance}</td>
                    <td className="px-2 py-2 text-slate-600 font-semibold">{order.deadline}</td>
                    <td className="px-2 py-2">
                      <button
                        onClick={() => handleEditOrder(order.id)}
                        className="bg-blue-400 py-2 px-2 rounded-lg w-28 bg-blue-600 text-xs font-bold text-slate-100 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="bg-red-400 py-2 px-2 rounded-lg w-28 bg-red-600 text-xs font-bold text-slate-100"
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
                <option value="Complete">Complete</option>
                <option value="Canceled">Canceled</option>
                <option value="New">New</option>
                <option value="Revision">Revision</option>
                <option value="Resubmission">Resubmission</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-800">Writer</label>
              <input
                type="text"
                name="writer"
                value={newOrder.writer}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
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
                name="bookBalance"
                value={newOrder.bookBalance}
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
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                {newOrder.id ? 'Save' : 'Add'}
              </button>
              <button
                onClick={toggleAddOrderModal}
                className="ml-2 px-4 py-2 bg-gray-400 text-gray-900 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainLayout(Tasks);
