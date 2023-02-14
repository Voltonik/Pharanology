import React from "react";
import "./authentication-modal.scss";
import "@components/Modal/modal.scss";
function AuthenticationModal({ children, hasShadow }) {
  return (
    <div className={`modal authentication-modal ${hasShadow && "shadow-lg"}`}>
      {children}
    </div>
  );
}

export default AuthenticationModal;
