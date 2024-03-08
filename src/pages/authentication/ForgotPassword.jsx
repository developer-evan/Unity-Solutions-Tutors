/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// import { Button } from "@mui/material";
import { useState } from "react";
// import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
// import FormInput from "./FormInput";
// import { axiosPublic } from "../../lib/axios/axios";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
// import jwt_decode from "jwt-decode";
// import useAuthContext from "..context/useAuthContext";
// import { useAuthContext } from "../../context/AuthProvider";
// import AuthContext from "../../context/AuthProvider";
// import useAuthContext from "../../hooks/useAuth";

const ForgotPassword = () => {
const [email, setEmail] = useState("");
const [errors, setErrors] = useState([]);
// const [loading, setLoading] = useState(false);
const [status, setStatus] = useState(null);
const {auth, setAuth} = useAuth();
// const {csrf} = AuthContext();
// const csrf = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();
  // await csrf();
  // const csrfToken = csrf();
  // console.log(csrfToken);  
  setErrors([]);
  setStatus(null); 
  try {
    // const csrfToken = csrf(); 
    const response = await axios.post(
      "https://unitysolutionstutors.vercel.app/api/reset-password/",
      // "https://unitysolutionstutors.vercel.app/api/password_reset/",
      { email },
      // {
      //   headers: {
      //     "X-CSRFToken": csrfToken,
      //   },
      // }
    );

    if (response.status === 200) {
      
      setStatus("success");
      toast.success("Password reset email sent.");
    } else {
     
      setStatus("error");
      toast.error("Password reset request failed.");
    }
  } catch (error) {
    
    setStatus("error");
    if (error.response && error.response.data && error.response.data.errors) {
      setErrors(error.response.data.errors);
    } else {
      toast.error("An error occurred.");
    }
  }
};


  return (
    <div className="md:p-24 flex items-center justify-center min-h-screen bg-sky-600">
      <ToastContainer />
     
     
      <form className="flex flex-col gap-3 items-center justify-center bg-white bg-opacity-97 px-6 md:px-16 py-8 rounded-2xl" onSubmit={handleSubmit}>
        
      
      <Link to='/login'><div className="flex justify-center w-full items-end gap-2">
            {/* <img src="img/logo.png" alt="Equity Bank Logo" className="w-10" /> */}

            {/* <h1 className="text-[#364258] text-sm font-semibold text-end">Unity Solutions</h1> */}
            <img src='./dark.png' alt='logo' className='h-16 ' />
          </div></Link>
             <div className="flex flex-col items-center justify-center gap-2 mb-4">
        <h1 className="text-maroon text-center mb-2 text-2xl font-bold">
          Forgot Password Reset
        </h1>
       
      </div>
      
          <div className="flex items-center justify-center gap-2 flex-col">

            <input
            type="email"
            name="email"
            placeholder="Enter your email address "
            // className="border rounded-lg px-4 py-2  w-full focus:outline-none focus:ring-2 focus:ring-maroon focus:border-transparent"
            className="bg-slate-100 outline-slate-400 rounded-md input min-w-full w-72 xl:w-96 p-3 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />             
          {/* {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))} */}
        </div>
       
        <div className="flex  gap-3 justify-between items-center w-full">
        <button className="py-2 px-2 w-full md-w-full  border bg-[#364258] rounded-lg text-white font-bold hover:bg-white hover:text-[#364258] hover:border-[#364258]">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;