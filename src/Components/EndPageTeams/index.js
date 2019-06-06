import React from "react";

import cn from "classnames";
import css from "./EndPageTeams.module.css";

import trophy from "./trophy.png";

const cssOrder = ["teamOne", "teamTwo", "teamThree", "teamFour"].reverse();

function EndPageTeams({ teamsArray, scoresTotal }) {

  console.log('teams and total', teamsArray, scoresTotal)
  let orderedTeams = teamsArray.sort((team, team2) => scoresTotal[team2] - scoresTotal[team])
    .slice(0, 3)
  
  return (
    <>
      {orderedTeams.map((team, i) => {
        return (
          <p
            key={i}
            style={{
              border: `solid 10px ${team}`,
              color: team
            }}
            className={cn(css.team, css[cssOrder[i]])}
          >
            {team}: {scoresTotal[team]}
          </p>
        );
      })}

      <div className={css.podiumWrapper}>
        <div className={css.podium3} />
        <div className={css.podium1}>
          <img src={trophy} className={css.trophy} />
        </div>
        <div className={css.podium2} />
      </div>
    </>
  );
}

EndPageTeams.defaultProps = {
  teamsArray: ["yellow", "blue", "orange", "silver"],
  scoresTotal: { yellow: 0, blue: 50, orange: 100, silver: 2 }
};

export default EndPageTeams;
