import React, { useState } from "react";

export default function({ card, sendAnswerToServer }) {
  const [answer, setAnswer] = useState();
  const [hasAnswered, setHasAnswered] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
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
          {item}
        </button>
      ))}
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
