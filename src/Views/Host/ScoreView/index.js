import React from "react";
import ScoreBoard from "../../../Components/ScoreBoard/index";
import css from "../ScoreView/Scoreview.module.css";
// import HostScoreBoard from "../../../Components/HostScoreBoard";
export default function({ teamOptions, joinedRoom }) {
  return (
    <div>
      <h1 className={css.title}>The Scores...</h1>
      <ScoreBoard teamOptions={teamOptions} joinedRoom={joinedRoom} />
    </div>
  );
}
