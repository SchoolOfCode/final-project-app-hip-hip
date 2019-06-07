import React from "react";
import css from "./PhoneScoreBoard.module.css";
import botImageSmall from "../../Components/images/botImageSmall.png";

export default function({ joinedRoom, teamColor, gameMessage }) {
    const style = { backgroundColor: teamColor };
    console.log("joined room in phone score board", joinedRoom);

    return (
        <div className={css.textContainer}>
            <img className={css.botImageSmall} src={botImageSmall} alt="bot" />
            <p className={css.phoneMessage}>{gameMessage}</p>
        </div>
    );
}
