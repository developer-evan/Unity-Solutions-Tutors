/* eslint-disable no-undef */
// import React from 'react';
import Admin from './dash/Admin';
import User from './dash/User';
// import { useAuth } from '../context/auth';
// import { useAuth} from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';

function Sidebar() {
  const { auth } = useAuth();
  // auth roles: 100 - user, 200 - hub admin, 300 - chapter admin, 400 - staff_admin and 500 - super admin
  const isAdmin = auth.roles.includes(200) || auth.roles.includes(300)

return (
  <>
  { isAdmin ? (
    <Admin />
  ) : (
    <User />
  )}
  </>
 )
}

export default Sidebar;
