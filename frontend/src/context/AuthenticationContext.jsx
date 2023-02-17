import React, { useState, useEffect, createContext, useContext } from "react";
import api from "@/api.js";
const AuthenticationContext = createContext();

export function useAuthentication() {
  return useContext(AuthenticationContext);
}

export function AuthenticationProvider({ children }) {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    api
      .get("/api/auth/get_user_data/")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        setUserData(null);
      });
  }, []);

  return (
    <AuthenticationContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
