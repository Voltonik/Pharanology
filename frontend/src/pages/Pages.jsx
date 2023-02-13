import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import ContactUs from "./ContactUs/ContactUs";
import Dashboard from "./Dashboard/Dashboard";
import Exams from "./Exams/Exams";
import SignIn from "./Authentication/SignIn/SignIn";
import SignUp from "./Authentication/SignUp/SignUp";
import ResetPasswordEmail from "./Authentication/ResetPassword/ResetPasswordEmail";
import ResetPasswordSent from "./Authentication/ResetPassword/ResetPasswordSent";

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/exams" element={<Exams />}></Route>
      <Route path="/contact-us" element={<ContactUs />}></Route>
      {/* Authentication */}
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/reset-password" element={<ResetPasswordEmail />}></Route>
      <Route
        path="/reset-password-sent"
        element={<ResetPasswordSent />}
      ></Route>
    </Routes>
  );
}

export default Pages;
