import React from "react";

import TeamBoxes from "../../../Components/HostTeamJoiningBoxes";
import CorrelateLogo from "../../../Components/Branding";
import css from "./PopulateTeams.module.css";

export default function({
    teamOptions,
    joinedRoom,
    deleteTeamMember,
    deleteGameRoom,
    startGame
}) {
    return (
        <main>
            <CorrelateLogo />
            <div className={css.roomCodeContainer}>
                <p className={css.p1}>Room Code:</p>
                <p className={css.p2}>{joinedRoom.id}</p>
            </div>

            <button className={css.startGame} onClick={startGame}>
                Start Game
            </button>
            <TeamBoxes
                teamOptions={teamOptions}
                joinedRoom={joinedRoom}
                deleteTeamMember={deleteTeamMember}
            />
            <button onClick={deleteGameRoom}>
                delete room and start again
            </button>
        </main>
    );
}
