"use client";

import { useState } from "react";
import axios from "axios";

export default function LoginModal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    setError("");

    const res = await axios.post("http://localhost:3000/api/login", {
      username,
      password,
    });

    if (res.data.isAuthenticated) {
      localStorage.setItem("token", res.data.token);
      window.location.reload(); // Recargamos para que ACL lo valide
    } else {
      setError(res.data.message || "Error de login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
