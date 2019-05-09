import React, { useState } from "react";
import css from "./card.module.css";

export default function({
  card,
  sendAnswerToServer,
  setHasAnswered,
  setHasSubmitted,
  hasAnswered,
  hasSubmitted
}) {
  const [answer, setAnswer] = useState();

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
          {item}
        </button>
      ))}
      <br />
      {hasAnswered && !hasSubmitted && (
        <button
          onClick={() => {
            setHasSubmitted(true);
            sendAnswerToServer(answer);
          }}
        >
          i think it's {answer}
        </button>
      )}
    </div>
  );
}
