import React from "react";

import Timer from "../../../Components/CountdownTimer";

export default function({
  gameMessage,
  serverCounter,
  teamsThatHaveSubmitted
}) {
  return (
    <div>
      <h1 className={"question"} style={{ fontSize: "50px" }}>
        {gameMessage}
      </h1>
      {serverCounter.question === 0 ? (
        <>
          <h2>CORRELATE!</h2>
          <Timer counter={serverCounter.question} />
        </>
      ) : (
        <h2> {serverCounter.question}</h2>
      )}

      <ol>
        {teamsThatHaveSubmitted.map((team, i) => (
          <li key={i}>{team}</li>
        ))}
      </ol>
    </div>
  );
}
