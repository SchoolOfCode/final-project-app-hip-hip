import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
// import Host from "../Host";
import Player from "../Player";

// class App extends Comp

// import Button from "../Button";
const socket = openSocket("192.168.0.74:6001");

function App() {
  const [roomInput, setRoomInput] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [joinedRoom, setJoinedRoom] = useState({});
  const [gameMessage, setGameMessage] = useState(
    "would you like to create or join a game?"
  );
  const [isJoiningGame, setIsJoiningGame] = useState(false);

  useEffect(() => {
    socket.on("makeGameRoom", data => {
      console.log("new Game Room: ", data);
      setRoomNumber(data.id);
    });
    socket.on("enterGameRoom", data => {
      console.log(data);
      setJoinedRoom(data.id);
      setRoomNumber(data.id);
    });
    socket.on("gameMessage", message => {
      setGameMessage(message);
    });
  }, []);

  function makeGameRoom() {
    socket.emit("makeGameRoom");
  }
  function enterGameRoom() {
    socket.emit("enterGameRoom", roomInput);
  }
  function handleChange(e) {
    setRoomInput(e.target.value);
  }

  function joinTeam(team) {
    socket.emit("joinTeam", {
      joinedRoom,
      team
    });
  }

  function startGame() {
    socket.emit("startGame");
  }

  return (
    <div>
      {!isJoiningGame && (
        <>
          <button
            onClick={() => {
              makeGameRoom();
            }}
          >
            makeGameRoom
          </button>
          <button
            onClick={() => {
              setIsJoiningGame(true);
              setGameMessage("please enter a room number");
            }}
          >
            Join Room
          </button>
        </>
      )}

      {!isJoiningGame && (
        <>
          <h3>{roomNumber}</h3>
          <h4>{gameMessage}</h4>
        </>
      )}
      <br />
      {isJoiningGame && (
        <Player
          gameMessage={gameMessage}
          handleChange={handleChange}
          roomInput={roomInput}
          enterGameRoom={enterGameRoom}
          joinTeam={joinTeam}
          startGame={startGame}
        />
      )}
    </div>
  );
}

export default App;
