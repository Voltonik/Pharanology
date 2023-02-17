import React, { useEffect } from "react";
// Components
import Navbar, { NAVBAR_TYPES } from "@components/Navbar/Navbar";
// api
import api, { getCookie } from "@/api.js";
// react-router-dom
import { NavLink } from "react-router-dom";
// context
import { useAuthentication } from "@/context/AuthenticationContext";
// scss
import "./exam-navbar.scss";

function ExamNavbar({ questions, examName, examId, progressBar }) {
  return (
    <Navbar
      className="position-sticky top-0"
      expand={"none"}
      progressBar={progressBar}
      type={NAVBAR_TYPES.PLACEHOLDER}
      brandName={
        <div className="d-flex justify-content-center flex-column">
          <h5>{examName}</h5>
          <span>ID: {examId}</span>
        </div>
      }
    >
      {questions.map((question) => {
        return (
          <ExamNavbarPlaceholderQuestion
            key={question.number}
            questionNumber={question.number}
            questionPrompt={question.prompt}
          />
        );
      })}
    </Navbar>
  );
}
export function ExamNavbarPlaceholderQuestion({
  questionNumber,
  questionPrompt,
}) {
  return (
    <a
      className="question-placeholder text-truncate"
      href={`#${questionNumber}`}
    >
      {questionNumber}. {questionPrompt}
    </a>
  );
}
export default ExamNavbar;
