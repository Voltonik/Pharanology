import React, { useState, useEffect, createContext, useContext } from "react";
import api from "@/api.js";
const AuthenticationContext = createContext();

export function useAuthentication() {
  return useContext(AuthenticationContext);
}

export function AuthenticationProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    api.get("/api/auth/login/").then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <AuthenticationContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
