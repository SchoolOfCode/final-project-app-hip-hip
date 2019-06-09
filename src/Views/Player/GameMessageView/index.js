import React from "react";
import css from "./GameMessageView.module.css";
import botImageSmall from "../../../Components/images/botImageSmall.png";

export default function({ gameMessage }) {
    return (
        <div>
            <img className={css.botImageSmall} src={botImageSmall} alt="bot" />
            <p className={css.message}>{gameMessage}</p>
        </div>
    );
}
