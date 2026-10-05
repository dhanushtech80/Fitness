import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fittrack_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default demo user profile matching design
    return {
      _id: 'demo_user_1',
      name: 'Sarah Vance',
      email: 'sarah.vance@fittrack.ai',
      role: 'Pro Athlete',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      streakDays: 14,
      cnsReadiness: 94,
      heartRateResting: 52,
      weightKg: 72.5,
      targetWeightKg: 70.0,
      token: 'demo_token'
    };
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      setUser(res.data);
      localStorage.setItem('fittrack_user', JSON.stringify(res.data));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Login failed. Please check credentials.' 
      };
    }
  };

  const register = async (name, email, password, role) => {
    setLoading(true);
    try {
      const res = await authApi.register({ name, email, password, role });
      setUser(res.data);
      localStorage.setItem('fittrack_user', JSON.stringify(res.data));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Registration failed.' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fittrack_user');
  };

  const updateUserProfile = async (updates) => {
    try {
      const res = await authApi.updateProfile(updates);
      const updatedUser = { ...user, ...res.data };
      setUser(updatedUser);
      localStorage.setItem('fittrack_user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (err) {
      // Local fallback update if offline/demo
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('fittrack_user', JSON.stringify(updatedUser));
      return { success: true };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUserProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
