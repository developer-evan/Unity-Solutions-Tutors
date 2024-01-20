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
// import Login from '../pages/authentication/Login';
import Login from '../pages/authentication/Login';
import Landing from '../pages/landing/Landing';
import Profile from '../pages/profile/Profile';
import Projects from '../pages/projects/Projects';
import ViewFile from '../pages/projects/ViewFile';
import Tasks from '../pages/tasks/Tasks';
import Writers from '../pages/writers/Writers';
import Analytics from '../pages/analytics/Analytics';
import RequireAuth from '../pages/authentication/persistent/RequireAuth';
import PersistLogin from '../pages/authentication/persistent/PersistLogin';
import ForgotPassword from '../pages/authentication/ForgotPassword';
import ChangePassword from '../pages/authentication/ChangePassword';
import SignUp from '../pages/authentication/SignUp';
import ResetPassword from '../pages/authentication/ResetPassword';
import Clients from '../pages/writers/Clients';
import Users from '../pages/users/Users';
// import RequireAuth from '../pages/authentication/persistent/RequireAuth';


function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Landing />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />


        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[100]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/post-orders" element={<PostOrders />} />
            <Route path="/list-orders" element={<ListOrders />} />
            <Route path="/writers-profiles" element={<WritersProfiles />} />
            <Route path="/add-writer" element={<AddWriter />} />
            <Route path="/order" element={<Order />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/view-file" element={<ViewFile />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/writers" element={<Writers />} />
            <Route path="/analytics" element={<Analytics />} />
           <Route path="/all-users" element={<Users />} />
           <Route path="/clients" element={<Clients />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
