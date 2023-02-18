import { Route, Routes } from "react-router-dom";
// Pages
import Home from "./Home/Home";
import Login from "./Authentication/Login/Login";
import Register from "./Authentication/Register/Register";
import ResetPasswordEmail from "./Authentication/ResetPassword/ResetPasswordEmail";
import ResetPasswordSent from "./Authentication/ResetPassword/ResetPasswordSent";
import ResetPasswordComplete from "./Authentication/ResetPassword/ResetPasswordComplete";
import ResetPasswordResetForm from "./Authentication/ResetPassword/ResetPasswordResetForm";
import Error from "./Error/Error";
import Exam from "./Exam/Exam";
import Loading from "./Loading/Loading";
import DashboardSharedLayout from "./SharedLayouts/DashboardSharedLayout";
import { useAuthentication } from "@context/AuthenticationContext";

function Pages() {
  const { loading, userData } = useAuthentication();
  if (loading || !userData)
    return (
      <div style={{ height: "100vh" }}>
        <Loading />
      </div>
    );
  return (
    <Routes>
      <Route path="/exam/:examId" element={<Exam />} />
      <Route element={<DashboardSharedLayout />}>
        <Route path="/" element={<Home />}></Route>
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
      </Route>
    </Routes>
  );
}

export default Pages;
