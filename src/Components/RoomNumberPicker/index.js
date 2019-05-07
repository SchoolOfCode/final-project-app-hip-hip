import React, { useState } from "react";

export default function({ makeGameRoom, setHasJoinedRoom }) {
  const [numberOfTeams, setNumberOfTeams] = useState(0);

  function changeNumberOfTeams(num) {
    if (num === 1) {
      if (numberOfTeams < 4) {
        setNumberOfTeams(numberOfTeams + num);
      }
    } else {
      if (numberOfTeams > 1) {
        setNumberOfTeams(numberOfTeams + num);
      }
    }
  }

  return (
    <>
      <button
        onClick={() => {
          changeNumberOfTeams(-1);
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          makeGameRoom(numberOfTeams);
          setHasJoinedRoom(true);
        }}
      >
        Make room with {numberOfTeams} teams
      </button>
      <button
        onClick={() => {
          changeNumberOfTeams(1);
        }}
      >
        +
      </button>
    </>
  );
}
