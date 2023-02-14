import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import ContactUs from "./ContactUs/ContactUs";
import Dashboard from "./Dashboard/Dashboard";
import Exams from "./Exams/Exams";
import Login from "./Authentication/Login/Login";
import Register from "./Authentication/Register/Register";
import ResetPasswordEmail from "./Authentication/ResetPassword/ResetPasswordEmail";
import ResetPasswordSent from "./Authentication/ResetPassword/ResetPasswordSent";
import ResetPasswordComplete from "./Authentication/ResetPassword/ResetPasswordComplete";
import ResetPasswordResetForm from "./Authentication/ResetPassword/ResetPasswordResetForm";
import Error from "./Error/Error";

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/exams" element={<Exams />}></Route>
      <Route path="/contact-us" element={<ContactUs />}></Route>
      {/* Authentication */}
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/reset-password" element={<ResetPasswordEmail />}></Route>
      <Route
        path="/reset-password-sent"
        element={<ResetPasswordSent />}
      ></Route>
      <Route
        path="/reset-password-complete"
        element={<ResetPasswordComplete />}
      ></Route>
      <Route
        path="/reset-password-reset-form"
        element={<ResetPasswordResetForm />}
      ></Route>
      {/* Not matching the previous routes: */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default Pages;