// Logout.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect or show success message
    } catch (error) {
      console.error(error.message);
      // Show error message
    }
  };

  return (
    <button
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
