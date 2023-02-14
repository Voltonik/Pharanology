import React from "react";
import UnknownUserHome from "./UnknownUserHome";
import StudentDashboard from "./StudentDashboard";

function Home() {
  const isLogged = true;
  if (isLogged) return <StudentDashboard />;
  return <UnknownUserHome />;
}

export default Home;
