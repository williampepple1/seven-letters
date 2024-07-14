import React from 'react';
import WordGame from './components/WordGame';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import GuestGame from './pages/GuestGame';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/game" element={<WordGame />} />
        <Route path="/guest" element={<GuestGame />} />
      </Routes>
    </Router>
  );
};

export default App;