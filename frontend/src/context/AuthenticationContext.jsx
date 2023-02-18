import React, { useState, useEffect, createContext, useContext } from "react";
import useAxios from "axios-hooks";
const AuthenticationContext = createContext();

export function useAuthentication() {
  return useContext(AuthenticationContext);
}

export function AuthenticationProvider({ children }) {
  const [{ data, loading, error }, refetch] = useAxios(
    "http://127.0.0.1:8000/api/auth/get_user_data/"
  );

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setUserData(data);
  }, [data]);

  return (
    <AuthenticationContext.Provider
      value={{ userData, loading, error, setUserData }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
