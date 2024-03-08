/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from '../../layout/MainLayout';

function Analytics() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5); // Change this to set tasks per page

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://unitysolutionstutors.vercel.app/api/submit-task/');
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  // Get current tasks
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching tasks: {error.message}</div>;
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tasks.length / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Submitted Tasks</h1>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Writer Email</th>
              <th className="px-4 py-2">Date Submitted</th>
              <th className="px-4 py-2">Project Link</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task, index) => (
              <tr key={task.id} className={index === 0 ? 'bg-white' : index % 2 === 1 ? 'bg-slate-300' : 'bg-white'}>
                <td className="px-4 py-2">{task.title}</td>
                <td className="px-4 py-2">{task.writer_email}</td>
                <td className="px-4 py-2">{task.date_submitted}</td>
                <td className="px-4 py-2">
                  <a href={task.project_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View Project
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 mr-2 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainLayout(Analytics);
