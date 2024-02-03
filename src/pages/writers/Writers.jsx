/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../../hooks/useAuth";
import moment from 'moment';


const getFormattedDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1; // Months are 0-indexed
  month = month < 10 ? `0${month}` : month;
  let day = today.getDate();
  day = day < 10 ? `0${day}` : day;
  return `${year}-${month}-${day}`;
};

function Writers() {
  const [writers, setWriters] = useState([]);
  const [currentDate, setCurrentDate] = useState(getFormattedDate());

  const [newWriter, setNewWriter] = useState({
    first_name: "",
    last_name: "",
    specialization: "",
    date: currentDate,
    email: "",
    phone_number: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWriter, setEditingWriter] = useState(null);
  const [deletingWriter, setDeletingWriter] = useState(null);
  const { auth, setAuth } = useAuth();
  
  const isAdmin = auth.roles.includes(200) || auth.roles.includes(300);

  // const filteredWriters = isAdmin ? writers : writers.filter((writer) => writer.id === auth.id);
  // const filteredWriters = writers.filter(writer => writer.roles.includes(100) && !isAdmin);
  // const filteredWriters = writers.filter(writer => writer.roles && writer.roles.includes(100) && !isAdmin);




  const fetchData = async () => {
    try {
      const response = await axios.get("https://unit-solutions.vercel.app/api/user/");
      setWriters(response.data);
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

  const handleAddWriter = async () => {
    try {
      // Send a POST request to add a new writer
      const response = await axios.post("https://unit-solutions.vercel.app/api/writers/", newWriter);
      setWriters([...writers, response.data]);
      // alert("Writer added successfully");
      toast.success('Writer added successfully', {
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
      console.error("Error adding writer:", error);
      toast.error('Error adding writer', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleUpdateWriter = async () => {
    try {
      if (editingWriter) {
        // Send a PATCH request to update an existing writer
        await axios.patch(`https://unit-solutions.vercel.app/user/get-user/${editingWriter.id}/`, newWriter);
        const updatedWriters = writers.map((writer) =>
          writer.id === editingWriter.id ? { ...newWriter } : writer
        );
        // alert("Writer updated successfully");
        toast.success('Writer updated successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setWriters(updatedWriters);
        setIsModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error updating writer:", error);
      toast.error('Error updating writer', {
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
      // Send a DELETE request to delete a writer by ID
      await axios.delete(`https://unit-solutions.vercel.app/api/writers/delete/${id}`);
      const updatedWriters = writers.filter((writer) => writer.id !== id);
      setWriters(updatedWriters);
      setDeletingWriter(null); // Reset deletingWriter
      // alert("Writer deleted successfully");
      toast.success('Writer deleted successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error deleting writer:", error);
      toast.error('Error deleting writer', {
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
    setNewWriter({
      first_name: "",
      last_name: "",
      specialization: "",
      date: currentDate, // Set the current date when resetting the form
      email: "",
      phone_number: "",
    });
  };

  const handleEditWriter = (writer) => {
    setEditingWriter(writer);
    setIsModalOpen(true);
    setDeletingWriter(null); // Reset deletingWriter when editing
    setNewWriter(writer); // Pre-fill the form with existing data
  };

  const handleCancel = () => {
    resetForm();
    setIsModalOpen(false);
    setEditingWriter(null);
    setDeletingWriter(null);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <ToastContainer />
      <h1 className="text-3xl font-semibold mb-4">Writers</h1>
      {/* <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
        onClick={() => {
          setIsModalOpen(true);
          setEditingWriter(null);
          setDeletingWriter(null); // Reset deletingWriter when adding
        }}
      >
        Add Writer
      </button> */}
      {/* {!isAdmin && ( */}
  <table className="table w-full">
    <thead>
      <tr className="bg-gray-800 text-white">
        <th className="p-2">#</th>
        <th className="p-2">Name</th>
        <th className="p-2">Specialization</th>
        <th className="p-2">Email</th>
        <th className="p-2">Phone Number</th>
        <th className="p-2">Date Added</th>
        <th className="p-2">Action</th>
      </tr>
    </thead>
    <tbody>
      {writers.map((writer, index) => (
        <tr key={writer.id} className={index % 2 === 0 ? 'bg-slate-200' : 'bg-white'}>
          <td className="p-2">{index + 1}</td>
          <td className="p-2">{writer.first_name} {writer.last_name}</td>
          <td className="p-2">{writer.specialization}</td>
          <td className="p-2">{writer.email}</td>
          <td className="p-2">{writer.phone}</td>
          <td className="p-2">{moment(writer.date_joined).format('YYYY-MM-DD')}</td>
          <td className="p-2">
            <button
              className="text-white bg-blue-500 hover:bg-blue-700 py-1 px-2 rounded-md transition-transform transform-gpu hover:scale-105 mr-1"
              onClick={() => handleEditWriter(writer)}
            >
              Edit
            </button>
            <button
              className="text-white bg-red-500 hover:bg-red-700 py-1 px-2 rounded-md transition-transform transform-gpu hover:scale-105"
              onClick={() => setDeletingWriter(writer)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
{/* )} */}




      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">
              {editingWriter ? "Edit Writer" : "Add New Writer"}
            </h2>
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              value={newWriter.name}
              onChange={(e) => setNewWriter({ ...newWriter, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Specialization"
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              value={newWriter.specialization}
              onChange={(e) => setNewWriter({ ...newWriter, specialization: e.target.value })}
            />
            <input
              type="date"
              placeholder="Date Added"
              className="hidden md:hidden  border border-gray-300 rounded-md p-2 mb-2 w-full"
              value={newWriter.date}
              onChange={(e) => setNewWriter({ ...newWriter, date: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              value={newWriter.email}
              onChange={(e) => setNewWriter({ ...newWriter, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="border border-gray-300 rounded-md p-2 mb-4 w-full"
              value={newWriter.phone_number}
              onChange={(e) => setNewWriter({ ...newWriter, phone_number: e.target.value })}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
                onClick={editingWriter ? handleUpdateWriter : handleAddWriter}
              >
                {editingWriter ? "Update" : "Add"}
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

      {deletingWriter && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete {deletingWriter.name}?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
                onClick={() => {
                  handleDelete(deletingWriter.id);
                  setDeletingWriter(null);
                }}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                onClick={() => setDeletingWriter(null)}
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

export default MainLayout(Writers);
