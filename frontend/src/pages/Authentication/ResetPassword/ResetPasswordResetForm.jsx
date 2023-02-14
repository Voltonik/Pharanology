import React, { useState } from "react";
// Components
import AuthenticationContainer from "@components/AuthenticationContainer/AuthenticationContainer";
import AuthenticationModal from "@components/AuthenticationModal/AuthenticationModal";
// react-bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
function ResetPasswordResetForm() {
  const [details, setDetails] = useState({ password: "", confirmPassword: "" });
  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const { password, confirmPassword } = details;
    if (password !== confirmPassword) {
      return;
    }
  }
  return (
    <AuthenticationContainer>
      <AuthenticationModal hasShadow={true}>
        <h3>Enter New Password</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter New Password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the password again"
              name="confirmPassword"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
        <ul>
          <li>
            Your password can't be too similar to your other personal
            information.
          </li>
          <li>Your password must contain at least 8 characters.</li>
          <li>Your password can't be a commonly used password.</li>
          <li>Your password can't be entirely numeric.</li>
        </ul>
        <Button variant="primary" type="submit">
          Change Password
        </Button>
      </AuthenticationModal>
    </AuthenticationContainer>
  );
}

export default ResetPasswordResetForm;
