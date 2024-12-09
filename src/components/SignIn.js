import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-4 py-2 mb-4 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded px-4 py-2 mb-4 w-full"
      />
      <button
        onClick={handleSignIn}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Sign In
      </button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default SignIn;
