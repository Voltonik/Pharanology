import React, { useRef, useEffect, useState } from "react";
import { sectionHeight100vh } from "@/utils.js";
import "./reset-password-email.scss";
// react-bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ResetPasswordEmail() {
  const container = useRef(null);
  const [details, setDetails] = useState({ email: "" });
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
    <div id="reset-password-email" ref={container}>
      <div className="modal shadow-lg">
        <h3>Reset Password</h3>
        <p className="mb-2">
          Please enter your email address. So we can send you the instructions
          to reset your password
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              name="email"
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Reset Password
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ResetPasswordEmail;
