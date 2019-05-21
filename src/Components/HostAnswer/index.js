import React from "react";

import css from "./HostAnswer.module.css";

export default function({ joinedRoom, gameMessage }) {
    let correctOrder = joinedRoom.currentQuestion.sort(
        (a, b) => a.order - b.order
    );
    return (
        <>
            <div className={css.cardsWrapper}>
                {correctOrder.map((item, i) => (
                    <div className={css.cards} key={i}>
                        {item.text}
                    </div>
                ))}
            </div>
        </>
    );
}
