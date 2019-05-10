import React, { useState } from "react";
import css from "./card.module.css";
import Phone from "./phone.svg";

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

  return (
    <div className={css.cardWrapper}>
      <h1 className={css.cardText}>{card.text}</h1>
      <div className={css.selectionWrapper}>
        {[1, 2, 3, 4].map(item => (
          <button
            style={{
              backgroundColor: isAnswerAlreadySubmitted[item] === 1 && "pink"
            }}
            className={css.selection}
            onClick={() => {
              setHasAnswered(true);
              setAnswer(item);
            }}
          >
            {item !== answer ? " " : card.text}
          </button>
        ))}
      </div>
      <br />
      <div>{card.instruction}</div>
      {hasAnswered && hasSubmitted ? (
        <p>youve locked it in!!</p>
      ) : (
        hasAnswered && (
          <button
            className={css.submit}
            onClick={() => {
              setHasSubmitted(true);
              sendAnswerToServer(answer);
            }}
          >
            Submit
          </button>
        )
      )}
    </div>
  );
}
