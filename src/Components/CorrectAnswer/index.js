import React from "react";

const CorrectAnswer = props => {
  //card.text = cards to display
  //key : order to verify order
  //css to match styling
  //sendLiveCardUpdates() function to update

  return <div className={css.correctAnswer}>{props.card.text}</div>;
};

export default CorrectAnswer;

{
  /* <h1 className={css.cardText}>{card.text}</h1>
    <div className={css.selectionWrapper}>
        {selectionOptions.map((item, i) => (
            <button
                style={{ backgroundColor: answerFeedback[i] }}
                key={i}
                className={css.selection}
                onClick={() => {
                    sendliveCardUpdates(item, card);
                }}
            >
                {liveCardUpdates[item].map(item => item.cardText)}
            </button>
        ))} */
}
