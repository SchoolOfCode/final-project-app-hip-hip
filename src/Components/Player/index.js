import React, { useState } from "react";

import Keypad from "../Keypad";
import EnterRoom from "../EnterRoom";

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
  const [hasJoinedTeam, setHasJoinedTeam] = useState(false);
  return (
    <div>
      <h3 style={{ backgroundColor: teamColor }}>{gameMessage}</h3>
      {!gotNameAndInRoom ? (
        <EnterRoom
          enterGameRoom={enterGameRoom}
          roomInput={roomInput}
          setRoomInput={setRoomInput}
        />
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
