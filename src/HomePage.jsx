import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SearchBar from "./components/SearchBar";
import TrendingPlayers from "./components/TrendingPlayers";
import CompareTab from "./components/CompareTab";
import PlayerProfile from "./components/PlayerProfile";
import SignIn from "./components/SignIn";

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <SignIn />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-blue-600 text-white">
        <h1 className="text-3xl font-bold">NBA Tracker</h1>
        <button
          onClick={() => getAuth().signOut()}
          className="bg-red-500 px-4 py-2 rounded text-white"
        >
          Sign Out
        </button>
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
