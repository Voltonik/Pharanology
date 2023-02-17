import React, { useEffect } from "react";
// Components
import Navbar from "@components/Navbar/Navbar";
// api
import api, { getCookie } from "@/api.js";
// react-router-dom
import { NavLink } from "react-router-dom";
// context
import { useAuthentication } from "@/context/AuthenticationContext";

function DashboardNavbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuthentication();
  useEffect(() => {
    api.get("/api/auth/login/").then((response) => {
      setIsLoggedIn(response.data.is_authenticated);
    });
  }, []);
  function logout() {
    const csrftoken = getCookie("csrftoken");
    api
      .post(
        "/api/auth/logout/",
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
        }
      )
      .then(() => {
        setIsLoggedIn(false);
      });
  }
  return (
    <Navbar>
      <NavLink className="nav-link" to="/">
        {isLoggedIn ? "Dashboard" : "Home"}
      </NavLink>

      {isLoggedIn ? (
        <>
          <button className="btn nav-link" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink className="nav-link" to="login">
            Login
          </NavLink>
          <NavLink className="nav-link" to="register">
            Register
          </NavLink>
        </>
      )}
    </Navbar>
  );
}

export default DashboardNavbar;
