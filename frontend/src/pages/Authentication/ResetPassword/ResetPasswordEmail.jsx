import React, {useState } from "react";
// react-bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// Components

import AuthenticationContainer from "@components/AuthenticationContainer/AuthenticationContainer";
import AuthenticationModal from "@components/AuthenticationModal/AuthenticationModal";

function ResetPasswordEmail() {
  const [details, setDetails] = useState({ email: "" });
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
    <AuthenticationContainer>
      <AuthenticationModal hasShadow={true}>
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
      </AuthenticationModal>
    </AuthenticationContainer>
  );
}

export default ResetPasswordEmail;
