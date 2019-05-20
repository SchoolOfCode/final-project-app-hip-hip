import React from "react";
import css from "../ScoreBoard/ScoreBoard.module.css";

export default function ScoreBoard({ teamOptions, joinedRoom }) {
    return (
        <div className={css.teamScoreContainer}>
            <p className={css.teamOne}>Team 1</p>
            <p className={css.teamTwo}>Team 2</p>
            <p className={css.teamThree}>Team 3</p>
            <p className={css.teamFour}>Team 4</p>
        </div>
    );
}
