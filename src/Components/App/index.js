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
  const [numberOfTeams, setNumberOfTeams] = useState(0);
  const [teamOptions, setTeamOptions] = useState([]);
  const [gameReadyToPlay, setGameReadyToPlay] = useState(false);

  useEffect(() => {
    socket.on("makeGameRoom", data => {
      console.log("new Game Room: ", data);
      setRoomNumber(data.id);
    });
    socket.on("enterGameRoom", data => {
      console.log(data);
      let options = Object.keys(data.teams);
      setTeamOptions(options);
      setJoinedRoom(data);
      setRoomNumber(data.id);
    });
    socket.on("gameMessage", message => {
      setGameMessage(message);
    });
    socket.on("game ");
  }, []);

  function makeGameRoom() {
    socket.emit("makeGameRoom", numberOfTeams);
  }
  function enterGameRoom() {
    socket.emit("enterGameRoom", roomInput);
  }
  function handleChange(e) {
    setRoomInput(e.target.value);
  }

  function joinTeam(team) {
    socket.emit("joinTeam", {
      joinedRoom: joinedRoom.id,
      team
    });
  }

  function startGame() {
    socket.emit("startGame", joinedRoom.id);
  }

  function changeNumberOfTeams(num) {
    if (num === 1) {
      if (numberOfTeams < 4) {
        setNumberOfTeams(numberOfTeams + num);
      }
    } else {
      if (numberOfTeams > 1) {
        setNumberOfTeams(numberOfTeams + num);
      }
    }
  }

  return (
    <div>
      {!isJoiningGame && (
        <>
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
      <button onClick={startGame}>start game</button>
      <br />
      {isJoiningGame && (
        <Player
          teamOptions={teamOptions}
          gameMessage={gameMessage}
          handleChange={handleChange}
          roomInput={roomInput}
          enterGameRoom={enterGameRoom}
          joinTeam={joinTeam}
        />
      )}
    </div>
  );
}

export default App;
