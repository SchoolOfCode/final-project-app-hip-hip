import React, { useState } from "react";

export default function Host({
  numberOfTeams,
  changeNumberOfTeams,
  makeGameRoom,
  sendTestQuestion,
  joinedRoom,
  deleteGameRoom
}) {
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  return (
    <div>
      <h3>
        please go to /join and enter room number: <br />
        {joinedRoom.id}
      </h3>
      <div>
        {hasJoinedRoom ? (
          <button
            onClick={() => {
              setHasJoinedRoom(false);
              deleteGameRoom();
            }}
          >
            make another room
          </button>
        ) : (
          <>
            {" "}
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
        )}
        <br />
        <button onClick={sendTestQuestion}>send test question</button>
      </div>
    </div>
  );
}
