import React, { useState, useEffect } from "react";
// react-router-dom
import { Link, useNavigate } from "react-router-dom";
// react-bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// Context
import { useAuthentication } from "@context/AuthenticationContext";
// Components
import AuthenticationModal from "@components/AuthenticationModal/AuthenticationModal";
import AuthenticationContainer from "@components/AuthenticationContainer/AuthenticationContainer";
// api
import api, { getCookie } from "@/api";
// scss
import "./login.scss";

function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuthentication();
  const [message, setMessage] = useState({ content: "", className: "" });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);
  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const csrftoken = getCookie("csrftoken");
    setIsLoggingIn(true);
    api
      .post("/api/auth/login/", details, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
      })
      .then((response) => {
        setIsLoggingIn(false);
        setMessage({
          content: "Logged in successfully, Redirecting to dashboard",
          className: "text-success",
        });
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        setIsLoggingIn(false);
        setMessage({
          content: error.response.data.non_field_errors[0],
          className: "text-danger",
        });
      });
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

          <Form.Group className="mb-1" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={handleChange}
            />
          </Form.Group>
          {message.content && (
            <h6 className={`text-center ${message.className}`}>
              {message.content}
            </h6>
          )}
          <Button disabled={isLoggingIn} variant="primary" type="submit">
            {isLoggingIn ? "Logging In..." : "Login"}
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
