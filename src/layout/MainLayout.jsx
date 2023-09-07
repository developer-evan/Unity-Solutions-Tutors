// eslint-disable-next-line no-unused-vars
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Feed from "../pages/feed/Feed";
// import MainLayout from "./MainLayout";

// const MainLayout = ({ children }) => {
const MainLayout = () =>{
  return (
    
    <BrowserRouter>
      <div className="flex bg-slate-200">
        <Sidebar />
        <div className="flex flex-col flex-grow ">
        <Navbar />
        <main className="p-2 bg-white rounded-lg  h-full justify-center m-2">
          <Routes>
            {/* <Route path="/dash" element={<MainLayout/>}></Route> */}
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/feed" element={<Feed/>} />
            </Routes>         
          {/* <MainLayout /> */}
          </main>
        </div>
      </div>
      </BrowserRouter>
  
  );
};

export default MainLayout;