import React, { useState } from "react";

export default function({ setHasJoinedTeam, joinTeam, teamOptions }) {
  const [name, setName] = useState("");
  return (
    <>
      <input
        type="text"
        placeholder="whats your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <br />
      {teamOptions.map((item, i) => (
        <button
          style={{ backgroundColor: item }}
          key={i}
          onClick={() => {
            if (name.length > 0) {
              setHasJoinedTeam(true);
              joinTeam(item, name);
            }
          }}
        >
          {item}
        </button>
      ))}
    </>
  );
}
