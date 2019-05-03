import React from "react";
import Keypad from "../Keypad";

function Player({
  handleChange,
  roomInput,
  enterGameRoom,
  joinTeam,
  startGame,
  gameMessage,
  teamOptions,
  setRoomInput
}) {
  return (
    <div>
      <h3>{gameMessage}</h3>
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
        ))}
      </div>

      {/* <button onClick={startGame}>start game</button> */}
    </div>
  );
}

export default Player;
