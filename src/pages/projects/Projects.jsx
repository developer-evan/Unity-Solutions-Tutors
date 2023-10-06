/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    deadline: '',
    writer: '',
    status: '',
    description: '',
    fileUrl: '',
  });
  const [editingProject, setEditingProject] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

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

  const handleAddProject = () => {
    if (
      !newProject.title ||
      !newProject.deadline ||
      !newProject.writer ||
      !newProject.status ||
      !newProject.description
    ) {
      alert('Please fill in all fields.');
      return;
    }

    setProjects([...projects, { ...newProject, id: Date.now() }]);
    setNewProject({
      title: '',
      deadline: '',
      writer: '',
      status: '',
      description: '',
      fileUrl: '',
    });
    closeAddProjectModal();
  };

  const handleEditProject = () => {
    if (!editingProject) return;

    if (
      !editingProject.title ||
      !editingProject.deadline ||
      !editingProject.writer ||
      !editingProject.status ||
      !editingProject.description
    ) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedProjects = projects.map((project) =>
      project.id === editingProject.id ? editingProject : project
    );

    setProjects(updatedProjects);
    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  };

  const statusOptions = ['In Progress', 'Completed', 'On Hold', 'Cancelled'];

  return (
    <div className="container mx-auto p-4">
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
            <th className="border p-2">Description</th>
            <th className="border p-2 items-center justify-center">Project File</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="border p-2">{project.title}</td>
              <td className="border p-2">{project.deadline}</td>
              <td className="border p-2">{project.writer}</td>
              <td className="border p-2">{project.status}</td>
              <td className="border p-2">{project.description}</td>
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
            <form className="flex flex-wrap">
              <div className="w-full md:w-1/2 mb-4">
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
              <div className="w-full md:w-1/2 mb-4">
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
              <div className="w-full md:w-1/2 mb-4">
                <label className="block text-gray-700 font-bold mb-2">Writer Assigned:</label>
                <input
                  type="text"
                  value={newProject.writer}
                  onChange={(e) =>
                    setNewProject({ ...newProject, writer: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div className="w-full md:w-1/2 mb-4">
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
              <div className="w-full mb-4">
                <label className="block text-gray-700 font-bold mb-2">Description:</label>
                <textarea
                  type="text"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div className="w-full mb-4">
                <label className="block text-gray-700 font-bold mb-2">Attachment:</label>
                <input
                  type="file"
                  onChange={handleFileChange}
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
                  value={editingProject.writer}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, writer: e.target.value })
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
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Description:</label>
                <textarea
                  type="text"
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
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