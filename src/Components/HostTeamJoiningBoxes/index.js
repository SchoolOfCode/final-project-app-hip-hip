import React from "react";
import css from "./HostTeamJoiningBoxes.module.css";

export default function({ teamOptions, joinedRoom }) {
  return (
    <div className={css.teamsWrapper}>
      {teamOptions.map((color, i) => (
        <div
          key={i}
          style={{ backgroundColor: color }}
          className={css.gridItem}
        >
          <h3>{color}</h3>
          <ul>
            {joinedRoom.teams[color].map((player, i) => (
              <li key={i}>{player.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
