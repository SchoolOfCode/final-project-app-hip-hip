import React from "react";

export default function Host({
  numberOfTeams,
  changeNumberOfTeams,
  makeGameRoom,
  sendTestQuestion
}) {
  return (
    <div>
      <button
        onClick={() => {
          changeNumberOfTeams(-1);
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          makeGameRoom();
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
      <button onClick={sendTestQuestion}>send test question</button>
    </div>
  );
}
