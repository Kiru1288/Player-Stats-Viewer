import React, { useState } from 'react';

const PlayerProfile = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPlayerProfile = async () => {
    if (!playerName.trim()) {
      alert('Please enter a valid player last name.');
      return;
    }

    setLoading(true);
    setError('');
    setPlayerData(null);

    const apiKey = 'e71c84684dmsh173c0371798ed01p101feajsnd28b846bb3d5';
    const playerEndpoint = `https://api-nba-v1.p.rapidapi.com/players?search=${playerName.trim()}`;

    try {
      const playerResponse = await fetch(playerEndpoint, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
      });

      if (!playerResponse.ok) {
        throw new Error(`Error: ${playerResponse.status} - ${playerResponse.statusText}`);
      }

      const playerDataResponse = await playerResponse.json();

      if (!playerDataResponse.response || playerDataResponse.response.length === 0) {
        setError(`No data found for "${playerName.trim()}".`);
        return;
      }

      const player = playerDataResponse.response[0];
      setPlayerData(player);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Enter player's last name..."
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="border rounded px-4 py-2 mb-4 w-3/4"
      />
      <button
        onClick={fetchPlayerProfile}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Fetch Player Profile
      </button>

      {loading && <p className="text-blue-600 mt-4">Loading...</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {playerData && (
        <div className="mt-6 w-full max-w-3xl">
          <div className="bg-white shadow p-4 mb-4 rounded">
            <h2 className="text-xl font-bold">
              {playerData.firstname} {playerData.lastname}
            </h2>
            <p>Team: {playerData.team ? playerData.team.name : 'N/A'}</p>
            <p>
              Height: {playerData.height ? `${playerData.height.feets}'${playerData.height.inches}"` : 'N/A'}
            </p>
            <p>
              Weight: {playerData.weight ? `${playerData.weight.pounds} lbs` : 'N/A'}
            </p>
            <p>Birthdate: {playerData.birth ? playerData.birth.date : 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerProfile;
