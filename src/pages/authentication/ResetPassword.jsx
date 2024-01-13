/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// import { Button } from "@mui/material";
import { useState, useEffect } from "react";
// import PrimaryButton from "../../components/buttons/PrimaryButton";
import {useParams, useSearchParams} from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
// import FormInput from "./FormInput";
// import { axiosPublic } from "../../lib/axios/axios";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";


const ResetPassword = () => {
const [email, setEmail] = useState("");
const [errors, setErrors] = useState([]);
// const [loading, setLoading] = useState(false);
const [status, setStatus] = useState(null);
const [password, setPassword] = useState("");
const [password_confirmation, setPasswordConfirmation] = useState("");
const [searchParams, setSearchParams] = useSearchParams();
const {token} = useParams();

const {auth, setAuth} = useAuth();
// const {csrf} = AuthContext();
// const csrf = useAuth();

useEffect(() => {
    setEmail(searchParams.get("email")); 
    // console.log(searchParams.get("email"));
}, [searchParams]);

const handleSubmit = async (e) => {
  e.preventDefault();

  setErrors([]);
  setStatus(null); 


  try {
    
    const response = await axios.post(
      "https://unit-solutions.vercel.app/api/password_reset/confirm/",
      {
         email,
         password, password_confirmation, token }    
    );

    if (response.status === 200) {
      
      setStatus("success");
      toast.success("Password reset succesfully.");
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
    <div className="signin  md:p-24 flex items-center justify-center h-full">
      <ToastContainer />
      
     
      <form className="flex flex-col gap-3 items-center justify-center bg-white bg-opacity-97 px-6 md:px-16 py-8 rounded-2xl" onSubmit={handleSubmit}>
        
      
      <Link to='/'><div className="flex justify-center w-full items-end gap-2">
            {/* <img src="img/logo.png" alt="Equity Bank Logo" className="w-10" /> */}
            <h1 className="text-maroon text-sm font-semibold text-end">
                Unity Solutions
                </h1>
          </div></Link>
             <div className="flex flex-col items-center justify-center gap-2 mb-4">
        <h1 className="text-maroon text-center mb-2 text-2xl font-bold">
           Password Reset
        </h1>
            </div>
      
    
          <div className="flex items-center justify-center gap-2 flex-col">
            <input
            type="password"
            name="password"
            placeholder="New Password"
            className="bg-slate-100 outline-slate-400 rounded-md input min-w-full w-72 xl:w-96 p-3 text-sm"
            // className="border border-red-950 rounded-lg px-4 py-2 md-w-full w-full focus:outline-none focus:ring-2 focus:ring-maroon focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            
            <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            // className="border border-red-950 rounded-lg px-4 py-2 md-w-full w-full focus:outline-none focus:ring-2 focus:ring-maroon focus:border-transparent"
            className="bg-slate-100 outline-slate-400 rounded-md input min-w-full w-72 xl:w-96 p-3 text-sm"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
        </div>
           
        <div className="flex flex-col-reverse gap-3 justify-between items-center w-full">
        <button className="py-2 px-2 w-full md-w-full  border bg-[#364258] rounded-lg text-white font-bold hover:bg-white hover:text-[#364258] hover:border-[#364258]">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;