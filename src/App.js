import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; 
import SearchBar from './components/SearchBar'; 
import TrendingPlayers from './components/TrendingPlayers'; 
import CompareTab from './components/CompareTab';
import './HomePage.css';
import PlayerProfile from './components/PlayerProfile';

function App() {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<HomePage />} />

        {}
        <Route path="/search" element={<SearchBar />} />
        <Route path="/trending" element={<TrendingPlayers />} />
        <Route path="/Compare" element={<CompareTab />} />
        <Route path="/Profle" element={<PlayerProfile />} />
        
      </Routes>
    </Router>
  );
}

export default App;
