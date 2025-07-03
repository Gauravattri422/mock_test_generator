import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MathJaxContext } from "better-react-mathjax";

import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import "./styles/app.css";

const mathJaxConfig = {
  loader: { load: ["input/tex", "output/chtml"] },
};

export default function App() {
  return (
    <MathJaxContext version={3} config={mathJaxConfig}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </Router>
    </MathJaxContext>
  );
}




