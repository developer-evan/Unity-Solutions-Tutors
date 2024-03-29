/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import MainLayout from "../../layout/MainLayout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FaPlus, FaPen, FaTrash } from 'react-icons/fa';


function Clients() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    country: "",
    company_name: "",
    contact_email: "",
    contact_phone: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [deletingClient, setDeletingClient] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://unitysolutionstutors.vercel.app/api/clients/");
      setClients(response.data);
    } catch (error) {
      handleRequestError("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRequestError = (message, error) => {
    console.error(message, error);
    toast.error('Something went wrong. Please try again later.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const handleAddClient = async () => {
    try {
      const response = await axios.post("https://unitysolutionstutors.vercel.app/api/clients/", newClient);

      if (response.status === 201) {
        const data = response.data;
        setClients([...clients, data]);
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
      } else {
        throw new Error('Failed to add client');
      }
    } catch (error) {
      handleRequestError("Error adding client:", error);
    }
  };

  const handleUpdateClient = async () => {
    try {
      if (editingClient) {
        // const response =
         await axios.put(`https://unitysolutionstutors.vercel.app/api/clients/${editingClient.id}/`, newClient);

        // if (response.status === 200) {
          const updatedClients = clients.map((client) =>
            client.id === editingClient.id ? { ...newClient } : client
          );        
          toast.success('Client updated successfully', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setClients(updatedClients);
          setIsModalOpen(false);
          resetForm();
          // setEditingClient(null);
        // } else {
        //   throw new Error('Failed to update client');
        // }
      }
    } catch (error) {
      // handleRequestError("Error updating client:", error);
      toast.error('Failed to update client data', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      // const response = 
      await axios.delete(`https://unitysolutionstutors.vercel.app/api/clients/${id}/`);
  
      // if (response.status === 200) {
        // Update state only if the deletion was successful
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
      // } else {
      //   throw new Error('Failed to delete client');
      // }
    } catch (error) {
      // If an error occurs during deletion, show an error toast without updating state
      toast.error('Failed to delete client', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  

  const resetForm = () => {
    setNewClient({
      country: "",
      company_name: "",
      contact_email: "",
      contact_phone: "",
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold mb-4">Clients</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 flex items-center transition-transform transform-gpu hover:scale-105"
          onClick={() => {
            setIsModalOpen(true);
            setEditingClient(null);
            setDeletingClient(null);
          }}
        >
          <FaPlus className="inline-block mr-2 mb-1" />
          Add client
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Country</th>
            <th className="border border-gray-300 p-2">Company Name</th>
            <th className="border border-gray-300 p-2">Contact Email</th>
            <th className="border border-gray-300 p-2">Contact Phone</th>
            <th className=" border border-gray-300p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="border border-gray-300 p-2">{client.country}</td>
              <td className="border border-gray-300 p-2">{client.company_name}</td>
              <td className="border border-gray-300 p-2">{client.contact_email}</td>
              <td className="border border-gray-300 p-2">{client.contact_phone}</td>
              <td className=" p-2 flex flex-row gap-2 items-center">
               
                <p
                  onClick={() => handleEditClient(client)}
                  className="  rounded-lg text-blue-600 text-xs cursor-pointer  "
                >
                  <FaPen className="inline-block " />
                </p>
                <p
                  onClick={() => setDeletingClient(client)}
                  className="rounded-lg text-red-600 text-xs cursor-pointer "
                >
                  <FaTrash className="inline-block " />
                </p>
              </td>
               
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow-md w-full md:w-2/3 lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">
              {editingClient ? "Edit client" : "Add New client"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div>
                {/* ... (other input fields) */}
                <label className="block mb-2" htmlFor="country">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={newClient.country}
                  onChange={(e) =>
                    setNewClient({ ...newClient, country: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <label className="block mb-2" htmlFor="company_name">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={newClient.company_name}
                  onChange={(e) =>
                    setNewClient({ ...newClient, company_name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <label className="block mb-2" htmlFor="contact_email">
                  Contact Email
                </label>
                <input
                  type="text"
                  id="contact_email"
                  name="contact_email"
                  value={newClient.contact_email}
                  onChange={(e) =>
                    setNewClient({ ...newClient, contact_email: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <label className="block mb-2" htmlFor="contact_phone">
                  Contact Phone
                </label>
                <input
                  type="text"
                  id="contact_phone"
                  name="contact_phone"
                  value={newClient.contact_phone}
                  onChange={(e) =>
                    setNewClient({ ...newClient, contact_phone: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
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
