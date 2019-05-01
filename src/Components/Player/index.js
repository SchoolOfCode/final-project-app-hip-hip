import React, { useState } from "react";

function Player({
  handleChange,
  roomInput,
  enterGameRoom,
  joinTeam,
  startGame,
  gameMessage
}) {
  return (
    <div>
      <h3>{gameMessage}</h3>
      <input
        type="number"
        onChange={handleChange}
        value={roomInput}
        placeholder="enter room number here"
      />
      <button onClick={enterGameRoom}>enter room</button>

      <button onClick={() => joinTeam("red")}>red</button>
      <button onClick={() => joinTeam("yellow")}>yellow</button>
      <button onClick={() => joinTeam("blue")}>blue</button>
      <button onClick={() => joinTeam("green")}>green</button>

      <button onClick={startGame}>start game</button>
    </div>
  );
}

export default Player;
