import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SearchBar from './components/SearchBar';
import TrendingPlayers from './components/TrendingPlayers';
import CompareTab from './components/CompareTab';
import PlayerProfile from './components/PlayerProfile';
import './HomePage.css';
import SignIn from "./components/SignIn";

import SearchHistory from "./components/SearchHistory";

function App() {
  return (
    <div className="App"> {}
      <header className="App-header"> {}
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchBar />} />
            <Route path="/trending" element={<TrendingPlayers />} />
            <Route path="/compare" element={<CompareTab />} />
            <Route path="/profile" element={<PlayerProfile />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/History" element={<SearchHistory />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
