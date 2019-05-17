import React from "react";

export default function({ gameMessage, serverCounter }) {
  return (
    <div>
      <h1 className={"question"} style={{ fontSize: "50px" }}>
        {gameMessage}
      </h1>
      {serverCounter.question === 0 ? (
        <>
          <h2>CORRELATE!</h2>
          <h2>{serverCounter.round} snds left</h2>
        </>
      ) : (
        <h2> {serverCounter.question}</h2>
      )}
    </div>
  );
}
