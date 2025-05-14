import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-white text-2xl font-semibold tracking-wide">
        Rating App
      </h1>
      <button
        onClick={handleLogout}
        className="bg-white text-red-600 font-medium px-4 py-2 rounded-lg shadow hover:bg-red-50 active:scale-95 transition-all duration-150"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
