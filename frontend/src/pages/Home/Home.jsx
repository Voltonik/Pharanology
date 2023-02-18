import React from "react";
import UnknownUserHome from "./UnknownUserHome";
import StudentDashboard from "./StudentDashboard";
// context
import { useAuthentication } from "@context/AuthenticationContext";

function Home() {
  const { userData } = useAuthentication();
  if (userData && userData.is_authenticated) return <StudentDashboard />;
  return <UnknownUserHome />;
}

export default Home;
