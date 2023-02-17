import React, { useState, useEffect, createContext, useContext } from "react";
import api from "@/api.js";
const AuthenticationContext = createContext();

export function useAuthentication() {
  return useContext(AuthenticationContext);
}

export function AuthenticationProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    api
      .get("/api/auth/get_user_data/")
      .then((response) => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <AuthenticationContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
