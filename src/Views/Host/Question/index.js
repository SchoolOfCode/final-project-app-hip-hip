import React from "react";

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
          <h2 style={{ fontSize: "50px" }}>{serverCounter.round}</h2>
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
