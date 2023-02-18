import React from "react";
import { useParams, Link } from "react-router-dom";
import "./exam.scss";
import { Form, Button } from "react-bootstrap";
import ExamNavbar from "@components/Navbar/ExamNavbar/ExamNavbar";
import DashboardNavbar from "@components/Navbar/DashboardNavbar/DashboardNavbar";
import Error from "../Error/Error";
// Context
import { useAuthentication } from "@context/AuthenticationContext";
const QUESTION_TYPES = {
  MCQ: "MCQ",
  TrueOrFalse: "TrueOrFalse",
};
function Exam({}) {
  const { examId } = useParams();
  const { userData } = useAuthentication();
  function handleSubmit(e) {
    e.preventDefault();
  }
  if (!userData || !userData.is_authenticated) {
    return (
      <>
        <DashboardNavbar />
        <Error message="You haven't logged in yet!" code={401}>
          <Link className="btn btn-primary" to="/login">
            Go to login page
          </Link>
        </Error>
      </>
    );
  }
  return (
    <div id="exam">
      <ExamNavbar
        examName="Physics Test"
        progressBar={{ now: 50 }}
        questions={[
          { number: 1, prompt: "1+1=?" },
          {
            number: 2,
            prompt:
              "Density = Mass/Volume tsettst etsts tesetset setstste set stetse",
          },
        ]}
      />
      <Form onSubmit={handleSubmit}>
        <Question
          type="MCQ"
          prompt="1 + 1 = ?"
          questionNumber={1}
          choices={[2, 3, 4, 5]}
        />
        <hr />
        <Question
          type={QUESTION_TYPES.TrueOrFalse}
          prompt="Density = mass/volume"
          questionNumber={2}
        />
        <hr />
        <Question
          type={QUESTION_TYPES.TrueOrFalse}
          prompt="Density = mass/volume"
          questionNumber={3}
        />
        <hr />
        <Question
          type={QUESTION_TYPES.TrueOrFalse}
          prompt="Density = mass/volume"
          questionNumber={4}
        />
        <hr />
        <Question
          type={QUESTION_TYPES.TrueOrFalse}
          prompt="Density = mass/volume"
          questionNumber={5}
        />
        <hr />
        <Question
          type={QUESTION_TYPES.TrueOrFalse}
          prompt="Density = mass/volume"
          questionNumber={6}
        />
        <hr />
        <Question
          type={QUESTION_TYPES.TrueOrFalse}
          prompt="Density = mass/volume"
          questionNumber={7}
        />
        <div className="d-flex justify-content-center align-items-center">
          <Button variant="primary" type="submit">
            Submit Exam
          </Button>
        </div>
      </Form>
    </div>
  );
}

function Question({ prompt, img, type, choices, questionNumber }) {
  return (
    <div className="container question" id={questionNumber}>
      <h1>{questionNumber}.</h1>
      {img && <img src={img} className="img-fluid" />}
      {prompt && <h3 className="text-black">{prompt}</h3>}
      {type === QUESTION_TYPES.MCQ &&
        choices.map((choice) => {
          return (
            <Form.Check
              type="radio"
              key={choice}
              id={`gggg-${choice}`}
              name={questionNumber}
              label={choice}
            />
          );
        })}
      {type === QUESTION_TYPES.TrueOrFalse && (
        <>
          <Form.Check type="radio" name={questionNumber} label="True" />
          <Form.Check type="radio" name={questionNumber} label="False" />
        </>
      )}
    </div>
  );
}

export default Exam;