import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-[calc(100%-64px)] w-full bg-gat bg-blend-normal bg-cover bg-center bg-no-repeat relative pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
