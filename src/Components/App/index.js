import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Host from "../Host";
import Player from "../Player";

// import Button from "../Button";
const socket = openSocket("192.168.0.74:6001");

function App() {
  const [roomInput, setRoomInput] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [joinedRoom, setJoinedRoom] = useState({});
  const [gameMessage, setGameMessage] = useState("select number of teams");
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
  function sendTestQuestion() {
    socket.emit("sendTestQuestion", roomNumber);
  }
  return (
    <div>
      <Router>
        <div>
          <h4>{gameMessage}</h4>
          <h3>{roomNumber}</h3>
          <Route
            exact
            path="/"
            render={props => (
              <Host
                {...props}
                changeNumberOfTeams={changeNumberOfTeams}
                makeGameRoom={makeGameRoom}
                numberOfTeams={numberOfTeams}
                sendTestQuestion={sendTestQuestion}
              />
            )}
          />
          <Route
            path="/join"
            render={props => (
              <Player
                {...props}
                teamOptions={teamOptions}
                gameMessage={gameMessage}
                handleChange={handleChange}
                roomInput={roomInput}
                enterGameRoom={enterGameRoom}
                joinTeam={joinTeam}
              />
            )}
          />
        </div>
      </Router>
    </div>
  );
}

export default App;
