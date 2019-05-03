import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Host from "../Host";
import Player from "../Player";

// import Button from "../Button";
const socket = openSocket("192.168.0.74:6001");

function App() {
  const [roomInput, setRoomInput] = useState(0);
  const [roomNumber, setRoomNumber] = useState("");
  const [joinedRoom, setJoinedRoom] = useState({});
  const [gameMessage, setGameMessage] = useState("please enter room number");
  // const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [numberOfTeams, setNumberOfTeams] = useState(0);
  const [teamOptions, setTeamOptions] = useState([]);
  const [gameReadyToPlay, setGameReadyToPlay] = useState(false);
  const [gotNameAndInRoom, setGotNameAndInRoom] = useState(false);
  const [teamColor, setTeamColor] = useState("orange");
  const [card, setCard] = useState({});

  useEffect(() => {
    socket.on("makeGameRoom", data => {
      console.log("new Game Room: ", data);
      setRoomNumber(data.id);
      setJoinedRoom(data);
    });
    socket.on("enterGameRoom", data => {
      console.log(data);
      let options = Object.keys(data.teams);
      setTeamOptions(options);
      setJoinedRoom(data);
      setRoomNumber(data.id);
      setGotNameAndInRoom(true);
    });
    socket.on("gameMessage", message => {
      setGameMessage(message);
    });
    socket.on("teamColor", color => setTeamColor(color));
    socket.on("cardMessage", card => setCard(card));
  }, []);

  function makeGameRoom() {
    socket.emit("makeGameRoom", numberOfTeams);
  }
  function enterGameRoom(name) {
    socket.emit("enterGameRoom", { room: roomInput, name });
  }
  function handleChange(e) {
    e.preventDefault();
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

  function deleteGameRoom() {
    socket.emit("deleteGameRoom", joinedRoom.id);
    setJoinedRoom({});
  }

  function sendAnswerToServer(answerNumber) {
    socket.emit("sendAnswer", { answerNumber, card });
  }

  return (
    <div>
      <Router>
        <div>
          {/* <h4>{gameMessage}</h4>
          <h3>{roomNumber}</h3> */}
          <Route
            exact
            path="/"
            render={props => (
              <Host
                {...props}
                joinedRoom={joinedRoom}
                changeNumberOfTeams={changeNumberOfTeams}
                makeGameRoom={makeGameRoom}
                numberOfTeams={numberOfTeams}
                sendTestQuestion={sendTestQuestion}
                deleteGameRoom={deleteGameRoom}
              />
            )}
          />
          <Route
            path="/join"
            render={props => (
              <Player
                {...props}

                card={card}
                teamColor={teamColor}
                gotNameAndInRoom={gotNameAndInRoom}

                setRoomInput={setRoomInput}

                teamOptions={teamOptions}
                gameMessage={gameMessage}
                handleChange={handleChange}
                roomInput={roomInput}
                enterGameRoom={enterGameRoom}
                joinTeam={joinTeam}
                sendAnswerToServer={sendAnswerToServer}
              />
            )}
          />
        </div>
      </Router>
    </div>
  );
}

export default App;
