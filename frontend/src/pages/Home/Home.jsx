import React from "react";
import UnknownUserHome from "./UnknownUserHome";
import StudentDashboard from "./StudentDashboard";
import ExaminerDashboard from "./ExaminerDashboard";
// context
import { useAuthentication } from "@context/AuthenticationContext";

function Home() {
  const { userData } = useAuthentication();
  if (userData.role === "STUDENT") return <StudentDashboard />;
  if (userData.role === "ADMIN" || userData.role === "EXAMINER") {
    return <ExaminerDashboard />;
  }
  return <UnknownUserHome />;
}

export default Home;
