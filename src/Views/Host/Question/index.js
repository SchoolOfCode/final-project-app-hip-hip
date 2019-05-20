import React from "react";

export default function({ gameMessage, serverCounter }) {
  return (
    <div>
      <h1 className={"question"} style={{ fontSize: "50px" }}>
        {gameMessage}
      </h1>
      {serverCounter.question === 0 ? (
        <>
          <h2 style={
            fontFamily="Modak", sans-serif,
 fontSize=190px,
 color=#da6608,
 -webkitTextStroke=1.5px #282828;
 zIndex=0;
 lineHeight=130%}
          >CORRELATE!</h2>
          <Timer counter={serverCounter.round} />
        </>
      ) : (
        <h2> {serverCounter.question}</h2>
      )}
    </div>
  );
}
