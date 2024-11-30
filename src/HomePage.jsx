import React from 'react';
import SearchBar from './components/SearchBar';
import TrendingPlayers from './components/TrendingPlayers';
import CompareTab from './components/CompareTab';
import PlayerProfile from './components/PlayerProfile';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-blue-600 text-white">
        <h1 className="text-3xl font-bold">NBA Tracker</h1>
      </header>
      <main className="p-6">
        <SearchBar />
        <TrendingPlayers />
        <CompareTab />
        <PlayerProfile />
      </main>
    </div>
  );
};

export default HomePage;
