import React, { useState } from "react";
import { database } from "./firebase";
import { ref, push } from "firebase/database";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a search term.");
      return;
    }

    try {
      const searchRef = ref(database, "searches");
      await push(searchRef, {
        query: query.trim(),
        timestamp: new Date().toISOString(),
      });

      setResults((prevResults) => [...prevResults, query]);
    } catch (error) {
      console.error("Error logging search:", error);
    }
  };

  return (
    <div className="search-container flex flex-col items-center">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded px-4 py-2 mb-4 w-3/4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
      <div className="results mt-4">
        {results.map((result, index) => (
          <p key={index}>{result}</p>
        ))}
      </div>
    </div>
  );
};

export default Search;
