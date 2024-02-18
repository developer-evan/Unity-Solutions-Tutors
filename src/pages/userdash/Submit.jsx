/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from '../../layout/MainLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/useAuth';

function Submit() {
  const [title, setTitle] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deadline, setDeadline] = useState(new Date().toISOString().split('T')[0]);
  const [file, setFile] = useState(null);
  const [writerEmail, setWriterEmail] = useState('');

  const { auth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://unit-solutions.vercel.app/api/user/get-user/${auth.user_id}/`);
        setUserData(response.data);
        setWriterEmail(response.data.email); 
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error(error);
      }
    };
    fetchData();
  }, [auth.user_id]);

  const handleSubmission = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('writer_email', writerEmail); 
      formData.append('deadline', deadline);
      formData.append('file', file);

      const response = await axios.post('https://unit-solutions.vercel.app/api/tasks/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast.success('Task submitted successfully', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
      } else {
        toast.error('Failed to submit the task', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error submitting task:', error);
      toast.error('Error submitting task', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Submit Task</h1>
      <form className="space-y-3 mx-48">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-gray-800">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 outline-none rounded px-3 py-2" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="writer" className="text-gray-800">Writer Email:</label>
          <input type="email" id="writer" value={writerEmail} className="border border-gray-300 rounded outline-none px-3 py-2" readOnly />
        </div>
        <div className="flex flex-col">
          <label htmlFor="deadline" className="text-gray-800">Date Submitted:</label>
          <input type="date" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="border outline-none border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="file" className="text-gray-800">Project File:</label>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} className="border border-gray-300 outline-none rounded px-3 py-2" />
        </div>
        <button type="button" onClick={handleSubmission} className="bg-blue-500 w-full text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
}

export default MainLayout(Submit);
