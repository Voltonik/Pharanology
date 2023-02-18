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
// scss
import "./register.scss";

function Register() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState({
    content: "",
    className: "",
  });
  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password1: "",
    password2: "",
    grade: "",
  });
  // useEffect(() => {
  //   api.get("/api/auth/login/").then((response) => {
  //     if (response.data.is_authenticated) {
  //       navigate("/");
  //     }
  //   });
  // }, []);
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
        setMessage({
          content: "Registered successfully, Redirecting to dashboard",
          className: "text-success",
        });
        // navigate("/");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        // setIsRegistering(false);
        // setMessage({
        //   content: error.response.data.non_field_errors[0],
        //   className: "text-danger",
        // });
      });
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
            <Form.Label>Password</Form.Label>
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
          <Button variant="primary" type="submit">
            Register
          </Button>
          {message.content && (
            <h6 className={`text-center mb-0 ${message.className}`}>
              {message.content}
            </h6>
          )}
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
