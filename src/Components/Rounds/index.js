import React from "react";
import css from "../Rounds/Rounds.module.css";

const RoundCard = ({ gameMessage, roundNumber }) => {
  console.log("roundCard ", gameMessage);
  return (
    <div className={css.cardContainer}>
      <h2 className={css.roundName}>Round</h2>
      <h1 className={css.roundNumber}>{roundNumber}</h1>
      <h2 className={css.roundMessage}>{gameMessage}</h2>
    </div>
  );
};

export default RoundCard;
