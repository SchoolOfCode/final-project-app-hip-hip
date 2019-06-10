import React from "react";
import css from "../ScoreBoard/ScoreBoard.module.css";

import cn from "classnames";
import TeamNameAndScore from "../TeamNameAndScore";

export default function ScoreBoard({ teamsArray, scoresTotal }) {
  let orderedTeams = teamsArray.sort(
    (team, team2) => scoresTotal[team2] - scoresTotal[team]
  );

  return (
    <div className={css.teamScoreContainer}>
      {orderedTeams.map((team, i) => {
        return (
          <div key={i} className={cn(css[`team${i}`], css.teams)}>
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
  teamsArray: [
    "HotPink",
    "SpringGreen",
    "GhostWhite",
    "MidnightBlue",
    "PaleGoldenRod"
  ],
  scoresTotal: {
    HotPink: 0,
    SpringGreen: 6,
    GhostWhite: 10,
    MidnightBlue: 50,
    PaleGoldenRod: 1000
  }
};
