import React, { useState } from 'react';

const PlayerProfileTab = () => {
  const [query, setQuery] = useState('');

  const PlayerProfileCompare = () => {
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="flex justify-center items-center mb-6">
      <input
        type="text"
        placeholder="Player Profile..."
        value={query}
        onChange={(k) => setQuery(k.target.value)}
        className="border rounded-l px-4 py-2 w-3/4"
      />
      <button
        onClick={PlayerProfileCompare} // Use the correct function name here
        className="bg-blue-600 text-white px-4 py-2 rounded-r"
      >
        Profile
      </button>
    </div>
  );
};

export default PlayerProfileTab;
