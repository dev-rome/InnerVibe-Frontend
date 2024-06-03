import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const EntryInput = () => {
  const [entry, setEntry] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const token = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = "http://localhost:5001/api/entry";
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["x-auth-token"] = String(token);
      }

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ entry, title }),
      });
      const data = await res.json();
      setMessage(data.message);
      console.log("Response", data);
    } catch (err) {
      console.error("Error submitting mood:", err);
      setMessage("Error submitting entry");
    }
    setEntry("");
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        Entry:
        <textarea value={entry} onChange={(e) => setEntry(e.target.value)} />
      </label>
      <button>Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default EntryInput;
