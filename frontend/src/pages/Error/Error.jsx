import React from "react";
import Height100vh from "@components/Height100vh/Height100vh.jsx";
import "./error.scss";

function Error() {
  return (
    <Height100vh className="error">
      <Height100vh className="container">
        <h2 className="text-danger">Error 404</h2>
        <h4 className="text-danger">Page has not been found</h4>
      </Height100vh>
    </Height100vh>
  );
}

export default Error;
