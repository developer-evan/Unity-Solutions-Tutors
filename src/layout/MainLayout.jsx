// eslint-disable-next-line no-unused-vars
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
// import Feed from "../pages/feed/Feed";
import PostOrders from "../pages/postorders/PostOrders";
import ListOrders from "../pages/listorders/ListOrders";
import WritersProfiles from "../pages/writersprofiles/WritersProfiles";
import AddWriter from "../pages/addwriter/AddWriter";
import Order from "../pages/order/Order";
import Settings from "../pages/settings/Settings";
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
            <Route path="/post-orders" element={<PostOrders/>} />
            <Route path="/list-orders" element={<ListOrders/>} />
            <Route path="/writers-profiles" element={<WritersProfiles/>} />
            <Route path="/add-writer" element={<AddWriter/>} />
            <Route path="/order" element={<Order/>} />
            <Route path="/settings" element={<Settings/>} />
            </Routes>         
          {/* <MainLayout /> */}
          </main>
        </div>
      </div>
      </BrowserRouter>
  
  );
};

export default MainLayout;