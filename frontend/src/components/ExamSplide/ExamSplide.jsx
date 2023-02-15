import { Splide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "./exam-splide.scss";
import React from "react";
export const SPLIDE_DEFAULT_OPTIONS = {
  perPage: 4,
  arrows: false,
  drag: "free",
  gap: "5rem",
  breakpoints: {
    550: {
      perPage: 1,
    },
    950: {
      perPage: 2,
    },
    1450: {
      perPage: 3,
    },
  },
};
function ExamSplide({ children, options }) {
  return (
    <Splide
      className="exam-splide"
      options={{ ...SPLIDE_DEFAULT_OPTIONS, ...options }}
    >
      {children}
    </Splide>
  );
}

export default ExamSplide;
