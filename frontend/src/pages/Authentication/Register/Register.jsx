import React, { useState, useEffect } from "react";
// react-router-dom
import { Link, useNavigate } from "react-router-dom";
// react-bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// api
import api, { getCookie } from "@/api";
// Components
import AuthenticationContainer from "@components/AuthenticationContainer/AuthenticationContainer";
import AuthenticationModal from "@components/AuthenticationModal/AuthenticationModal";
// Context
import { useAuthentication } from "@context/AuthenticationContext";
// scss
import "./register.scss";

function Register() {
  const navigate = useNavigate();
  const { userData, setUserData } = useAuthentication();
  const [isRegistering, setIsRegistering] = useState(false);
  const [messages, setMessages] = useState([]);
  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password1: "",
    password2: "",
    grade: "",
  });
  useEffect(() => {
    if (userData && userData.is_authenticated) {
      navigate("/");
    }
  }, [userData]);
  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const csrftoken = getCookie("csrftoken");
    setIsRegistering(true);
    api
      .post("/api/auth/register/", details, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
      })
      .then((response) => {
        setIsRegistering(false);
        setMessages([
          {
            content: "Registered successfully, Redirecting to dashboard",
            className: "text-success",
          },
        ]);
        setUserData({ ...response.data, is_authenticated: true });
        navigate("/");
      })
      .catch((error) => {
        let errorMessages = [];
        const errors = error.response.data;
        for (const fieldName in errors) {
          const field = errors[fieldName];
          errorMessages.push(...handleErrorMessage(field, fieldName));
        }
        setIsRegistering(false);
        setMessages(errorMessages);
      });
  }
  function handleErrorMessage(field, fieldName) {
    let errorMessages = [];
    for (let i = 0; i < field.length; i++) {
      let errorMessage = {};
      switch (field[i]) {
        case "Enter a valid email address.":
          errorMessage.content = `Enter a valid email address.`;
          break;
        case "This field must be unique.":
          errorMessage.content = `Try another ${fieldName}. ${fieldName} must be unique`;
          break;
        case "This password is too short. It must contain at least 8 characters.":
          errorMessage.content = field[i];
          break;
        case "This password is too common.":
          errorMessage.content = field[i];
          break;
        case "The two password fields didn't match.":
          errorMessage.content = field[i];
          break;
        default:
          break;
      }
      errorMessage.className = "text-danger";
      errorMessages.push(errorMessage);
    }
    return errorMessages;
  }
  return (
    <AuthenticationContainer id="register">
      <AuthenticationModal hasShadow={true}>
        <Form method="POST" className="container" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <Form.Group controlId="first_name">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  name="first_name"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group controlId="last_name">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  name="last_name"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>
          <Form.Group className="mb-1" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              name="username"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-1" controlId="password1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password1"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="password2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="password2"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="grade">
            <Form.Label>Grade</Form.Label>
            <Form.Select
              onChange={handleChange}
              aria-label="Default select example"
              name="grade"
              required
            >
              <option value="">-</option>
              <option value="G01">G01</option>
              <option value="G02">G02</option>
              <option value="G03">G03</option>
              <option value="G04">G04</option>
              <option value="G05">G05</option>
              <option value="G06">G06</option>
              <option value="G07">G07</option>
              <option value="G08">G08</option>
              <option value="G09">G09</option>
              <option value="G10">G10</option>
              <option value="G11">G11</option>
              <option value="G12">G12</option>
            </Form.Select>
          </Form.Group>
          <Button disabled={isRegistering} variant="primary" type="submit">
            {isRegistering ? "Registering..." : "Register"}
          </Button>
          {messages &&
            messages.map((message) => {
              return (
                <h6 key={message.content} className={`${message.className}`}>
                  {message.content}
                </h6>
              );
            })}
        </Form>

        <div className="already-have-an-account">
          <Link className="text-center" to="/login">
            Already have an account?
          </Link>
        </div>
      </AuthenticationModal>
    </AuthenticationContainer>
  );
}

export default Register;
