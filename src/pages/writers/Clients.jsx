/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import MainLayout from "../../layout/MainLayout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Replace this with your dummy data
const dummyData = [
  {
    id: 1,
    company_name: "ABC Writing Services",
    contact_email: "john.doe@example.com",
    contact_phone: "123-456-7890",
    project_type: "Blog Post",
    project_description: "Write a series of blog posts on technology trends.",
    project_deadline: "2022-02-28",
  },
  // Add more dummy data as needed
];

function Clients() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    company_name: "",
    contact_email: "",
    contact_phone: "",
    project_type: "",
    project_description: "",
    project_deadline: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [deletingClient, setDeletingClient] = useState(null);

  const fetchData = async () => {
    // Simulate API call with a delay to mimic network latency
    setTimeout(() => {
      setClients(dummyData);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClient = () => {
    const newClientWithId = { ...newClient, id: clients.length + 1 };
    setClients([...clients, newClientWithId]);
    setIsModalOpen(false);
    resetForm();
    toast.success('Client added successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleUpdateClient = () => {
    if (editingClient) {
      const updatedClients = clients.map((client) =>
        client.id === editingClient.id ? { ...newClient } : client
      );
      setClients(updatedClients);
      setIsModalOpen(false);
      resetForm();
      toast.success('Client updated successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleDelete = (id) => {
    const updatedClients = clients.filter((client) => client.id !== id);
    setClients(updatedClients);
    setDeletingClient(null);
    toast.success('Client deleted successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const resetForm = () => {
    setNewClient({
      company_name: "",
      contact_email: "",
      contact_phone: "",
      project_type: "",
      project_description: "",
      project_deadline: "",
    });
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setIsModalOpen(true);
    setDeletingClient(null);
    setNewClient(client);
  };

  const handleCancel = () => {
    resetForm();
    setIsModalOpen(false);
    setEditingClient(null);
    setDeletingClient(null);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <ToastContainer />
      <h1 className="text-3xl font-semibold mb-4">Clients</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
        onClick={() => {
          setIsModalOpen(true);
          setEditingClient(null);
          setDeletingClient(null);
        }}
      >
        Add client
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white border border-gray-300 p-4 rounded-md shadow-md transition-transform hover:scale-105 transform-gpu"
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{client.company_name}</h2>
            <p className="text-gray-600"><span className="font-semibold">Type of Content:</span> {client.project_type}</p>
            <p className="text-gray-600"><span className="font-semibold">Project Deadline:</span> {client.project_deadline}</p>
            <p className="text-gray-600"><span className="font-semibold">Project Description:</span> {client.project_description}</p>
            <p className="text-gray-600"><span className="font-semibold">Contact Email:</span> {client.contact_email}</p>
            <p className="text-gray-600"><span className="font-semibold">Contact Phone:</span> {client.contact_phone}</p>
            {/* <p className="text-gray-600"><span className="font-semibold">Project Status:</span> {client.project_status}</p> */}
            

            {/* Add more fields as needed */}
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-md transition-transform transform-gpu hover:scale-105"
                onClick={() => handleEditClient(client)}
              >
                Edit
              </button>
              <button
                className="text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded-md transition-transform transform-gpu hover:scale-105"
                onClick={() => setDeletingClient(client)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow-md w-full md:w-2/3 lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">
              {editingClient ? "Edit client" : "Add New client"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                  value={newClient.company_name}
                  onChange={(e) => setNewClient({ ...newClient, company_name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Contact Email"
                  className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                  value={newClient.contact_email}
                  onChange={(e) => setNewClient({ ...newClient, contact_email: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Contact Phone"
                  className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                  value={newClient.contact_phone}
                  onChange={(e) => setNewClient({ ...newClient, contact_phone: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Project Type"
                  className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                  value={newClient.project_type}
                  onChange={(e) => setNewClient({ ...newClient, project_type: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Project Description"
                  className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                  value={newClient.project_description}
                  onChange={(e) => setNewClient({ ...newClient, project_description: e.target.value })}
                />
              </div>
              <div>
                <input
                  type="date"
                  placeholder="Project Deadline"
                  className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                  value={newClient.project_deadline}
                  onChange={(e) => setNewClient({ ...newClient, project_deadline: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
                onClick={editingClient ? handleUpdateClient : handleAddClient}
              >
                {editingClient ? "Update" : "Add"}
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {deletingClient && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete {deletingClient.company_name}?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
                onClick={() => {
                  handleDelete(deletingClient.id);
                  setDeletingClient(null);
                }}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                onClick={() => setDeletingClient(null)}
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

export default MainLayout(Clients);
