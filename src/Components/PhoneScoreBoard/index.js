import React from "react";
import css from "./PhoneScoreBoard.module.css";

export default function({ joinedRoom, teamColor, gameMessage }) {
    const style = { backgroundColor: teamColor };
    console.log("joined room in phone score board", joinedRoom);

    return (
        <div className={css.textContainer} style={style}>
            <p className={css.phoneMessage}>{gameMessage}</p>
        </div>
    );
}
