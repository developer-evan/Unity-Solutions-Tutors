/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaPen, FaTrash } from 'react-icons/fa';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    deadline: '',
    // writer_assigned: '',
    client: '',
    status: '',
    // description: '',
    fileUrl: '',
  });
  const [editingProject, setEditingProject] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  // const [writers, setWriters] = useState([]);
  const [clients, setClients] = useState([]);
  const [editingWriters, setEditingWriters] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);




  // Define a function to fetch data from the endpoint
  const fetchData = async () => {
    try {
      const response = await axios.get('https://unit-solutions.vercel.app/api/projects/');
      setProjects(response.data); // Assuming the response contains an array of projects

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // The empty dependency array ensures this effect runs once after the initial render

  const openAddProjectModal = () => {
    setIsAddingProject(true);
  };

  const closeAddProjectModal = () => {
    setIsAddingProject(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setNewProject({ ...newProject, fileUrl });
    }
  };

  const handleAddProject = async () => {
    if (
      !newProject.title ||
      !newProject.deadline ||
      // !newProject.writer_assigned ||
      !newProject.client ||
      !newProject.status ||
      !newProject.fileUrl
      // !newProject.description

    ) {
      // alert('Please fill in all fields.');
      toast.error('Please fill in all fields.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });


      return;
    }

    try {
      const response = await axios.post('https://unit-solutions.vercel.app/api/projects/', newProject);
      setProjects([...projects, response.data]);
      setNewProject({
        title: '',
        deadline: '',
        // writer_assigned: '',
        client: '',
        status: '',
        // description: '',
        fileUrl: '',
      });
      toast.success('Project added successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }
      );
      closeAddProjectModal();
    } catch (error) {
      console.error('Error adding project:', error);
      toast.error('Error adding project!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

    }
  };

  const handleEditProject = async () => {
    if (!editingProject) return;

    // if (
    //   !editingProject.title ||
    //   !editingProject.deadline ||
    //   // !editingProject.writer_assigned ||
    //   !editingProject.client ||
    //   !editingProject.status ||
    //   !editingProject.fileUrl
      
    //   // !editingProject.description
    // ) {
    //   // alert('Please fill in all fields.');
    //   toast.error('Please fill in all fields.', {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //   }
    //   );
    //   return;
    // }

    try {
      const response = await axios.put(`https://unit-solutions.vercel.app/api/projects/${editingProject.id}/`, editingProject);
      const updatedProjects = projects.map((project) =>
        project.id === editingProject.id ? response.data : project
      );

      setProjects(updatedProjects);
      setEditingProject(null);
      toast.success('Project edited successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }
      );
    } catch (error) {
      console.error('Error editing project:', error);
      toast.error('Error editing project!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }
      );
    }
  };
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://unit-solutions.vercel.app/api/clients/');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching writers:', error);
      }
    };

    fetchClients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleDeleteProject = (id, title) => {
    setProjectToDelete({ id, title });
    setShowDeleteModal(true);
  };

  // const handleDeleteProject = async (id) => {
  //   // const shouldDelete = window.confirm('Are you sure you want to delete this project?');

  //   // if (shouldDelete) {
  //   //   // Perform deletion logic
  //   //   console.log(`Deleting project with ID: ${id}`);
  //   // }
  //   try {
  //     await axios.delete(`https://unit-solutions.vercel.app/api/projects/${id}`);
  //     const updatedProjects = projects.filter((project) => project.id !== id);
  //     setProjects(updatedProjects);
  //     toast.success('Project deleted successfully!', {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //     }
  //     );
  //   } catch (error) {
  //     console.error('Error deleting project:', error);
  //     toast.error('Error deleting project!', {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //     }
  //     );
  //   }
  // };
  const confirmDelete = async (id) => {
    try {
      await axios.delete(`https://unit-solutions.vercel.app/api/projects/${id}`);
      const updatedProjects = projects.filter((project) => project.id !== id);
      setProjects(updatedProjects);
      toast.success('Project deleted successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Error deleting project!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } finally {
      setShowDeleteModal(false);
      setProjectToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  // useEffect(() => {
  //   const fetchEditingWriters = async () => {
  //     try {
  //       const response = await axios.get('https://unit-solutions.vercel.app/api/writers/all/');
  //       setEditingWriters(response.data);
  //     } catch (error) {
  //       console.error('Error fetching editing writers:', error);
  //     }
  //   };

  //   fetchEditingWriters();
  // }, []);


  // const statusOptions = ['In Progress', 'Completed', 'On Hold', 'Cancelled'];
  const statusOptions = [
    'New',
    'Completed',
    'Rejected',
    'Cancelled',
    'Revision',
    'Resubmission',
    'Pending',
  ];



  return (
    <div className="container mx-auto p-4">
      <ToastContainer />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">All Projects</h1>
        <button
          onClick={openAddProjectModal}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <FaPlus className="inline-block mr-2" />
          Add Project
        </button>
      </div>

      <table className="min-w-full border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>

            <th className="border p-2">Client</th>
            {/* <th className="border p-2">Status</th> */}
            {/* <th className="border p-2">Description</th> */}
            <th className="border p-2 items-center justify-center">Project File</th>
            <th className="border p-2">Deadline</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="border p-2">{project.title}</td>

              <td className="border p-2">{project.client}</td>

              {/* <td className="border p-2">{project.description}</td> */}
              <td className="border p-2">

                <Link
                  to={`/view-file/${project.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Project File
                </Link>
              </td>
              <td className="border p-2">{project.deadline}</td>
              <td className="border p-2">{project.status}</td>
              <td className="p-3 border   gap-4 flex flex-row">
                <p
                  onClick={() => setEditingProject(project)}
                  className="  rounded-lg text-blue-600 text-xs cursor-pointer  "
                >
                  <FaPen className="inline-block " />
                </p>
                <p
                  onClick={() => handleDeleteProject(project.id, project.title)}
                  className="rounded-lg text-red-600 text-xs cursor-pointer "
                >
                  <FaTrash className="inline-block " />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddingProject && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal bg-white p-4 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add Project</h2>
            <form className="flex flex-wrap gap-2">
              <div className="w-full  mb-4 ">
                <label className="block text-gray-700 font-bold mb-2"> Project Title:</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>

              {/* <div className="w-full md:w-full mb-4">
                <label className="block text-gray-700 font-bold mb-2">Client:</label>
                <input
                  type="text"
                  value={newProject.client}
                  onChange={(e) =>
                    setNewProject({ ...newProject, client: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
              </div> */}
              <div className="w-full md:w-full mb-4">
                <label className="block text-gray-800">Client</label>
                <select
                  name="writer"
                  value={newProject.client}
                  // onChange={handleInputChange}
                  onChange={(e) =>
                    setNewProject({ ...newProject, client: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.company_name}>
                      {/* {writer.first_name} {writer.last_name} */}
                      {client.company_name}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div className="w-full mb-4">
                <label className="block text-gray-700 font-bold mb-2">Writer Assigned:</label>
                <select
                  value={newProject.writer_assigned}
                  onChange={(e) =>
                    setNewProject({ ...newProject, writer_assigned: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                >
                  <option value="">Select Writer</option>
                  {writers.map((writer) => (
                    <option key={writer.id} value={writer.name}>
                      {writer.name}
                    </option>
                  ))}
                </select>
              </div> */}

              <div className="w-full md:w-full mb-4">
                <label className="block text-gray-700 font-bold mb-2">Status:</label>
                <select
                  value={newProject.status}
                  onChange={(e) =>
                    setNewProject({ ...newProject, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div className="w-full mb-4">
                <label className="block text-gray-700 font-bold mb-2">Description:</label>
                <textarea
                  type="text"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
              </div> */}
              <div className="w-full mb-4">
                <label className="block text-gray-700 font-bold mb-2">Attachment:</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  value={newProject.attachment}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  required
                />
              </div>
              <div className="w-full md:w-full mb-4">
                <label className="block text-gray-700 font-bold mb-2">Deadline:</label>
                <input
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) =>
                    setNewProject({ ...newProject, deadline: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div className="w-full">
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Add Project
                </button>
                <button
                  type="button"
                  onClick={closeAddProjectModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingProject && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal bg-white p-4 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Title:</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Deadline:</label>
                <input
                  type="date"
                  value={editingProject.deadline}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, deadline: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Client:</label>
                <input
                  type="text"
                  value={editingProject.client}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, client: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
              </div> */}
              <div className="w-full md:w-full mb-4">
                <label className="block text-gray-800">Client</label>
                <select
                  name="writer"
                  value={editingProject.client}
                  // onChange={handleInputChange}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, client: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.company_name}>
                      {/* {writer.first_name} {writer.last_name} */}
                      {client.company_name}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Writer Assigned:</label>
                <select
                  value={editingProject.writer_assigned}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, writer_assigned: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                >
                  <option value="">Select Writer</option>
                  {editingWriters.map((writer) => (
                    <option key={writer.id} value={writer.name}>
                      {writer.name}
                    </option>
                  ))}
                </select>
              </div> */}

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Status:</label>
                <select
                  value={editingProject.status}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full mb-4">
                <label className="block text-gray-700 font-bold mb-2">Attachment:</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Description:</label>
                <textarea
                  type="text"
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
              </div> */}
              <button
                type="button"
                onClick={handleEditProject}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal bg-white p-4 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete
              <span className="font-bold text-sky-600"> {projectToDelete.title} </span>
              project?</p>
            <div className="flex mt-4">
              <button
                // onClick={confirmDelete}
                onClick={() => confirmDelete(projectToDelete.id)}

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

export default MainLayout(Projects);
