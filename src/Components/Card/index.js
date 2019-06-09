import React from "react";
import css from "./Card.module.css";

const selectionOptions = [1, 2, 3, 4];

export default function({
  card,
  liveCardUpdates,
  sendliveCardUpdates,
  isSubmitAllowed,
  submitTeamAnswer,
  answerFeedback,
  showPoints,
  isTeamCaptain,
  setIsSubmitAllowed
}) {
  return (
    <div className={css.cardWrapper}>
      <h1 className={css.cardText}>{card.text}</h1>
      <div className={css.selectionWrapper}>
        {selectionOptions.map((item, i) => (
          <button
            style={{ backgroundColor: answerFeedback[i].color }}
            key={i}
            className={css.selection}
            onClick={() => {
              sendliveCardUpdates(item, card);
            }}
          >
            {showPoints
              ? answerFeedback[i].points
              : liveCardUpdates[item].map(item => item.cardText)}
          </button>
        ))}
      </div>
      <br />
      <div className={css.instructionsWrapper}>
        <div>{card.gotCard && card.instruction[0]}</div>
        <div>{card.gotCard && card.instruction[1]}</div>
      </div>
      {isTeamCaptain && isSubmitAllowed && (
        <button
          className={css.submit}
          onClick={() => {
            submitTeamAnswer();
            setIsSubmitAllowed(false);
          }}
        >
          Submit
        </button>
      )}
    </div>
  );
}
