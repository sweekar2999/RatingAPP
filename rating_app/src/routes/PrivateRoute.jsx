import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) return <Navigate to="/" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" />;

  return <Component />;
};

export default PrivateRoute;
