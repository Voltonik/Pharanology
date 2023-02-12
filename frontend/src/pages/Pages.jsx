import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import ContactUs from "./ContactUs/ContactUs";
import Dashboard from "./Dashboard/Dashboard";
import Exams from "./Exams/Exams";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/exams" element={<Exams />}></Route>
      <Route path="/contact-us" element={<ContactUs />}></Route>
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
    </Routes>
  );
}

export default Pages;
