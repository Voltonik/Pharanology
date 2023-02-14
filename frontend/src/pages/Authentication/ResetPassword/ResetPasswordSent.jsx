import React from "react";
// Components
import AuthenticationContainer from "@components/AuthenticationContainer/AuthenticationContainer";
import AuthenticationModal from "@components/AuthenticationModal/AuthenticationModal";

function ResetPasswordSent() {
  return (
    <AuthenticationContainer>
      <AuthenticationModal hasShadow={true}>
        <h3>Password reset sent</h3>

        <p>
          We've emailed you instructions for settings your password, if an
          account exists with the email you entered. You should receive them
          shortly.
        </p>

        <p>
          If you don't receive an email, please make sure you've entered the
          address you registered with, and check your spam folder.
        </p>
      </AuthenticationModal>
    </AuthenticationContainer>
  );
}

export default ResetPasswordSent;
