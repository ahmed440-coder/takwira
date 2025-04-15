import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext.js'; // <-- make sure path is correct
import Logo from '../Logo2.png';
import Profil from '../profil.jpg';

function Navbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const { user, logout } = useAuth(); // <-- use user and logout from context

  // Close dropdown if click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black text-white shadow-lg top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="w-22 h-22 transform transition-transform duration-0 hover:scale-110"
          />
        </div>

        {/* Navbar Links centered */}
        <div className="flex-1 flex justify-center space-x-8">
          <Link to="/" className="text-lg hover:text-red-500 transition-all duration-300">Home</Link>
          <Link to="/calendar" className="text-lg hover:text-red-500 transition-all duration-300">Calendar</Link>

          {/* Conditionally render profile and admin links based on login */}
          {user ? (
            <>
              <Link to="/profile" className="text-lg hover:text-red-500 transition-all duration-300">Profile</Link>
              <Link to="/admin" className="text-lg hover:text-red-500 transition-all duration-300">Admin</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-lg hover:text-red-500 transition-all duration-300">Login</Link>
              <Link to="/register" className="text-lg hover:text-red-500 transition-all duration-300">Register</Link>
            </>
          )}
        </div>

        {/* Profile Image & Dropdown */}
        {user && (
          <div className="relative ml-4" ref={profileRef}>
            <img
              src={Profil}
              alt="User Profile"
              className="w-12 h-12 rounded-full border-4 border-red-500 cursor-pointer hover:scale-110 hover:border-red-700 transition-all duration-300"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            />

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 bg-black text-white p-4 rounded-lg shadow-lg w-48 z-50">
                <ul>
                  <li>
                    <Link to="/profile" className="block py-2 px-4 hover:bg-gray-700 rounded">My Profile</Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/settings" className="block py-2 px-4 hover:bg-gray-700 rounded">Settings</Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-left block py-2 px-4 hover:bg-gray-700 rounded"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
