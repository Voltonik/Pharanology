import React from "react";
// react-bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
import ProgressBar from "react-bootstrap/ProgressBar";
import Offcanvas from "react-bootstrap/Offcanvas";

const EXPAND = "lg";

export const NAVBAR_TYPES = {
  COLLAPSE: "COLLAPSE",
  PLACEHOLDER: "PLACEHOLDER",
};

function Navbar({
  children,
  progressBar,
  brandName,
  className,
  offcanvasOptions,
  type,
  expand,
}) {
  const currentProgress = progressBar?.now;
  return (
    <BootstrapNavbar
      className={className}
      id="navbar"
      variant="light"
      expand={expand}
    >
      <Container>
        {brandName}
        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        {type === NAVBAR_TYPES.PLACEHOLDER && (
          <>
            <BootstrapNavbar.Offcanvas
              {...offcanvasOptions}
              id="navbar-nav"
              placement="end"
            >
              <Offcanvas.Body>{children}</Offcanvas.Body>
            </BootstrapNavbar.Offcanvas>
          </>
        )}
        {type === NAVBAR_TYPES.COLLAPSE && (
          <BootstrapNavbar.Collapse id="navbar-nav">
            <Nav>{children}</Nav>
          </BootstrapNavbar.Collapse>
        )}
      </Container>
      {currentProgress && (
        <ProgressBar
          now={currentProgress}
          label={`${currentProgress}%`}
          visuallyHidden
        />
      )}
    </BootstrapNavbar>
  );
}
Navbar.defaultProps = {
  type: NAVBAR_TYPES.COLLAPSE,
  expand: EXPAND,
  offcanvasOptions: {},
};
export default Navbar;
