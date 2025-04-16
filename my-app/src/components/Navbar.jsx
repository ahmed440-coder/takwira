import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext.js';
import Logo from '../Logo2.png';
import Profil from '../profil.jpg';

function Navbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const { user, logout } = useAuth();

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
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="w-12 h-12 hover:scale-110 transition-transform duration-300"
          />
        </Link>

        {/* Nav Links with blur background only */}
        <div className="flex justify-center gap-6 px-6 py-2 rounded-xl bg-white/10 backdrop-blur-md shadow-md">
          {[
            { to: '/', label: 'Home' },
            { to: '/calendar', label: 'Calendar' },
            ...(user
              ? [
                  { to: '/profile', label: 'Profile' },
                  { to: '/admin', label: 'Admin' }
                ]
              : [
                  { to: '/login', label: 'Login' },
                  { to: '/Signup', label: 'Register' }
                ])
          ].map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="text-sm font-medium hover:text-red-500 transition-all duration-300 px-2"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Profile */}
        {user && (
          <div className="relative ml-4" ref={profileRef}>
            <img
              src={Profil}
              alt="User Profile"
              className="w-11 h-11 rounded-full border-2 border-red-600 cursor-pointer transition-transform duration-300 hover:scale-110 hover:border-red-700"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            />

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-3 bg-black/90 backdrop-blur-lg text-white rounded-xl shadow-xl w-52 z-50 p-4">
                <ul className="space-y-2">
                  <li>
                    <Link to="/profile" className="block px-3 py-2 rounded hover:bg-gray-800 transition">My Profile</Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-800 transition">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/settings" className="block px-3 py-2 rounded hover:bg-gray-800 transition">Settings</Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-800 transition"
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
