import React, { useState } from "react";
import RoomNumberPicker from "../RoomNumberPicker";
import HostTeamJoiningBoxes from "../HostTeamJoiningBoxes";

export default function Host({
  makeGameRoom,
  startGame,
  joinedRoom,
  deleteGameRoom,
  gameMessage,
  teamOptions
}) {
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  return (
    <div>
      <h3>
        please go to /join and enter room number: <br />
        {joinedRoom.id}
      </h3>
      <h6>{gameMessage}</h6>
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
          <RoomNumberPicker
            setHasJoinedRoom={setHasJoinedRoom}
            makeGameRoom={makeGameRoom}
          />
        )}
        <br />
        <button onClick={startGame}>start game</button>
      </div>
      <HostTeamJoiningBoxes teamOptions={teamOptions} joinedRoom={joinedRoom} />
    </div>
  );
}
