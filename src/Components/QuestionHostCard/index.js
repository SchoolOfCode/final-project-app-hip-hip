import React from "react";
import css from "./QuestionHostCard.module.css";

export default function({
    setIsItQuestionTime,
    gameMessage,
    getCurrentScore,
    setTeamsThatHaveSubmitted
}) {
    return (
        <>
            <div className={css.questionBox}>
                <h1>{gameMessage}</h1>
            </div>
            <button
                className={css.showScores}
                onClick={() => {
                    getCurrentScore();
                    setIsItQuestionTime(false);
                    setTeamsThatHaveSubmitted([]);
                }}
            >
                show scores
            </button>
        </>
    );
}
