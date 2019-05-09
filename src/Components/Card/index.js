import React, { useState } from "react";

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
