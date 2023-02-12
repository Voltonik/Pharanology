// react-router-dom
import { NavLink } from "react-router-dom";
// react-bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
// scss
import "@components/Buttons/buttons.scss";
import "./navbar.scss";
const EXPAND = "lg";
function Navbar() {
  return (
    <BootstrapNavbar id="navbar" variant="light" expand={EXPAND}>
      <Container>
        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink className="nav-link" to="/exams">
              Exams
            </NavLink>
            {/* <NavLink to="/">Exams</NavLink> */}
            <NavLink className="nav-link" to="/contact-us">
              Contact us
            </NavLink>

            <NavLink className="nav-link" to="sign-in">
              Sign in
            </NavLink>
            <NavLink className="nav-link" to="sign-up">
              Sign up
            </NavLink>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
