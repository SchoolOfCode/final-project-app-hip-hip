import React, { useState } from "react";
import css from "./card.module.css";
import Phone from "./phone.svg";

const selectionOptions = [1, 2, 3, 4];

export default function({
  card,
  sendAnswerToServer,
  setHasAnswered,
  setHasSubmitted,
  hasAnswered,
  hasSubmitted,
  liveCardUpdates,
  sendliveCardUpdates
}) {
  const [answer, setAnswer] = useState();
  console.log("live card updates", liveCardUpdates);

  return (
    <div className={css.cardWrapper}>
      <h1 className={css.cardText}>{card.text}</h1>
      <div className={css.selectionWrapper}>
        {selectionOptions.map(item => (
          <button
            className={css.selection}
            onClick={() => {
              setHasAnswered(true);
              setAnswer(item);
              sendliveCardUpdates(item, card.text);
            }}
          >
            {liveCardUpdates[item].map(item => item.cardText)}
          </button>
        ))}
      </div>
      <br />
      <div className={css.instructionsWrapper}>
        <div>
          {" <-- "}
          {card.instruction[0]}
        </div>
        <div>
          {card.instruction[1]} {" --> "}
        </div>
      </div>
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
