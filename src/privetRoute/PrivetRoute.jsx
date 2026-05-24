import React from 'react';
import { useAuth } from '../Hooks/useAuth';
import { Navigate } from 'react-router';
import Loader from '../Components/Loder.jsx/Loader';

const PrivetRoute = ({ children }) => {
  const { user, loading,token } = useAuth()
  if (loading || (token && !user)) {
    return <Loader/>;
  }

  if (user) {
    return children
  }
  return <Navigate to='/'></Navigate>
};

export default PrivetRoute;