import React from "react";
import "./loading.scss";
// react-bootstrap
import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <div className="loading container d-flex justify-content-center align-items-center flex-column">
      <h3>Loading...</h3>
      <p className="opacity-75">Loading content. Please wait</p>
      <Spinner animation="border" variant="primary" role="status" />
    </div>
  );
}

export default Loading;
