import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import './styles.css';

export default function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fittrack_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user && page === "landing") {
      setPage("dashboard");
    }
  }, [user, page]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fittrack_user');
    setPage("landing");
  };

  return (
    <div className="app-root min-h-screen bg-[#03070D] text-white font-sans">
      {page === "landing" && (
        <LandingPage setPage={setPage} user={user} />
      )}

      {page === "login" && (
        <Login setPage={setPage} setUser={setUser} />
      )}

      {page === "register" && (
        <Register setPage={setPage} setUser={setUser} />
      )}

      {page === "dashboard" && (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

