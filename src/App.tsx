// /src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Traders from "./pages/Traders";
import TraderDetails from "./pages/TraderDetails";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white">
        {/* Навігаційний бар */}
        <Navbar />

        {/* Роутинг */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/traders" element={<Traders />} />
            <Route path="/trader/:id" element={<TraderDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
