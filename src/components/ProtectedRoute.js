// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const ProtectedRoute = ({ element }) => {
  const { currentUser } = React.useContext(AuthContext);
  console.log('Current User:', currentUser);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
