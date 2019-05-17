import React from "react";
import RoundCard from "../../../Components/Rounds/index";

export default function({ gameMessage, roundNumber }) {
  return (
    <div>
      <RoundCard gameMessage={gameMessage} roundNumber={roundNumber} />
    </div>
  );
}
