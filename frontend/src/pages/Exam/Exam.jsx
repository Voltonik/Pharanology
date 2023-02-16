import React from "react";
import { useParams } from "react-router-dom";
import "./exam.scss";
import { Form, Button } from "react-bootstrap";
const QUESTION_TYPES = {
  MCQ: "MCQ",
  TrueOrFalse: "TrueOrFalse",
};
function Exam({}) {
  const { examId } = useParams();
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div id="exam">
      <div>
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
            <Button variant="primary" type="submit">
              Submit Exam
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

function Question({ prompt, img, type, choices, questionNumber }) {
  return (
    <div className="container question">
      <h1>{questionNumber}.</h1>
      {img && <img src={img} className="img-fluid" />}
      {prompt && <h3 className="text-black">{prompt}</h3>}
      {type === QUESTION_TYPES.MCQ &&
        choices.map((choice) => {
          return (
            <Form.Check
              type="radio"
              id={choice}
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
