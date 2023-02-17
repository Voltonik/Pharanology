import React from "react";
import "./loading.scss";
// Components
import Height100vh from "@components/Height100vh/Height100vh";
// react-bootstrap
import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <Height100vh className="loading">
      <Height100vh className="container d-flex justify-content-center align-items-center flex-column">
        <h3>Loading...</h3>
        <p className="opacity-75">Loading content. Please wait</p>
        <Spinner animation="border" variant="primary" role="status" />
      </Height100vh>
    </Height100vh>
  );
}

export default Loading;
