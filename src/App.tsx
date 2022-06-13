import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <main className="h-[calc(100%-64px)] w-full bg-gat bg-blend-normal bg-cover bg-center bg-no-repeat">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
