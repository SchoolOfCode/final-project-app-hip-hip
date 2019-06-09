import React from "react";
import css from "../ScoreBoard/ScoreBoard.module.css";

import cn from "classnames";
import TeamNameAndScore from "../TeamNameAndScore";

export default function ScoreBoard({ teamsArray, scoresTotal }) {
	let orderedTeams = teamsArray.sort(
		(team, team2) => scoresTotal[team] - scoresTotal[team2]
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
	teamsArray: ["yellow", "blue", "green", "pink"],
	scoresTotal: { yellow: 0, blue: 6, green: 10, pink: 50 }
};
