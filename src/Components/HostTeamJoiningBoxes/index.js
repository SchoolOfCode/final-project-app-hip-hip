import React from "react";
import css from "./HostTeamJoiningBoxes.module.css";

import PhoneIcon from "../PhoneIcon";

function TeamBoxes({ teamsArray, teams }) {
  return (
    <div className={css.teamsWrapper}>
      {teamsArray.map((color, i) => (
        <div
          key={i}
          style={{ backgroundColor: color }}
          className={css.gridItem}
        >
          <h3 className={css.teamName}>{color}</h3>
          <div className={css.phoneBox}>
            {teams[color].map((player, i) => (
              <PhoneIcon name={player.name}> </PhoneIcon>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

TeamBoxes.defaultProps = {
  teamsArray: ["red", "blue", "yellow"],
  scoresTotal: {
    red: 0,
    blue: 50,
    yellow: 1000
  },
  teams: {
    red: [
      { name: "poopy poopy" },
      { name: "benlee" },
      { name: "ben" },
      { name: "ben" }
    ],
    blue: [{ name: "ben" }],
    yellow: [{ name: "ben" }]
  }
};
export default TeamBoxes;
