import React from "react";
// react-router-dom
import { Link } from "react-router-dom";
// Components
import AuthenticationContainer from "@components/AuthenticationContainer/AuthenticationContainer";
import AuthenticationModal from "@components/AuthenticationModal/AuthenticationModal";

function ResetPasswordComplete() {
  return (
    <AuthenticationContainer>
      <AuthenticationModal hasShadow={true}>
        <h3>Password has been reset</h3>

        <p>Your password has been set. You may go ahead now</p>

        <Link to="/sign-in">Sign in</Link>
      </AuthenticationModal>
    </AuthenticationContainer>
  );
}

export default ResetPasswordComplete;
