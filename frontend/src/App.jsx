import React from "react";

import { BrowserRouter } from "react-router-dom";
// Context
import { AuthenticationProvider } from "@context/AuthenticationContext.jsx";
// Components
import Navbar from "@components/Navbar/Navbar";
// Pages
import Pages from "@pages/Pages";
// scss
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <Navbar />
        <Pages />
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
