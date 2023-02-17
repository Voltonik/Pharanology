import React from "react";
import Height100vh from "@components/Height100vh/Height100vh.jsx";
import "./error.scss";

function Error({ message, code, children }) {
  return (
    <Height100vh className="error">
      <Height100vh className="container">
        <h2 className="text-danger">Error {code || 404}</h2>
        <h4 className="text-danger">{message || "Page has not been found"}</h4>
        {children}
      </Height100vh>
    </Height100vh>
  );
}

export default Error;
