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
      <h1
        style={{
          fontSize: 50,
          backgroundColor: "pink",
          borderRadius: "10px"
        }}
      >
        {gameMessage}
      </h1>
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
