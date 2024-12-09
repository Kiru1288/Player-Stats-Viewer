import React from 'react';

const TrendingPlayers = () => {
  const players = [
    {
      firstname: 'Joel',
      lastname: 'Embiid',
      team: { name: 'Philadelphia 76ers' },
      height: { feets: '7', inches: '0' },
      weight: { pounds: '280' },
      birth: { date: '1994-03-16' },
    },
    {
      firstname: 'Nikola',
      lastname: 'Jokic',
      team: { name: 'Denver Nuggets' },
      height: { feets: '6', inches: '11' },
      weight: { pounds: '284' },
      birth: { date: '1995-02-19' },
    },
    {
      firstname: 'Giannis',
      lastname: 'Antetokounmpo',
      team: { name: 'Milwaukee Bucks' },
      height: { feets: '6', inches: '11' },
      weight: { pounds: '242' },
      birth: { date: '1994-12-06' },
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Trending Players</h2>
      <div className="mt-6 w-full max-w-3xl">
        {players.map((player, index) => (
          <div key={index} className="bg-white shadow p-4 mb-4 rounded">
            <h2 className="text-xl font-bold">
              {player.firstname} {player.lastname}
            </h2>
            <p>Team: {player.team.name}</p>
            <p>
              Height: {`${player.height.feets}'${player.height.inches}"`}
            </p>
            <p>
              Weight: {`${player.weight.pounds} lbs`}
            </p>
            <p>Birthdate: {player.birth.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPlayers;
