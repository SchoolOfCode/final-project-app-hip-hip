import React from "react";
import css from "../ScoreBoard/ScoreBoard.module.css";

import cn from "classnames";

const cssOrder = ["teamOne", "teamTwo", "teamThree", "teamFour"].reverse();

export default function ScoreBoard({ teamOptions, joinedRoom }) {
  let orderedTeams = teamOptions.sort(
    (team, team2) => joinedRoom.scores[team] - joinedRoom.scores[team2]
  );

  return (
    <div className={css.teamScoreContainer}>
      {orderedTeams.map((team, i) => {
        return (
          <p key={i} className={cn(css[cssOrder[i]])}>
            {team}: {joinedRoom.scores[team]}
          </p>
        );
      })}
    </div>
  );
}
