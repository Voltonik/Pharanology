import React, { useState } from "react";
// react-router-dom
import { Link } from "react-router-dom";
// react-bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// Components
import AuthenticationModal from "@components/AuthenticationModal/AuthenticationModal";
// api
import api from "@/api";
// scss
import "./login.scss";
import AuthenticationContainer from "../../../components/AuthenticationContainer/AuthenticationContainer";

function Login() {
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const { username, password } = details;
    api.post("login/", { username, password });
  }
  return (
    <AuthenticationContainer id="login">
      <AuthenticationModal hasShadow={true}>
        <Form method="POST" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              required
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <div className="forgotten-password">
          <Link to="/reset-password">Forgotten password?</Link>
        </div>
        <hr />
        <Link id="modal-register" to="/register">
          <Button variant="secondary">Create a new account</Button>
        </Link>
      </AuthenticationModal>
    </AuthenticationContainer>
  );
}

export default Login;
