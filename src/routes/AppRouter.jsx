/* eslint-disable no-unused-vars */
// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "../pages/dashboard/Dashboard";

import PostOrders from "../pages/postorders/PostOrders";
import ListOrders from "../pages/listorders/ListOrders";
import WritersProfiles from "../pages/writersprofiles/WritersProfiles";
import AddWriter from "../pages/addwriter/AddWriter";
import Order from "../pages/order/Order";
import Settings from "../pages/settings/Settings";
import Login from '../Login';
import Landing from '../pages/landing/Landing';


function AppRouter() {
  return (
    <Router>
      <Routes>       
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Landing />}/>  
       <Route path="/dashboard" element={<Dashboard/>} />
       <Route path="/post-orders" element={<PostOrders/>} />
       <Route path="/list-orders" element={<ListOrders/>} />
       <Route path="/writers-profiles" element={<WritersProfiles/>} />
       <Route path="/add-writer" element={<AddWriter/>} />
       <Route path="/order" element={<Order/>} />
       <Route path="/settings" element={<Settings/>} />
       </Routes>        
    
    </Router>
  );
}

export default AppRouter;
