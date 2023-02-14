import React from "react";
import "./hero.scss";
import Height100vh from "@components/Height100vh/Height100vh.jsx";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <Height100vh id="hero">
      <Height100vh className="container">
        <Height100vh className="row">
          <div className="col-12 col-md-8 col-typography">
            <h1 className="mb-3">Get the best examining experience</h1>
            <p className="mb-3">
              <b className="text-primary">Pharanology</b> has the best user
              interface/experience to help students learn, and teachers teach.
            </p>
            <Link
              to="register"
              className="btn btn-primary text-uppercase fw-semibold btn-get-started"
            >
              Get started
            </Link>
          </div>
          <div className="col-12 col-md-4 col-img">
            <img
              src="https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEORj8mSo98CwhsTOOs7UGFtYbn_14FH-G3CFJ2-z3d1yk0WulVMU5QQmigqP5Qrb4mKXH-cI4PVHudTAIcQ2nVGmYPNUdQ=w1366-h625"
              alt=""
              className="logo img-fluid"
            />
          </div>
        </Height100vh>
      </Height100vh>
    </Height100vh>
  );
}

export default Hero;
