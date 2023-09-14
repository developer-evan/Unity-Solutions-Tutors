import { useState } from "react";
import MainLayout from "../../layout/MainLayout";

function Writers() {
  const [writers, setWriters] = useState([
    {
      id: 1,
      name: "John Doe",
      specialization: "Technology",
      dateAdded: "2023-01-15",
      email: "johndoe@example.com",
      phoneNumber: "123-456-7890",
    },
    {
      id: 2,
      name: "Jane Smith",
      specialization: "Health",
      dateAdded: "2023-02-20",
      email: "janesmith@example.com",
      phoneNumber: "987-654-3210",
    },
    // Add more writers as needed
  ]);

  const [newWriter, setNewWriter] = useState({
    name: "",
    specialization: "",
    dateAdded: "",
    email: "",
    phoneNumber: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWriter, setEditingWriter] = useState(null);

  const handleAddWriter = () => {
    if (
      newWriter.name.trim() === "" ||
      newWriter.specialization.trim() === "" ||
      newWriter.dateAdded.trim() === "" ||
      newWriter.email.trim() === "" ||
      newWriter.phoneNumber.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingWriter === null) {
      setWriters([...writers, { ...newWriter, id: writers.length + 1 }]);
    } else {
      // Editing an existing writer
      const updatedWriters = writers.map((writer) =>
        writer.id === editingWriter.id
          ? { ...newWriter, id: writer.id }
          : writer
      );
      setWriters(updatedWriters);
      setEditingWriter(null);
    }

    setNewWriter({
      name: "",
      specialization: "",
      dateAdded: "",
      email: "",
      phoneNumber: "",
    });
    setIsModalOpen(false);
  };

  const handleEditWriter = (writer) => {
    setEditingWriter(writer);
    setNewWriter({ ...writer });
    setIsModalOpen(true);
  };

  const handleDeleteWriter = (id) => {
    const updatedWriters = writers.filter((writer) => writer.id !== id);
    setWriters(updatedWriters);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-semibold mb-4">Writers</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
        onClick={() => {
          setIsModalOpen(true);
          setEditingWriter(null); // Clear editing mode
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
            <p className="text-gray-600">Phone Number: {writer.phoneNumber}</p>
            <p className="text-gray-600">Date Added: {writer.dateAdded}</p>
            <div className="mt-2 flex justify-end space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleEditWriter(writer)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteWriter(writer.id)}
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
              onChange={(e) =>
                setNewWriter({ ...newWriter, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Specialization"
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              value={newWriter.specialization}
              onChange={(e) =>
                setNewWriter({
                  ...newWriter,
                  specialization: e.target.value,
                })
              }
            />
            <input
              type="date"
              placeholder="Date Added"
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              value={newWriter.dateAdded}
              onChange={(e) =>
                setNewWriter({
                  ...newWriter,
                  dateAdded: e.target.value,
                })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              value={newWriter.email}
              onChange={(e) =>
                setNewWriter({
                  ...newWriter,
                  email: e.target.value,
                })
              }
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="border border-gray-300 rounded-md p-2 mb-4 w-full"
              value={newWriter.phoneNumber}
              onChange={(e) =>
                setNewWriter({
                  ...newWriter,
                  phoneNumber: e.target.value,
                })
              }
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
                onClick={handleAddWriter}
              >
                {editingWriter ? "Update" : "Add"}
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                onClick={() => {
                  setNewWriter({
                    name: "",
                    specialization: "",
                    dateAdded: "",
                    email: "",
                    phoneNumber: "",
                  });
                  setIsModalOpen(false);
                }}
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
