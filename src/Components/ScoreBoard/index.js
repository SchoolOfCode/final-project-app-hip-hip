import React from "react";
import css from "../ScoreBoard/ScoreBoard.module.css";

export default function ScoreBoard({ teamOptions, joinedRoom }) {
  return (
    <div className={css.teamScoreContainer}>
      <p className={css.teamOne}>
        {teamOptions[0]}: {joinedRoom.scores[teamOptions[0]]}{" "}
      </p>
      <p className={css.teamTwo}>
        {teamOptions[1]}: {joinedRoom.scores[teamOptions[1]]}{" "}
      </p>
      <p className={css.teamThree}>
        {teamOptions[2]}: {joinedRoom.scores[teamOptions[2]]}{" "}
      </p>
      <p className={css.teamFour}>
        {teamOptions[3]}: {joinedRoom.scores[teamOptions[3]]}{" "}
      </p>
    </div>
  );
}
