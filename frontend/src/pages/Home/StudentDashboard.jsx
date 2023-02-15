import React from "react";
import "./student-dashboard.scss";
import Height100vh from "@components/Height100vh/Height100vh.jsx";
// react-router-dom
import { Link } from "react-router-dom";
// Splide
import ExamSplide from "@components/ExamSplide/ExamSplide";
import { SplideSlide } from "@splidejs/react-splide";
// react-bootstrap
import Card from "react-bootstrap/Card";
const SPLIDE_TYPES = {
  UPCOMING: "UPCOMING",
  AVAILABLE: "AVAILABLE",
  HISTORY: "HISTORY",
};
function StudentDashboard() {
  return (
    <Height100vh id="student-dashboard">
      <div className="container">
        <div className="row welcoming-user">
          <span>
            <h2>Hello,</h2>
            <span className="fs-4 fw-normal text-black opacity-50">
              Maged Ibrahim.
            </span>
          </span>
        </div>
        <div className="row">
          <div className="col-12">
            <h3>Upcoming exams</h3>
          </div>
          <div className="col-12">
            <ExamSplide>
              <SplideSlide>
                <ExamCard
                  examName="English Exam"
                  examDate={new Date().toString()}
                  img={{
                    src: "https://media.istockphoto.com/id/1047570732/vector/english.jpg?s=612x612&w=0&k=20&c=zgafUJxCytevU-ZRlrZlTEpw3mLlS_HQTIOHLjaSPPM=",
                  }}
                />
              </SplideSlide>
            </ExamSplide>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h3>Available Exams</h3>
          </div>
          <div className="col-12">
            <ExamSplide>
              <SplideSlide>
                <ExamCard
                  examName="English Exam"
                  examDate={new Date().toString()}
                  img={{
                    src: "https://fluencycorp.com/wp-content/uploads/2019/01/hardest-part-learning-english.jpg",
                  }}
                  link="/exam/7"
                  splideType={SPLIDE_TYPES.AVAILABLE}
                />
              </SplideSlide>
            </ExamSplide>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h3>
              Exam history{" "}
              <span className="fs-6 text-muted">
                It's up to the examiner whether or not the exam is saved in your
                history
              </span>
            </h3>
          </div>
          <div className="col-12">
            <ExamSplide>
              <SplideSlide>
                <ExamCard
                  examName="English Exam"
                  examDate={new Date().toString()}
                  img={{
                    src: "https://fluencycorp.com/wp-content/uploads/2019/01/hardest-part-learning-english.jpg",
                  }}
                  link="/exam/2"
                />
              </SplideSlide>
              <SplideSlide>
                <ExamCard
                  examName="English Exam"
                  examDate={new Date().toString()}
                  link="/exam/1"
                />
              </SplideSlide>
              <SplideSlide>
                <ExamCard
                  examName="English Exam"
                  examDate={new Date().toString()}
                  link="/exam/3"
                />
              </SplideSlide>
            </ExamSplide>
          </div>
        </div>
      </div>
    </Height100vh>
  );
}
function ExamCard({ img, examName, examDate, link, splideType }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        {img && img.src && (
          <Card.Img
            variant="top"
            style={{
              height: "5rem",

              objectFit: "cover",
            }}
            src={img.src}
          />
        )}
        <Card.Title>{examName}</Card.Title>
        <Card.Subtitle className="text-muted">{examDate}</Card.Subtitle>
        {link && (
          <Link to={link.link} className="btn btn-primary ">
            {splideType === SPLIDE_TYPES.AVAILABLE
              ? "Get Started"
              : "See Results"}
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}
export default StudentDashboard;
