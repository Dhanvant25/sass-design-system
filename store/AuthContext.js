"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("userData");
      setIsAuthenticated(false);
    }
  }, [userData]);

  const clearAuth = () => {
    setUserData(null);
    setIsAuthenticated(false);
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        isAuthenticated,
        setIsAuthenticated,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
