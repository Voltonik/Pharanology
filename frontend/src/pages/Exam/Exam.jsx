import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./exam.scss";
import { Form, Button, Modal } from "react-bootstrap";
// Components
import ExamNavbar from "@components/Navbar/ExamNavbar/ExamNavbar";
import DashboardNavbar from "@components/Navbar/DashboardNavbar/DashboardNavbar";
import Timer from "@components/Timer/Timer";
// Pages
import Error from "../Error/Error";
// scss
import "./exam.scss";
// Context
import { useAuthentication } from "@context/AuthenticationContext";
const QUESTION_TYPES = {
  MCQ: "MCQ",
  TrueOrFalse: "TrueOrFalse",
};
function Exam({}) {
  const [isModalShown, setIsModalShown] = useState(false);
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
        timer={<Timer className="ms-auto me-3" initialMinute={1} />}
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
        <div className="d-flex justify-content-center align-items-center">
          <Button
            variant="primary"
            onClick={() => {
              setIsModalShown(true);
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
      <Modal
        show={isModalShown}
        onHide={() => {
          setIsModalShown(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Submittion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to submit the exam?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setIsModalShown(false);
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function Question({ prompt, img, type, choices, questionNumber }) {
  return (
    <div className="container question" id={questionNumber}>
      <h4>{questionNumber}.</h4>
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
