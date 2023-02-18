import React from "react";
import "./authentication-modal.scss";
function AuthenticationModal({ children, hasShadow }) {
  return (
    <div className={`authentication-modal ${hasShadow && "shadow-lg"}`}>
      {children}
    </div>
  );
}

export default AuthenticationModal;
