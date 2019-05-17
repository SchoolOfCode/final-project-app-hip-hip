import React, { useState } from "react";
import css from "./jointeam.module.css";

export default function({ setHasJoinedTeam, joinTeam, teamOptions }) {
  const [name, setName] = useState("");
  return (
    <>
      <input
        className={css.nameInput}
        type="text"
        placeholder="your name here"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <br />
      {teamOptions.map((item, i) => (
        <button
          className={css.teamOptions}
          style={{ backgroundColor: item }}
          key={i}
          onClick={() => {
            if (name.length > 0) {
              // setHasJoinedTeam(true);
              joinTeam(item, name);
            }
          }}
        >
          join the {item} team
        </button>
      ))}
    </>
  );
}
