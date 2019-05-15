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


// const props = { user: { uid: Math.random() } };

const socket = openSocket(process.env.REACT_APP_SERVER_URL); // change to your ip address


function App() {
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

  useEffect(() => {
    props.user && socket.emit("login", props.user.uid);
  });

  useEffect(() => {
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
    const [tidbit, setTidbit] = useState("");
    const [isSubmitAllowed, setIsSubmitAllowed] = useState(false);
    const [teamMessage, setTeamMessage] = useState("");
    const [teamsThatHaveSubmitted, setTeamsThatHaveSubmitted] = useState([]);

    useEffect(() => {
        props.user && socket.emit("login", props.user.uid);
    });


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
    );
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth
})(App);
