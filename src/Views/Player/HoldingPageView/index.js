import React from "react";
import css from "./HoldingPageView.module.css";

export default function({ joinedRoom, teamColor }) {
    return (
        <div className={css.textContainer}>
            <div className={css.text}>
                <span className={css.yay}> YAY!</span>
                <br />
                You are on the
                <br />
                <span className={css.teamColor}> {teamColor}</span> team
                <br />
                in <span className={css.joinedRoom}>{joinedRoom.id}</span>
                <br />
                so just chill whilst everyone else gets their act together.
            </div>
        </div>
    );
}
