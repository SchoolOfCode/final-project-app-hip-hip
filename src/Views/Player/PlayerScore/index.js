import React from "react";

import PhoneScoreBoard from "../../../Components/PhoneScoreBoard";

export default function({ joinedRoom, teamColor, gameMessage }) {
  return (
    <PhoneScoreBoard
      joinedRoom={joinedRoom}
      teamColor={teamColor}
      gameMessage={gameMessage}
    />
  );
}
