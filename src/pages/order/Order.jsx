
import { useState } from 'react';
import MainLayout from '../../layout/MainLayout';

const initialOrders = [
  {
    id: 1,
    status: 'New',
    writer: 'John Denver',
    client: 'Client A',
    bookBalance: '$500',
    value: '20.37%',
  },
  {
    id: 2,
    status: 'Pending',
    writer: 'Jane Erickson',
    client: 'Client B',
    bookBalance: '$800',
    value: '15.12%',
  },
];

function Order() {
  const [orders, setOrders] = useState(initialOrders);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    status: '',
    writer: '',
    client: '',
    bookBalance: '',
    value: '',
  });

  const toggleAddOrderModal = () => {
    setShowAddOrderModal(!showAddOrderModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleAddOrder = () => {
    // Validate and format the new order data as needed
    if (
      newOrder.status.trim() !== '' &&
      newOrder.writer.trim() !== '' &&
      newOrder.client.trim() !== '' &&
      newOrder.bookBalance.trim() !== '' &&
      newOrder.value.trim() !== ''
    ) {
      setOrders([...orders, newOrder]);
      setNewOrder({
        status: '',
        writer: '',
        client: '',
        bookBalance: '',
        value: '',
      });
      setShowAddOrderModal(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-0">
    <div className="flex-1">
      <div className="bg-white shadow-md rounded-lg p-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Current Orders</h2>
          <button
            onClick={toggleAddOrderModal}
            className="px-2 py-1 bg-gray-800 text-gray-100 font-bold rounded hover:bg-gray-700"
          >
            Add Order
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
                <th className="px-2 py-2 text-start">Value</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through the orders and display them */}
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-gray-300">
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
                  <td className="px-2 py-2 text-slate-600 font-semibold">{order.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Add Order Modal */}
    {showAddOrderModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Add Order</h2>
          <div className="mb-4">
            <label className="block text-gray-800">Status</label>
            <input
              type="text"
              name="status"
              value={newOrder.status}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
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
            <label className="block text-gray-800">Value</label>
            <input
              type="text"
              name="value"
              value={newOrder.value}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleAddOrder}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add
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


export default MainLayout(Order);
