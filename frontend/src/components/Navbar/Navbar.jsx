import React, { useEffect } from "react";
// react-router-dom
import { NavLink } from "react-router-dom";
// react-bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
//api
import api, { getCookie } from "@/api.js";
// scss
import "@components/Buttons/buttons.scss";
import "./navbar.scss";
import { useAuthentication } from "@/context/AuthenticationContext";
const EXPAND = "lg";
function Navbar() {
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
    <BootstrapNavbar id="navbar" variant="light" expand={EXPAND}>
      <Container>
        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav>
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
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
