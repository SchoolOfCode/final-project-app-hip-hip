import React from "react";
import css from "../ScoreBoard/ScoreBoard.module.css";

import cn from "classnames";

const cssOrder = ["teamOne", "teamTwo", "teamThree", "teamFour"].reverse();

export default function ScoreBoard({ teamsArray, scoresTotal }) {
  let orderedTeams = teamsArray.sort(
    (team, team2) => scoresTotal[team2] - scoresTotal[team]
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
            {team}: {scoresTotal[team]}
          </li>
        );
      })}
    </ul>
  );
}

// ScoreBoard.propTypes = {
//   teamsArray: PropTypes.array,
//   scoresTotal: PropTypes.Mixed
// };

ScoreBoard.defaultProps = {
  teamsArray: ["yellow", 'blue', 'green'],
  scoresTotal: { yellow: 0 , blue: 6, green: 10}
};
