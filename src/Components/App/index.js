import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { Route, Switch } from "react-router-dom";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";

import Host from "../Host";
import Player from "../Player";
import ScoreBoard from "../ScoreBoard";
import Card from "../Card";
import HostRouter from "../HostRouter";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
  twitterProvider: new firebase.auth.TwitterAuthProvider()
};

// const props = { user: { uid: Math.random() } };

let socket = openSocket(process.env.REACT_APP_SERVER_URL); // change to your ip address

function App(props) {
  const [uid, setUid] = useState("");
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
  const [serverCounter, setServerCounter] = useState(3);

  useEffect(() => {
    socket.on("pageNavigation", path => controlRouteFromServer(path));

    socket.on("messageAndNav", data => {
      console.log("got mes and nav");
      setGameMessage(data.message);
      controlRouteFromServer(data.path);
    });

    socket.on("whoAreYou", () => {
      console.log("who am i?");
      if (firebaseAppAuth.currentUser) {
        socket.emit("login", firebaseAppAuth.currentUser.uid);
        console.log("logged in");
      } else {
        socket.emit("notGotIdYet");
        console.log(firebaseAppAuth.currentUser);
        console.log("not logged in yet");
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
      controlRouteFromServer("/host/teams");
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
    socket.on("liveTeamSubmitUpdate", teams =>
      setTeamsThatHaveSubmitted(teams)
    );
    socket.on("updateCounter", count => setServerCounter(count));
  }, []);

  // useEffect(() => {
  //   !socket.connected ? console.log("discconected") : console.log("connected");
  // }, [socket.connected]);

  // useEffect(() => {
  //   props.user && console.log("user", props.user.uid);
  //   props.user && socket.emit("login", props.user.uid);
  //   props.user && setUid(props.user.uid);
  // }, [props.user]);

  useEffect(() => {
    setUid(firebaseAppAuth.currentUser);
    if (firebaseAppAuth.currentUser) {
      socket.emit("login", firebaseAppAuth.currentUser.uid);
      console.log("logged in");
    } else {
      socket.emit("notGotIdYet");
      console.log(firebaseAppAuth.currentUser);
      console.log("not logged in yet");
    }
  }, []);

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
    console.log("startgame message sent");
    socket.emit("startGame", joinedRoom.id);
  }

  function sendNextQuestion() {
    socket.emit("sendNextQuestion", joinedRoom.id);
  }

  function deleteGameRoom() {
    socket.emit("deleteGameRoom", joinedRoom.id);
    setJoinedRoom({});
    setTeamOptions([]);
    controlRouteFromServer("/host/makeroom");
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

  function deleteTeamMember(i, team) {
    socket.emit("removeUser", {
      roomId: joinedRoom.id,
      team,
      uid: props.user.uid,
      i
    });
  }

  function controlRouteFromServer(path) {
    try {
      props.history.replace(path);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Switch>
        <Route
          path="/host"
          render={routerProps => (
            <HostRouter
              {...routerProps}
              card={card}
              appProps={props}
              startGame={startGame}
              joinedRoom={joinedRoom}
              makeGameRoom={makeGameRoom}
              deleteGameRoom={deleteGameRoom}
              teamOptions={teamOptions}
              deleteTeamMember={deleteTeamMember}
              gameMessage={gameMessage}
              serverCounter={serverCounter}
            />
          )}
        />
        <Route
          path="/oldhost"
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
              deleteTeamMember={deleteTeamMember}
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
      </Switch>
      <button onClick={props.signOut}>sign out</button>
    </>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
