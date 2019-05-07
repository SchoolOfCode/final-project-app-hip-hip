import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Host from "../Host";
import Player from "../Player";

const socket = openSocket("192.168.0.74:6001");

function App() {
  const [roomInput, setRoomInput] = useState("");
  const [joinedRoom, setJoinedRoom] = useState({});
  const [gameMessage, setGameMessage] = useState("");
  const [teamOptions, setTeamOptions] = useState([]);
  const [gotNameAndInRoom, setGotNameAndInRoom] = useState(false);
  const [teamColor, setTeamColor] = useState("orange");
  const [card, setCard] = useState({ gotCard: false });

  useEffect(() => {
    socket.on("makeGameRoom", data => {
      console.log("new Game Room: ", data);
      setJoinedRoom(data);
      let options = Object.keys(data.teams);
      setTeamOptions(options);
    });
    socket.on("enterGameRoom", data => {
      console.log(data);
      let options = Object.keys(data.teams);
      setTeamOptions(options);
      setJoinedRoom(data);
      setGotNameAndInRoom(true);
    });
    socket.on("updateHostRoom", room => {
      setJoinedRoom(room);
    });
    socket.on("gameMessage", message => {
      setGameMessage(message);
    });
    socket.on("teamColor", color => setTeamColor(color));
    socket.on("cardMessage", serverCard =>
      setCard({ gotCard: true, ...serverCard })
    );
  }, []);

  function makeGameRoom(numberOfTeams) {
    socket.emit("makeGameRoom", numberOfTeams);
  }
  function enterGameRoom() {
    socket.emit("enterGameRoom", { room: roomInput });
  }

  function joinTeam(team, name) {
    socket.emit("joinTeam", {
      joinedRoom: joinedRoom.id,
      team,
      name
    });
  }

  function startGame() {
    socket.emit("startGame", joinedRoom.id);
  }

  function sendTestQuestion() {
    socket.emit("sendTestQuestion", joinedRoom.id);
  }

  function deleteGameRoom() {
    socket.emit("deleteGameRoom", joinedRoom.id);
    setJoinedRoom({});
    setTeamOptions([]);
  }

  function sendAnswerToServer(answerNumber) {
    socket.emit("sendAnswer", {
      roomId: joinedRoom.id,
      team: teamColor,
      playersAnswer: answerNumber,
      correctAnswer: card.order
    });
  }

  return (
    <div>
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={props => (
              <Host
                {...props}
                startGame={startGame}
                gameMessage={gameMessage}
                joinedRoom={joinedRoom}
                makeGameRoom={makeGameRoom}
                sendTestQuestion={sendTestQuestion}
                deleteGameRoom={deleteGameRoom}
                teamOptions={teamOptions}
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
