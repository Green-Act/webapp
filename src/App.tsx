import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import ChallengeDetails from "./pages/ChallengeDetails";

import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main className="min-h-[calc(100%-64px)] w-full bg-gat bg-blend-normal bg-cover bg-center bg-no-repeat relative pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/challengedetails" element={<ChallengeDetails />} />
          </Routes>
          <Footer />
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
