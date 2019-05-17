import React from "react";
import css from "../Rounds/Rounds.module.css";

const RoundCard = () => {
    return (
        <div className={css.cardContainer}>
            <h2 className={css.roundName}>Round</h2>
            <h1 className={css.roundNumber}>2</h1>
            <h2 className={css.roundMessage}>How far???</h2>
        </div>
    );
};

export default RoundCard;
