import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider component
export const AuthProvider = ({ children }) => {
  // Initialize auth state from localStorage if available
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    if (savedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
    
    // Mark as initialized to prevent unnecessary redirects
    setIsInitialized(true);
  }, []);

  // Dummy users
  const dummyUsers = [
    { email: 'admin@gmail.com', password: 'Test1234', role: 'admin' },
    { email: 'user@gmail.com', password: 'Test1234', role: 'user' }
  ];

  // Login function
  const login = (email, password) => {
    // Find the user with matching credentials
    const user = dummyUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Create a user object without the password
      const loggedInUser = {
        email: user.email,
        role: user.role
      };
      
      // Set the current user and logged in state
      setCurrentUser(loggedInUser);
      setIsLoggedIn(true);
      
      // Store in localStorage for persistence
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      localStorage.setItem('isLoggedIn', 'true');
      
      return { success: true, user: loggedInUser };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('currentUser');
    localStorage.setItem('isLoggedIn', 'false');
  };

  // Value object to provide through the context
  const value = {
    currentUser,
    isLoggedIn,
    isInitialized,
    login,
    logout,
    isAdmin: currentUser?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;