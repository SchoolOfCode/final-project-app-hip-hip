import React from "react";
import RoundCard from "../../../Components/Rounds";

const RoundCard = ({ gameMessage, roundNumber }) => {
  return (
    <div>
      <RoundCard gameMessage={gameMessage} roundNumber={roundNumber} />
    </div>
  );
};

export default RoundCard;
