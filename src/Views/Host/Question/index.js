import React, { useEffect } from "react";

import Timer from "../../../Components/CountdownTimer";
import useAudio from "../../../Hooks/UseAudio";

export default function({
  gameMessage,
  serverCounter,
  teamsThatHaveSubmitted
}) {
  const [playing, toggle] = useAudio(`${process.env.PUBLIC_URL}/question.mp3`);

  useEffect(() => {
    toggle();
  }, []);

  return (
    <div>
      <h1 className={"question"} style={{ fontSize: "50px" }}>
        {gameMessage}
      </h1>
      {serverCounter.question === 0 ? (
        <>
          <h2>COLLABORATE!</h2>
          <Timer counter={serverCounter.round} />
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
