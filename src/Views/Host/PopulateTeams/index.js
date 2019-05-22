import React from "react";

import TeamBoxes from "../../../Components/HostTeamJoiningBoxes";
import CorrelateLogo from "../../../Components/Branding";

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
            <h3>Room Code:</h3>
            <h1>{joinedRoom.id}</h1>
            <button onClick={startGame}>Start Game</button>
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
