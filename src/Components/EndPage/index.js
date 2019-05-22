import React from "react";

import cn from "classnames";
import css from "./Endpage.module.css";

const cssOrder = ["teamOne", "teamTwo", "teamThree", "teamFour"].reverse();

export default function({ joinedRoom, teamOptions }) {
  let orderedTeams = teamOptions.sort(
    (team, team2) => joinedRoom.scores[team] - joinedRoom.scores[team2]
  );

  return (
    <>
      <div className={css.teamScoreContainer}>
        {orderedTeams.map((team, i) => {
          return (
            <p key={i} className={cn(css[cssOrder[i]])}>
              {team}: {joinedRoom.scores[team]}
            </p>
          );
        })}
      </div>
      <button className={css.quitButton}>Start Again With New Players</button>
      //does putting the function here route you to make game room page/view?
      <button className={css.startAnotherGameButton}>
        New Game With Same Players
      </button>
    </>
  );
}
