/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { TailSpin } from "react-loader-spinner";
import { FaPen } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

function Profile() {
  const { auth } = useAuth();
  const id = auth.user_id;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://unit-solutions.vercel.app/api/user/get-user/${id}/`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error(error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-2xl w-full p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Profile</h1>
        {loading && (
          <div className="text-gray-600 italic text-center">
            <TailSpin
              visible={true}
              height="40"
              width="40"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "30vh",
              }}
            />
          </div>
        )}
        {error && <div className="text-red-500 text-center">{error.message}</div>}
        {userData && (
          <div>
       {/* PROFILE PAGE */}
            <div className="mb-6">
                 {/* PERSONAL INFORMATION */}
              <section>

                <div className="flex gap-6">
                              {/* USER IMAGE */}
                  <img
                    src={userData.profile_image || 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'}
                    alt="profile"
                    className="w-64 h-64 rounded-lg"
                  />
                  <div>
                  <div className="flex flex-col gap-24">
                  <div className="flex gap-4">
                  
                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold">{userData.first_name || 'loading...'} {userData.last_name || 'loading...'}</h2>
                    <p className="text-lg capitalize">Title(product manager)</p>
                  </div>
                  {/* COUNTRY */}
                  <div >
                  <div className='flex items-center  gap-2'>
                  <IoLocationOutline size={20} style={{color: 'darkblue'}}/>
                  <p className="text-md font-semibold capitalize text-blue-500">{userData.country || 'loading...'}</p>
                </div>
                
                  </div>
                  </div>
                  <div className="h-15 w-full">
                  <button className="text-blue-500 px-4 py-2 rounded-md">
                  <FaPen className="mr-2" />
                  Edit Profile
                </button>
                  </div>
                 
                </div>
                </div>
                </div>
               
              </section>
              {/* SOCIAL MEDIA */}
              <section className="grid grid-cols-2 gap-6 my-4">
              <div>
              <h1 className="font-bold text-lg underline underline-offset-4 my-4 capitalize">SOCIALS</h1>
              <div className="flex flex-col gap-4">
              <div>
                  <h3 className="text-md font-semibold mb-1">LinkedIn :</h3>
                  <p className="text-blue-500">{userData.linkedin || 'LinkedIn Profile'}</p>
                </div>
                <div>
                  <h3 className="text-md font-semibold mb-1">Twitter :</h3>
                  <p className="text-blue-500">{userData.twitter || 'Twitter Profile'}</p>
                </div>
                <div>
                  <h3 className="text-md font-semibold mb-1">GitHub :</h3>
                  <p className="text-blue-500">{userData.github || 'GitHub Profile'}</p>
                </div>
              </div>
              </div> 
         {/* CONTACT INFORMATION */}
         <div >
         <h1 className="font-bold text-lg underline underline-offset-4 my-4 capitalize">CONTACT INFORMATION</h1>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <h3 className="text-md font-semibold">Phone:</h3>
                  <p className="font-semibold text-blue-500">{userData.phone || 'loading...'}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <h3 className="text-md font-semibold">Address:</h3>
                  <p className="font-semibold text-blue-500">{userData.address || 'loading...'}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                <h3 className="text-md font-semibold">Email:</h3>
                <p className="font-semibold text-blue-500">{userData.email || 'loading...'}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <h3 className="text-md font-semibold">Date Joined:</h3>
                  <p className="font-semibold text-blue-500">{userData.date_joined || 'loading...'}</p>
                </div>
       {/* Add more contact info fields as needed */}   
                {/* Add more personal info fields as needed */}
              </div>
            </section>

            </div>
     {/* SKILLS */}
     <div className="mb-6">
     <h1 className="font-bold text-lg underline underline-offset-4 my-4 capitalize">SKILLS</h1>
              <ul className="list-disc list-inside">
                <li className="text-gray-600">{userData.skill1 || 'Skill 1'}</li>
                <li className="text-gray-600">{userData.skill2 || 'Skill 2'}</li>
                <li className="text-gray-600">{userData.skill3 || 'Skill 3'}</li>
                {/* Add more skills as needed */}
              </ul>
            </div>
        
         

    
          </div>
        )}
      </div>
    </div>
  );
}

export default MainLayout(Profile);
