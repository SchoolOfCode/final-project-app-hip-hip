import React from "react";
import cn from "classnames";
import css from "./endpagescoreboard.module.css";

const cssOrder = ["teamOne", "teamTwo", "teamThree", "teamFour"].reverse();

export default function EndPage({ joinedRoom, teamOptions, props }) {
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
