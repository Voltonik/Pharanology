import React from "react";

import { BrowserRouter } from "react-router-dom";
// Context
import { AuthenticationProvider } from "@context/AuthenticationContext.jsx";
// Pages
import Pages from "@pages/Pages";
// scss
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <Pages />
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
