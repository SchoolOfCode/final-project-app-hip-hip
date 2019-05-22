import React from "react";

const RoundCard = ({ gameMessage, roundNumber }) => {
  return (
    <div>
      <h1>Round {roundNumber}</h1>
      <h3>{gameMessage}</h3>
    </div>
  );
};

export default RoundCard;
