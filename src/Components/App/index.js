import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { BrowserRouter as Router, Route } from "react-router-dom";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";

import Host from "../Host";
import Player from "../Player";
import ScoreBoard from "../ScoreBoard";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
  twitterProvider: new firebase.auth.TwitterAuthProvider()
};

const props = { user: { uid: 12345 } };

// let socket = openSocket(process.env.REACT_APP_SERVER_URL); // change to your ip address

function App(props) {
  const [roomInput, setRoomInput] = useState("");
  const [joinedRoom, setJoinedRoom] = useState({});
  const [gameMessage, setGameMessage] = useState("");
  const [teamOptions, setTeamOptions] = useState([]);
  const [gotNameAndInRoom, setGotNameAndInRoom] = useState(false);
  const [teamColor, setTeamColor] = useState("orange");
  const [card, setCard] = useState({ gotCard: false });
  const [hasAnswered, setHasAnswered] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [liveCardUpdates, setliveCardUpdates] = useState({
    1: [],
    2: [],
    3: [],
    4: []
  });
  const [tidbit, setTidbit] = useState("");
  const [isSubmitAllowed, setIsSubmitAllowed] = useState(false);
  const [teamMessage, setTeamMessage] = useState("");
  const [teamsThatHaveSubmitted, setTeamsThatHaveSubmitted] = useState([]);
  const [hasJoinedTeam, setHasJoinedTeam] = useState(false);

  useEffect(() => {
    socket.on("whoAreYou", () => {
      if (props.user) {
        socket.emit("login", props.user.uid);
        console.log("logged in");
      } else {
        socket.emit("notGotIdYet");
      }
    });
    socket.on("rejoinMidGame", () => {
      setHasJoinedTeam(true);
    });
    socket.on("makeGameRoom", data => {
      console.log("new Game Room: ", data);
      setJoinedRoom(data);
      let options = Object.keys(data.teams);
      setTeamOptions(options);
    });
    socket.on("enterGameRoom", data => {
      console.log("Entered Room", data);
      let options = Object.keys(data.teams);
      setTeamOptions(options);
      setJoinedRoom(data);
      setGotNameAndInRoom(true);
    });
    socket.on("updateHostRoom", room => {
      setJoinedRoom(room);
    });
    // socket.on("showScore", data => {
    //   console.log("showScore", data);
    //   setScore(data);
    // });
    socket.on("gameMessage", message => {
      setGameMessage(message);
    });
    socket.on("teamColor", color => setTeamColor(color));
    socket.on("cardMessage", serverCard => {
      setCard({ gotCard: true, ...serverCard });
      setHasAnswered(false);
      setHasSubmitted(false);
      setIsSubmitAllowed(false);
      setliveCardUpdates({
        1: [],
        2: [],
        3: [],
        4: []
      });
      console.log(serverCard);
    });
    socket.on("updateCardOptions", cards => {
      if (cards) {
        setliveCardUpdates(cards);
      }
      console.log("app live card updates", cards);
    });
    socket.on("tidbit", bit => setTidbit(bit));
    socket.on("scoreMessage", score => console.log("scoreMessage", score));
    socket.on("submitAllowed", boolean => setIsSubmitAllowed(boolean));
    socket.on("scoreUpdateMessage", message => setTeamMessage(message));
    socket.on("teamHasSubmitted", () => setHasSubmitted(true));
    socket.on("liveTeamSubmitUpdate", team =>
      setTeamsThatHaveSubmitted([...teamsThatHaveSubmitted, team])
    );
  }, []);

  useEffect(() => {
    !socket.connected ? console.log("discconected") : console.log("connected");
  }, [socket.connected]);

  useEffect(() => {
    props.user && console.log("user", props.user.uid);
    props.user && socket.emit("login", props.user.uid);
  }, [props.user]);

  function getCurrentScore() {
    socket.emit("getCurrentScore", joinedRoom.id);
  }

  function makeGameRoom(numberOfTeams) {
    socket.emit("makeGameRoom", { numberOfTeams, uid: props.user.uid });
  }
  function enterGameRoom() {
    socket.emit("enterGameRoom", { roomId: roomInput, uid: props.user.uid });
  }

  function joinTeam(team, name) {
    socket.emit("joinTeam", {
      roomId: joinedRoom.id,
      team,
      name,
      uid: props.user.uid
    });
  }

  function startGame() {
    socket.emit("startGame", joinedRoom.id);
  }

  function sendNextQuestion() {
    socket.emit("sendNextQuestion", joinedRoom.id);
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

  function submitTeamAnswer() {
    socket.emit("submitTeamAnswer", { roomId: joinedRoom.id, team: teamColor });
  }

  function sendliveCardUpdates(answer, card) {
    socket.emit("updateCardOptions", {
      answer,
      cardText: card.text,
      correctAnswer: card.order,
      roomId: joinedRoom.id,
      team: teamColor
    });
  }

  function DeleteTeamMember(i, team) {
    socket.emit("removeUser", {
      roomId: joinedRoom.id,
      team,
      uid: props.user.uid,
      i
    });
  }

  return (
    <div>
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={routerProps => (
              <Host
                {...routerProps}
                setTeamsThatHaveSubmitted={setTeamsThatHaveSubmitted}
                tidbit={tidbit}
                startGame={startGame}
                gameMessage={gameMessage}
                joinedRoom={joinedRoom}
                makeGameRoom={makeGameRoom}
                sendNextQuestion={sendNextQuestion}
                deleteGameRoom={deleteGameRoom}
                teamOptions={teamOptions}
                getCurrentScore={getCurrentScore}
                appProps={props}
                DeleteTeamMember={DeleteTeamMember}
                teamsThatHaveSubmitted={teamsThatHaveSubmitted}
              />
            )}
          />
          <Route
            path="/join"
            render={routerProps => (
              <Player
                {...routerProps}
                hasJoinedTeam={hasJoinedTeam}
                setHasJoinedTeam={setHasJoinedTeam}
                teamMessage={teamMessage}
                submitTeamAnswer={submitTeamAnswer}
                isSubmitAllowed={isSubmitAllowed}
                appProps={props}
                card={card}
                sendliveCardUpdates={sendliveCardUpdates}
                teamColor={teamColor}
                liveCardUpdates={liveCardUpdates}
                hasAnswered={hasAnswered}
                hasSubmitted={hasSubmitted}
                setHasAnswered={setHasAnswered}
                setHasSubmitted={setHasSubmitted}
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
          <Route
            path="/score"
            render={routerProps => (
              <ScoreBoard
                {...routerProps}
                teamOptions={teamOptions}
                joinedRoom={joinedRoom}
              />
            )}
          />
        </div>
      </Router>
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
