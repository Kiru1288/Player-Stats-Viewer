import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, push } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [playerStats, setPlayerStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const fetchPlayerData = async () => {
    if (!query.trim()) {
      alert("Please enter a valid player last name.");
      return;
    }

    if (!user) {
      alert("You need to sign in to perform a search.");
      return;
    }

    setLoading(true);
    setError("");
    setPlayerStats([]);

    const playerEndpoint = `https://api-nba-v1.p.rapidapi.com/players?search=${query.trim()}`;
    const statsEndpoint = `https://api-nba-v1.p.rapidapi.com/players/statistics?search=${query.trim()}`;
    const apiKey = "e71c84684dmsh173c0371798ed01p101feajsnd28b846bb3d5";

    try {
      const searchRef = ref(database, `searchQueries/${user.uid}`);
      await push(searchRef, {
        query,
        timestamp: new Date().toISOString(),
      });

      const playerResponse = await fetch(playerEndpoint, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
          "x-rapidapi-key": apiKey,
        },
      });

      if (!playerResponse.ok) {
        throw new Error(`Error: ${playerResponse.status} - ${playerResponse.statusText}`);
      }

      const playerData = await playerResponse.json();

      if (!playerData.response || playerData.response.length === 0) {
        setError(`No player data found for "${query.trim()}". Try using only last name.`);
        return;
      }

      const statsResponse = await fetch(statsEndpoint, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
          "x-rapidapi-key": apiKey,
        },
      });

      if (!statsResponse.ok) {
        throw new Error(`Error: ${statsResponse.status} - ${statsResponse.statusText}`);
      }

      const statsData = await statsResponse.json();

      setPlayerStats(
        playerData.response.map((player) => ({
          ...player,
          stats: statsData.response.filter((stat) => stat.player.id === player.id),
        }))
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter player's last name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded-l px-4 py-2 w-3/4"
        />
        <button
          onClick={fetchPlayerData}
          className="bg-blue-600 text-white px-4 py-2 rounded-r"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-blue-600 mt-4">Loading...</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      <div className="mt-6 w-full max-w-3xl">
        {playerStats.map((player, index) => (
          <div key={index} className="bg-white shadow p-4 mb-4 rounded">
            <h2 className="text-xl font-bold">
              {player.firstname} {player.lastname}
            </h2>
            <p>Team: {player.team ? player.team.name : "N/A"}</p>
            <p>
              Height: {player.height ? `${player.height.feets}'${player.height.inches}"` : "N/A"}
            </p>
            <p>
              Weight: {player.weight ? `${player.weight.pounds} lbs` : "N/A"}
            </p>
            <p>Birthdate: {player.birth ? player.birth.date : "N/A"}</p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Game Stats</h3>
              {player.stats && player.stats.length > 0 ? (
                player.stats.map((stat, idx) => (
                  <div key={idx} className="mt-2">
                    <p>Points: {stat.points}</p>
                    <p>Rebounds: {stat.totReb}</p>
                    <p>Assists: {stat.assists}</p>
                    <p>Minutes: {stat.min}</p>
                  </div>
                ))
              ) : (
                <p>No game stats available.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
