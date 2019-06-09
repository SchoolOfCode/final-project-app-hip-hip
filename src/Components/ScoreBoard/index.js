import React from "react";
import css from "../ScoreBoard/ScoreBoard.module.css";

import cn from "classnames";
import TeamNameAndScore from "../TeamNameAndScore";

const cssOrder = ["teamOne", "teamTwo", "teamThree", "teamFour"].reverse();

export default function ScoreBoard({ teamsArray, scoresTotal }) {
  let orderedTeams = teamsArray.sort(
    (team, team2) => scoresTotal[team2] - scoresTotal[team]
  );

  return (
    <div className={css.teamScoreContainer}>
      {orderedTeams.map((team, i) => {
        return (
          <div key={i} className={cn(css[cssOrder[i]], css.teams)}>
            <TeamNameAndScore teamName={team} score={scoresTotal[team]} />
          </div>
        );
      })}
    </div>
  );
}

// ScoreBoard.propTypes = {
//   teamsArray: PropTypes.array,
//   scoresTotal: PropTypes.Mixed
// };

ScoreBoard.defaultProps = {
  teamsArray: ["yellow", "blue", "green", "pink"],
  scoresTotal: { yellow: 0, blue: 6, green: 10, pink: 50 }
};
