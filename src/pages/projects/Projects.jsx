/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    deadline: '',
    writer_assigned: '',
    status: '',
    description: '',
    fileUrl: '',
  });
  const [editingProject, setEditingProject] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Define a function to fetch data from the endpoint
  const fetchData = async () => {
    try {
      const response = await axios.get('https://adamsite-tawny.vercel.app/api/projects/');
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
      !newProject.writer_assigned ||
      !newProject.status 
      // !newProject.description
      
    ) {
      // alert('Please fill in all fields.');
      toast.error('Please fill in all fields.',{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
     

      return;
    }

    try {
      const response = await axios.post('https://adamsite-tawny.vercel.app/api/projects/', newProject);
      setProjects([...projects, response.data]);
      setNewProject({
        title: '',
        deadline: '',
        writer_assigned: '',
        status: '',
        // description: '',
        fileUrl: '',
      });
      toast.success('Project added successfully!',{
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
      toast.error('Error adding project!',{
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

    if (
      !editingProject.title ||
      !editingProject.deadline ||
      !editingProject.writer_assigned ||
      !editingProject.status 
      // !editingProject.description
    ) {
      // alert('Please fill in all fields.');
      toast.error('Please fill in all fields.',{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }
      );
      
      return;
    }

    try {
      const response = await axios.put(`https://adamsite-tawny.vercel.app/api/projects/${editingProject.id}`, editingProject);
      const updatedProjects = projects.map((project) =>
        project.id === editingProject.id ? response.data : project
      );

      setProjects(updatedProjects);
      setEditingProject(null);
      toast.success('Project edited successfully!',{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }
      );
    } catch (error) {
      console.error('Error editing project:', error);
      toast.error('Error editing project!',{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }
      );
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`https://adamsite-tawny.vercel.app/api/projects/${id}`);
      const updatedProjects = projects.filter((project) => project.id !== id);
      setProjects(updatedProjects);
      toast.success('Project deleted successfully!',{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }
      );
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Error deleting project!',{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }
      );
    }
  };

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
      <ToastContainer/>
      <h1 className="text-2xl font-bold mb-4">All Projects</h1>
      <button
        onClick={openAddProjectModal}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Add Project
      </button>

      <table className="min-w-full border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Deadline</th>
            <th className="border p-2">Writer Assigned</th>
            <th className="border p-2">Status</th>
            {/* <th className="border p-2">Description</th> */}
            <th className="border p-2 items-center justify-center">Project File</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="border p-2">{project.title}</td>
              <td className="border p-2">{project.deadline}</td>
              <td className="border p-2">{project.writer_assigned}</td>
              <td className="border p-2">{project.status}</td>
              {/* <td className="border p-2">{project.description}</td> */}
              <td className="border p-2">
                <Link
                  to={`/view-file/${project.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View File
                </Link>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => setEditingProject(project)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mx-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded mx-1"
                >
                  Delete
                </button>
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
                <label className="block text-gray-700 font-bold mb-2">Title:</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
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
              <div className="w-full md:w-full mb-4">
                <label className="block text-gray-700 font-bold mb-2">Writer Assigned:</label>
                <input
                  type="text"
                  value={newProject.writer_assigned}
                  onChange={(e) =>
                    setNewProject({ ...newProject, writer_assigned: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
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
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Writer Assigned:</label>
                <input
                  type="text"
                  value={editingProject.writer_assigned}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, writer_assigned: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
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
    </div>
  );
}

export default MainLayout(Projects);
