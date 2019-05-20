import React from "react";
import ScoreBoard from "../../../Components/ScoreBoard/index";
// import HostScoreBoard from "../../../Components/HostScoreBoard";
export default function({ teamOptions, joinedRoom }) {
    return (
        <div>
            <h1>Correlate Score Board</h1>
            <ScoreBoard teamOptions={teamOptions} joinedRoom={joinedRoom} />
        </div>
    );
}
