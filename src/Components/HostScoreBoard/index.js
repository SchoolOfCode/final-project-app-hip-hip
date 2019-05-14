import React from "react";
import css from "./HostScoreBoard.module.css";
export default function({ teamOptions, joinedRoom }) {
  return (
    <div>
      {teamOptions.map((color, i) => (
        <div
          key={i}
          style={{ backgroundColor: color }}
          className={css.gridItem}
        >
          <h3>{color}</h3>
          <p>{joinedRoom.roundScores[color]}</p>
        </div>
      ))}
    </div>
  );
}
