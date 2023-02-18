import React from "react";
// Components
import Navbar from "@components/Navbar/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// api
import api, { getCookie } from "@/api.js";
// react-router-dom
import { NavLink } from "react-router-dom";
// context
import { useAuthentication } from "@/context/AuthenticationContext";
// scss
import "./dashboard-navbar.scss";

function DashboardNavbar() {
  const { userData, setUserData } = useAuthentication();
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
        setUserData({ is_authenticated: false });
      });
  }
  return (
    <Navbar>
      <NavLink className="nav-link" to="/">
        {userData && userData.is_authenticated ? "Dashboard" : "Home"}
      </NavLink>

      {userData && userData.is_authenticated ? (
        <>
          <NavDropdown title={userData.username} id="user-dropdown">
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </>
      ) : (
        <div className="authentication-links">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        </div>
      )}
    </Navbar>
  );
}

export default DashboardNavbar;
