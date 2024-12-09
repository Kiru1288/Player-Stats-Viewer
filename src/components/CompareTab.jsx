import React, { useState } from 'react';

const CompareTab = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [playersData, setPlayersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCompare = async () => {
    if (!player1.trim() || !player2.trim()) {
      alert('Please enter last names for both players.');
      return;
    }

    setLoading(true);
    setError('');
    setPlayersData([]);

    const endpoints = [
      `https://api-nba-v1.p.rapidapi.com/players?search=${player1.trim()}`,
      `https://api-nba-v1.p.rapidapi.com/players?search=${player2.trim()}`,
    ];

    try {
      const responses = await Promise.all(
        endpoints.map((url) =>
          fetch(url, {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
              'x-rapidapi-key': 'e71c84684dmsh173c0371798ed01p101feajsnd28b846bb3d5',
            },
          })
        )
      );

      const data = await Promise.all(responses.map((res) => res.json()));
      const playerData = data.map((res) => (res.response && res.response[0]) || null);

      if (playerData.includes(null)) {
        setError('One or both players not found. Please try again.');
        return;
      }

      setPlayersData(playerData);
    } catch (err) {
      setError('An error occurred while fetching player data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex mb-6 w-full max-w-lg">
        <input
          type="text"
          placeholder="Enter first player's last name..."
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          className="border rounded-l px-4 py-2 w-1/2"
        />
        <input
          type="text"
          placeholder="Enter second player's last name..."
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          className="border rounded-r px-4 py-2 w-1/2"
        />
      </div>
      <button
        onClick={handleCompare}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Compare
      </button>

      {loading && <p className="text-blue-600 mt-4">Loading...</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      <div className="mt-6 w-full max-w-3xl grid grid-cols-2 gap-4">
        {playersData.map((player, index) => (
          <div key={index} className="bg-white shadow p-4 rounded">
            <h2 className="text-xl font-bold">
              {player.firstname} {player.lastname}
            </h2>
            <p>Team: {player.team ? player.team.name : 'N/A'}</p>
            <p>
              Height: {player.height ? `${player.height.feets}'${player.height.inches}"` : 'N/A'}
            </p>
            <p>
              Weight: {player.weight ? `${player.weight.pounds} lbs` : 'N/A'}
            </p>
            <p>Birthdate: {player.birth ? player.birth.date : 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareTab;
