/* eslint-disable react-refresh/only-export-components */
// import MainLayout from "../../layouts/MainLayout";
import useAuth from '../../hooks/useAuth'
import MainLayout from '../../layout/MainLayout'
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'




const Dashboard = () => {
    const { auth } = useAuth()
    // auth roles: 100 - user, 200 - hub admin, 300 - chapter admin, 400 - staff_admin and 500 - super admin
    const isAdmin = auth.roles.includes(200) || auth.roles.includes(300)

  return (
    <>
    { isAdmin ? (
      <AdminDashboard />
    ) : (
      <UserDashboard />
    )}
    </>
  )
}

export default MainLayout(Dashboard);