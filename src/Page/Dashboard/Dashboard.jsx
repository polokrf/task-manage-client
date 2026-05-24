import React from 'react';
import AdminDashboard from '../../Components/DasboardCom/AdminDashboard/AdminDashboard';
import EmpolyDashboard from '../../Components/DasboardCom/EmpolyDashboard/EmpolyDashboard';
import { useAuth } from '../../Hooks/useAuth';
import Loader from '../../Components/Loder.jsx/Loader';

const Dashboard = () => {
  const { user, loading, token } = useAuth();
   if (loading || (token && !user)) {
     return <Loader/>;
   }
  return (
    <div>
      {user?.role === 'admin' && <AdminDashboard />}

      {user?.role === 'employ' && <EmpolyDashboard />}
    </div>
  );
};

export default Dashboard;