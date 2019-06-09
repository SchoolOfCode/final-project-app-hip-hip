import React from "react";
import css from "./RoundView.module.css";

const RoundCard = ({ gameMessage, roundNumber, questionType }) => {
    return (
        <div className={css.container}>
            <h1 className={css.round}>Round</h1>
            <h1 className={css.roundNumber}>{roundNumber}</h1>

            <h3 className={css.roundMessage}>{gameMessage}</h3>
            {questionType === "order" ? (
                <p className={css.pointsInfo}>
                    Each correct answer is worth {roundNumber * 100}
                </p>
            ) : (
                <p className={css.pointsInfo}>
                    The correct answer will score you {roundNumber * 100 * 4}
                </p>
            )}
        </div>
    );
};

export default RoundCard;
