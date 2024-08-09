import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import TeamMember from './pages/TeamMember';
import Homework from './pages/Homework';
import './styles.css'; // Import your CSS file here

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/member/guy">Guy Pariente</Link>
          <Link to="/member/tomer">Tomer Lazarovitch</Link>
          <Link to="/member/itamar">Itamar Kraus</Link>
          <Link to="/member/chay">Chay Fadida</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/member/:memberId" element={<TeamMember />} />
          <Route path="/homework" element={<Homework />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
