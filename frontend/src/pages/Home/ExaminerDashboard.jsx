import React from "react";
import "./examiner-dashboard.scss";
import Height100vh from "@components/Height100vh/Height100vh.jsx";
// react-router-dom
import { Link } from "react-router-dom";
// context
import { useAuthentication } from "@context/AuthenticationContext";

function ExaminerDashboard() {
  const { userData } = useAuthentication();
  const fullName = `${userData.first_name} ${userData.last_name}`;
  return (
    <Height100vh id="student-dashboard">
      <div className="container">
        <div className="row welcoming-user">
          <span>
            <h2>Hello,</h2>
            <span className="fs-4 fw-normal text-black opacity-50">
              {fullName}.
            </span>
          </span>
        </div>
        <div className="row new-exam-row">
          <Link to="/new/exam" className="btn btn-primary">
            Create a new exam
          </Link>
        </div>
      </div>
    </Height100vh>
  );
}

export default ExaminerDashboard;
