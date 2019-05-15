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
  sendliveCardUpdates,
  isSubmitAllowed,
  submitTeamAnswer
}) {
  console.log("live card updates", liveCardUpdates);

  // const [cardHighlight, setCardHighlight] = useState({
  //   0: false,
  //   1: false,
  //   2: false,
  //   3: false
  // });

  return (
    <div className={css.cardWrapper}>
      <h1 className={css.cardText}>{card.text}</h1>
      <div className={css.selectionWrapper}>
        {selectionOptions.map((item, i) => (
          <button
            // style={{ backgroundColor: cardHighlight[i] && "lightgreen" }}
            className={css.selection}
            onClick={() => {
              setHasAnswered(true);
              sendliveCardUpdates(item, card);
              // setCardHighlight({ [i]: true });
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
      {isSubmitAllowed && (
        <button
          className={css.submit}
          onClick={() => {
            setHasSubmitted(true);
            submitTeamAnswer();
          }}
        >
          Submit
        </button>
      )}
    </div>
  );
}
