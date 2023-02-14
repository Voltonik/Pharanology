import React, { useRef, useEffect } from "react";
import { sectionHeight100vh } from "@/utils.js";
import "./reset-password-sent.scss";
// Components
import AuthenticationModal from "@components/AuthenticationModal/AuthenticationModal";

function ResetPasswordSent() {
  const container = useRef(null);
  useEffect(() => {
    sectionHeight100vh(container.current);
    document.addEventListener("resize", () => {
      sectionHeight100vh(container.current);
    });
  }, []);
  return (
    <div id="reset-password-sent" ref={container}>
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
    </div>
  );
}

export default ResetPasswordSent;
