import { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import axios from "axios";

function Writers() {
  const [writers, setWriters] = useState([]);
  const [newWriter, setNewWriter] = useState({
    name: "",
    specialization: "",
    date: "",
    email: "",
    phone_number: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWriter, setEditingWriter] = useState(null);
  const [deletingWriter, setDeletingWriter] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://adamsite-c8e88a6bb1a1.herokuapp.com/api/writers/all/");
      setWriters(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  const handleAddWriter = async () => {
    try {
      // Send a POST request to add a new writer
      const response = await axios.post("https://adamsite-c8e88a6bb1a1.herokuapp.com/api/writers/", newWriter);
      setWriters([...writers, response.data]);
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error adding writer:", error);
    }
  };

  const handleUpdateWriter = async () => {
    try {
      if (editingWriter) {
        // Send a PATCH request to update an existing writer
        await axios.patch(`https://adamsite-c8e88a6bb1a1.herokuapp.com/api/writers/update/${editingWriter.id}`, newWriter);
        const updatedWriters = writers.map((writer) =>
          writer.id === editingWriter.id ? { ...newWriter } : writer
        );
        setWriters(updatedWriters);
        setIsModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error updating writer:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to delete a writer by ID
      await axios.delete(`https://adamsite-c8e88a6bb1a1.herokuapp.com/api/writers/delete/${id}`);
      const updatedWriters = writers.filter((writer) => writer.id !== id);
      setWriters(updatedWriters);
      setDeletingWriter(null); // Reset deletingWriter
    } catch (error) {
      console.error("Error deleting writer:", error);
    }
  };

  const resetForm = () => {
    setNewWriter({
      name: "",
      specialization: "",
      date: "",
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
      <h1 className="text-3xl font-semibold mb-4">Writers</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
        onClick={() => {
          setIsModalOpen(true);
          setEditingWriter(null);
          setDeletingWriter(null); // Reset deletingWriter when adding
        }}
      >
        Add Writer
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {writers.map((writer) => (
          <div
            key={writer.id}
            className="bg-white border border-gray-300 p-4 rounded-md shadow-md"
          >
            <h2 className="text-xl font-semibold">{writer.name}</h2>
            <p className="text-gray-600">{writer.specialization}</p>
            <p className="text-gray-600">Email: {writer.email}</p>
            <p className="text-gray-600">Phone Number: {writer.phone_number}</p>
            <p className="text-gray-600">Date Added: {writer.date}</p>
            <div className="mt-2 flex justify-end space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleEditWriter(writer)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => setDeletingWriter(writer)}
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
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
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
