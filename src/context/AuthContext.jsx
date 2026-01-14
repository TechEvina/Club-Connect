import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('clubconnect_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Check if user exists in localStorage with matching credentials
    const registeredUsers = JSON.parse(localStorage.getItem('clubconnect_registered_users') || '[]');
    const foundUser = registeredUsers.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }
    
    // Remove password from user object before setting
    const { password: _, ...userData } = foundUser;
    setUser(userData);
    localStorage.setItem('clubconnect_user', JSON.stringify(userData));
    return userData;
  };

  const register = async (name, email, password, extendedData = {}) => {
    // Check if user already exists
    const registeredUsers = JSON.parse(localStorage.getItem('clubconnect_registered_users') || '[]');
    if (registeredUsers.find(u => u.email === email)) {
      throw new Error('An account with this email already exists');
    }
    
    // Create user data with password for validation
    const userWithPassword = { 
      id: Date.now().toString(),
      email: email,
      password: password, // Store password for login validation
      name: name || email.split('@')[0] || 'User',
      username: extendedData.username || '',
      profilePic: extendedData.profilePic || '👤',
      school: extendedData.school || '',
      language: extendedData.language || 'en',
      role: extendedData.role || 'student',
      clubs: extendedData.clubs || [],
      notifications: extendedData.notifications || {
        events: true,
        messages: true,
        voting: true,
        attendance: true,
        announcements: true
      },
      joinedClubs: extendedData.clubs || [],
      badges: [],
      createdAt: new Date().toISOString()
    };
    
    // Save to registered users list
    registeredUsers.push(userWithPassword);
    localStorage.setItem('clubconnect_registered_users', JSON.stringify(registeredUsers));
    
    // Set current user (without password)
    const { password: _, ...userData } = userWithPassword;
    setUser(userData);
    localStorage.setItem('clubconnect_user', JSON.stringify(userData));
    try { localStorage.removeItem('clubconnect_preview_school'); } catch (e) {}
    return userData;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('clubconnect_user');
    try { localStorage.removeItem('clubconnect_preview_school'); } catch (e) {}
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};