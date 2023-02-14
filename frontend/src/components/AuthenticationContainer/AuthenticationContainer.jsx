import React from "react";

import Height100vh from "@components/Height100vh/Height100vh";
import "./authentication-container.scss";

const AuthenticationContainer = ({ children, id }) => {
  return (
    <Height100vh id={id} className="authentication-container">
      {children}
    </Height100vh>
  );
};

export default AuthenticationContainer;
