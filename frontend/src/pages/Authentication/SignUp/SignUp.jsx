import React, { useEffect, useRef, useState } from "react";
import { sectionHeight100vh } from "@/utils.js";
// react-router-dom
import { Link } from "react-router-dom";
// react-bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// Components
import AuthenticationModal from "@components/AuthenticationModal/AuthenticationModal";
// scss
import "./sign-up.scss";

function SignIn() {
  const container = useRef(null);
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    grade: "",
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
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      grade,
    } = details;

    if (firstName.length === 0) {
      return;
    }
    if (lastName.length === 0) {
      return;
    }
    if (!email.includes("@")) {
      return;
    }
    if (password !== confirmPassword) {
      return;
    }
    if (!grade.includes("G")) {
      return;
    }
    console.log(details);
  }
  return (
    <div id="sign-up" ref={container}>
      <AuthenticationModal hasShadow={true}>
        <Form className="container" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <Form.Group controlId="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group controlId="lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  onChange={handleChange}
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
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              name="email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-1" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="confirmPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="grade">
            <Form.Label>Grade</Form.Label>
            <Form.Select
              onChange={handleChange}
              aria-label="Default select example"
              name="grade"
            >
              <option>-</option>
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
            Sign up
          </Button>
        </Form>
        <div className="already-have-an-account">
          <Link className="text-center" to="/sign-in">
            Already have an account?
          </Link>
        </div>
      </AuthenticationModal>
    </div>
  );
}

export default SignIn;
