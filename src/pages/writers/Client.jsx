/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import MainLayout from "../../layout/MainLayout";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Client() {
    const [clients, setClients] = useState([]);
    const [currentDate, setCurrentDate] = useState(getFormattedDate());
  
    const [newClient, setNewClient] = useState({
      name: "",
      specialization: "",
      date: currentDate,
      email: "",
      phone_number: "",
    });
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [deletingClient, setDeletingClient] = useState(null);
  
    const fetchData = async () => {
      try {
        const response = await axios.get("https://unit-solutions.vercel.app/api/clients/all/");
        setClients(response.data);
        console.log(response.data);
        // alert("Data fetched successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error('Error fetching data', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []); // Fetch data when the component mounts
  
    useEffect(() => {
      // Update the current date whenever the component re-renders
      setCurrentDate(getFormattedDate());
    }, []);
  
    const handleAddclient = async () => {
      try {
        // Send a POST request to add a new client
        const response = await axios.post("https://unit-solutions.vercel.app/api/clients/", newclient);
        setClients([...clients, response.data]);
        // alert("client added successfully");
        toast.success('Client added successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
  
        setIsModalOpen(false);
        resetForm();
      } catch (error) {
        console.error("Error adding client:", error);
        toast.error('Error adding client', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };
  
    const handleUpdateClient = async () => {
      try {
        if (editingclient) {
          // Send a PATCH request to update an existing client
          await axios.patch(`https://unit-solutions.vercel.app/api/clients/update/${editingclient.id}`, newclient);
          const updatedclients = clients.map((client) =>
            client.id === editingClient.id ? { ...newClient } : client
          );
          // alert("client updated successfully");
          toast.success('Client updated successfully', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setclients(updatedclients);
          setIsModalOpen(false);
          resetForm();
        }
      } catch (error) {
        console.error("Error updating client:", error);
        toast.error('Error updating client', {
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
        // Send a DELETE request to delete a client by ID
        await axios.delete(`https://unit-solutions.vercel.app/api/clients/delete/${id}`);
        const updatedClients = clients.filter((client) => client.id !== id);
        setClients(updatedClients);
        setDeletingclient(null); // Reset deletingclient
        // alert("client deleted successfully");
        toast.success('client deleted successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error("Error deleting Client:", error);
        toast.error('Error deleting client', {
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
      setNewclient({
        name: "",
        specialization: "",
        date: currentDate, // Set the current date when resetting the form
        email: "",
        phone_number: "",
      });
    };
  
    const handleEditClient = (client) => {
      setEditingClient(client);
      setIsModalOpen(true);
      setDeletingClient(null); // Reset deletingclient when editing
      setNewClient(client); // Pre-fill the form with existing data
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
            setDeletingClient(null); // Reset deletingclient when adding
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
              <h2 className="text-xl font-semibold text-blue-700">{client.name}</h2>
              <p className="text-gray-600 mt-2">Specialization: {client.specialization}</p>
              <p className="text-gray-600">Email: {client.email}</p>
              <p className="text-gray-600">Phone Number: {client.phone_number}</p>
              <p className="text-gray-600">Date Added: {client.date}</p>
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
            <div className="bg-white p-4 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
              <h2 className="text-2xl font-semibold mb-4">
                {editingClient ? "Edit client" : "Add New client"}
              </h2>
              <input
                type="text"
                placeholder="Name"
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Specialization"
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                value={newClient.specialization}
                onChange={(e) => setNewClient({ ...newClient, specialization: e.target.value })}
              />
              <input
                type="date"
                placeholder="Date Added"
                className="hidden md:hidden  border border-gray-300 rounded-md p-2 mb-2 w-full"
                value={newClient.date}
                onChange={(e) => setNewClient({ ...newClient, date: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                value={newClient.phone_number}
                onChange={(e) => setNewClient({ ...newClient, phone_number: e.target.value })}
              />
              <div className="flex justify-end">
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
              <p>Are you sure you want to delete {deletingClient.name}?</p>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
                  onClick={() => {
                    handleDelete(deletingClient.id);
                    setDeletingclient(null);
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
  

export default Client
