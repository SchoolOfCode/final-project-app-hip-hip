import React from "react";
import css from "./TeamNameAndScore.module.css";
function TeamNameAndScore({ teamName, score }) {
  return (
    <div className={css.wrapper}>
      <div style={{ backgroundColor: teamName }} className={css.teamName}>
        {teamName}
      </div>
      <div className={css.gap} />
      <div className={css.score}>{score}</div>
    </div>
  );
}

export default TeamNameAndScore;
