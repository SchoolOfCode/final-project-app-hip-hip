import React, { useState } from "react";
import RoomNumberPicker from "../RoomNumberPicker";
import HostTeamJoiningBoxes from "../HostTeamJoiningBoxes";
import HostScoreBoard from "../HostScoreBoard";
// import ScoreBoard from "../ScoreBoard"; // branch

export default function Host({
  makeGameRoom,
  startGame,
  joinedRoom,
  deleteGameRoom,
  gameMessage,
  teamOptions,
  sendNextQuestion
}) {
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);
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
              setHasGameStarted(false);
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
        {!hasGameStarted ? (
          <button
            onClick={() => {
              startGame();
              setHasGameStarted(true);
            }}
          >
            start game
          </button>
        ) : (
          <button onClick={sendNextQuestion}>send next question</button>
        )}
      </div>
      {!hasGameStarted ? (
        <HostTeamJoiningBoxes
          teamOptions={teamOptions}
          joinedRoom={joinedRoom}
        />
      ) : (
        <HostScoreBoard teamOptions={teamOptions} joinedRoom={joinedRoom} />
      )}
    </div>
  );
}
