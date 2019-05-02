import React from "react";

function Player({
  handleChange,
  roomInput,
  enterGameRoom,
  joinTeam,
  startGame,
  gameMessage,
  teamOptions
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
