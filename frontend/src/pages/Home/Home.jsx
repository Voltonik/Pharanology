import React from "react";
import UnknownUserHome from "./UnknownUserHome";
import StudentDashboard from "./StudentDashboard";
// context
import { useAuthentication } from "@context/AuthenticationContext";

function Home() {
  const { isLoggedIn } = useAuthentication();
  if (isLoggedIn) return <StudentDashboard />;
  return <UnknownUserHome />;
}

export default Home;
