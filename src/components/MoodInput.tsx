import React, { useState } from "react";

const MoodInput = () => {
  const [entry, setEntry] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = "http://localhost:5001/api/entry";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ entry, title }),
      });
      const data = await res.json();
      console.log("Response", data);
    } catch (err) {
      console.error("Error submitting mood:", err);
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
    </form>
  );
};

export default MoodInput;
