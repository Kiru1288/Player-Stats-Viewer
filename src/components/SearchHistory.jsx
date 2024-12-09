import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, query, orderByChild, equalTo, get } from "firebase/database";
import { getAuth } from "firebase/auth";

const SearchHistory = () => {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          setError("You need to be signed in to view your search history.");
          return;
        }

        const searchRef = ref(database, `searchQueries/${user.uid}`);
        const querySnapshot = await get(query(searchRef, orderByChild("timestamp")));

        if (!querySnapshot.exists()) {
          setError("No search history found.");
          return;
        }

        const history = [];
        querySnapshot.forEach((childSnapshot) => {
          history.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });

        setSearches(history);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchHistory();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Search History</h2>
      <ul>
        {searches.map((search) => (
          <li key={search.id}>
            {search.query} - {new Date(search.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
