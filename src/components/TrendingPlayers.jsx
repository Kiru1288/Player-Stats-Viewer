import React from 'react';

const TrendingPlayers = () => {
  const players = [
    { id: 1, name: 'LeBron James', team: 'Lakers' },
    { id: 2, name: 'Stephen Curry', team: 'Warriors' },
    { id: 3, name: 'Kevin Durant', team: 'Suns' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Trending Players</h2>
      <ul>
        {players.map((player) => (
          <li
            key={player.id}
            className="bg-white shadow p-4 rounded mb-2 hover:bg-gray-100"
          >
            {player.name} - {player.team}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPlayers;
