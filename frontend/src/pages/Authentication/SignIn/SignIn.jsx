import React, { useEffect, useRef, useState } from "react";
import { sectionHeight100vh } from "@/utils.js";
// react-router-dom
import { Link } from "react-router-dom";
// react-bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// scss
import "./sign-in.scss";

function SignIn() {
  const container = useRef(null);
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    sectionHeight100vh(container.current);
    document.addEventListener("resize", () => {
      sectionHeight100vh(container.current);
    });
  }, []);
  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div id="sign-in" ref={container}>
      <div className="modal shadow-lg">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign in
          </Button>
        </Form>
        <div className="forgotten-password">
          <Link to="/reset-password">Forgotten password?</Link>
        </div>
        <hr />
        <Link id="modal-sign-up" to="/sign-up">
          <Button variant="success">Create a new account</Button>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
