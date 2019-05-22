import React from "react";
import ScoreBoard from "../../../Components/ScoreBoard/index";
import css from "../ScoreView/scoreview.module.css";
// import HostScoreBoard from "../../../Components/HostScoreBoard";
export default function({ teamOptions, joinedRoom }) {
    return (
        <div>
            <h1 className={css.title}>The Scores are... Board</h1>
            <ScoreBoard teamOptions={teamOptions} joinedRoom={joinedRoom} />
        </div>
    );
}
