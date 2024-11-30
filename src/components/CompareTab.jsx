import React, { useState } from 'react';

const CompareTab = () => {
  const [query, setQuery] = useState('');

  const handleCompare = () => {
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="flex justify-center items-center mb-6">
      <input
        type="text"
        placeholder="Compare 2 Players..."
        value={query}
        onChange={(k) => setQuery(k.target.value)}
        className="border rounded-l px-4 py-2 w-3/4"
      />
      <button
        onClick={handleCompare}
        className="bg-blue-600 text-white px-4 py-2 rounded-r"
      >
        Compare
      </button>
    </div>
  );
};

export default CompareTab;
