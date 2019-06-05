import React from "react";
import css from "./HostTeamJoiningBoxes.module.css";

import defaultJoinedRoom from "../../defaultProps";
import PropTypes from "prop-types";

function TeamBoxes({ teamsArray, teams }) {
  return (
    <div className={css.teamsWrapper}>
      {teamsArray.map((color, i) => (
        <div
          key={i}
          style={{ backgroundColor: color }}
          className={css.gridItem}
        >
          <h3>{color}</h3>
          <ul>
            {teams[color].map((player, i) => (
              <li key={i}>{player.name} </li>
            ))}
          </ul>
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
      red: [{ name: "ben" }],
      blue: [{ name: "ben" }],
      yellow: [{ name: "ben" }]
    }
};
export default TeamBoxes;
