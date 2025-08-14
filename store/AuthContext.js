// "use client";

// import React, { createContext, useState, useContext, useEffect } from "react";
// import Cookies from "js-cookie";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     !!Cookies.get("accessToken")
//   );

//   console.log(
//     "CONTEXT IS AUTH VARIABLE",
//     isAuthenticated,
//     Cookies.get("accessToken")
//   );

//   useEffect(() => {
//     const storedUser = localStorage.getItem("userData");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//       setIsAuthenticated(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (userData) {
//       localStorage.setItem("userData", JSON.stringify(userData));
//       setIsAuthenticated(true);
//     } else {
//       // localStorage.removeItem("userData");
//       // setIsAuthenticated(false);
//     }
//   }, [userData]);

//   return (
//     <AuthContext.Provider
//       value={{ userData, setUserData, isAuthenticated, setIsAuthenticated }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("accessToken")
  );

  const router = useRouter();
  const pathname = usePathname();

  const authRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/reset-password",
    "/auth/forgot-password",
  ];

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
    }
  }, [userData]);

  useEffect(() => {
    if (isAuthenticated && authRoutes.includes(pathname)) {
      router.replace("/admin");
    }
  }, [isAuthenticated, pathname, router]);

  return (
    <AuthContext.Provider
      value={{ userData, setUserData, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
