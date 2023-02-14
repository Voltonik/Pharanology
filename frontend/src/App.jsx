import React from "react";

import { BrowserRouter } from "react-router-dom";
// Components
import Navbar from "@components/Navbar/Navbar";
// Pages
import Pages from "@pages/Pages";
// scss
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Pages />
    </BrowserRouter>
  );
}

export default App;
