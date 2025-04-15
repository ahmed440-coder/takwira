import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // Optionally check backend for current session
      axios.get('http://localhost:8081/api/auth/me', { withCredentials: true })
        .then(res => {
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
        })
        .catch(() => {
          setUser(null);
        });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:8081/api/auth/login', {
        email, password
      });

      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Invalid credentials');
    }
  };

  const logout = async () => {
    try {
      console.log(user);
      axios.post('http://localhost:8081/api/auth/logout', undefined, {
        headers: {
          Authorization: `Bearer ${user}`,
        }
      });
    } catch (err) {
      console.error('Logout error:', err);
    }

    setUser(null);
    localStorage.removeItem('user');
    alert("user is out !");
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
