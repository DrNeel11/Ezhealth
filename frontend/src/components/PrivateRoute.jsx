import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated
  const email = localStorage.getItem('email'); // Get the updated email

  return isAuthenticated && email ? <Component /> : <Navigate to="/signin" />;
};

export default PrivateRoute;