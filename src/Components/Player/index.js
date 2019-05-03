
import React, { useState } from "react";

import Keypad from "../Keypad";


function Player({
  handleChange,
  roomInput,
  enterGameRoom,
  joinTeam,
  startGame,
  gameMessage,
  teamOptions,

  gotNameAndInRoom,
  teamColor,
  sendAnswerToServer,
  card,
  setRoomInput

}) {
  const [name, setName] = useState("");
  const [hasJoinedTeam, setHasJoinedTeam] = useState(false);
  return (
    <div>

      <h3 style={{ backgroundColor: teamColor }}>{gameMessage}</h3>
      {!gotNameAndInRoom ? (
        <>
          {" "}
          <input
            type="text"
            placeholder="whats your name"
            value={name}
            onChange={() => setName(window.event.target.value)}
          />
          <input
            type="number"
            onChange={handleChange}
            value={roomInput}
            placeholder="enter room number here"
          />
          <button
            onClick={() => {
              enterGameRoom(name);
            }}
          >
            enter room

     
      <Keypad roomInput={roomInput} setRoomInput={setRoomInput} />
      <br />
      <button
        onClick={() => {
          enterGameRoom();
        }}
      >
        enter room
      </button>
      <div>
        {teamOptions.map((item, i) => (
          <button key={i} onClick={() => joinTeam(item)}>
            {item}

          </button>
        </>
      ) : (
        <div>
          {!hasJoinedTeam &&
            teamOptions.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  setHasJoinedTeam(true);
                  joinTeam(item);
                }}
              >
                {item}
              </button>
            ))}
        </div>
      )}
      <br />
      <h3>{card.text}</h3>
      <div>
        <button
          onClick={() => {
            sendAnswerToServer(1);
          }}
        >
          1
        </button>
        <button
          onClick={() => {
            sendAnswerToServer(2);
          }}
        >
          2
        </button>
        <button
          onClick={() => {
            sendAnswerToServer(3);
          }}
        >
          3
        </button>
        <button
          onClick={() => {
            sendAnswerToServer(4);
          }}
        >
          4
        </button>
      </div>

      {/* <button onClick={startGame}>start game</button> */}
    </div>
  );
}

export default Player;
