import React, { useState } from "react";
import css from "./card.module.css";

export default function({
  card,
  sendAnswerToServer,
  setHasAnswered,
  setHasSubmitted,
  hasAnswered,
  hasSubmitted,
  isAnswerAlreadySubmitted
}) {
  const [answer, setAnswer] = useState();
  console.log(isAnswerAlreadySubmitted);

  return (
    <div>
      <h3>{card.text}</h3>
      <div>{card.instruction}</div>
      {[1, 2, 3, 4].map(item => (
        <button
        className={css.numbers}
          onClick={() => {
            setHasAnswered(true);
            setAnswer(item);
          }}
        >
          {!isAnswerAlreadySubmitted[item] ? item : "too slow"}
        </button>
      ))}
      <br />
      {hasAnswered && !hasSubmitted && (
        <button
        className={css.finalAnswer}
          onClick={() => {
            setHasSubmitted(true);
            sendAnswerToServer(answer);
          }}
        >
          Aubmit answer {answer}
        </button>
      )}
    </div>
  );
}
