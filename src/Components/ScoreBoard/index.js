import React from "react";
import css from "../ScoreBoard/ScoreBoard.module.css";

import cn from "classnames";

const cssOrder = ["teamOne", "teamTwo", "teamThree", "teamFour"].reverse();

export default function ScoreBoard({ teamOptions, joinedRoom }) {
  let orderedTeams = teamOptions.sort(
    (team, team2) =>
      joinedRoom.scoresTotal[team2] - joinedRoom.scoresTotal[team]
  );

  return (
    <ul className={css.teamScoreContainer}>
      {orderedTeams.map((team, i) => {
        return (
          <li
            key={i}
            style={{
              border: `solid 10px ${team}`,
              color: team
            }}
            className={cn(css[cssOrder[i]], css.teams)}
          >
            {team}: {joinedRoom.scoresTotal[team]}
          </li>
        );
      })}
    </ul>
  );
}
