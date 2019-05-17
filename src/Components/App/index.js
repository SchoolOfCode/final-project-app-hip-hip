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
// import Card from "../Card";
import HostRouter from "../HostRouter";
import PlayerRouter from "../PlayerRouter";

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
  const [serverCounter, setServerCounter] = useState({
    question: 0,
    round: 0
  });
  const [roundNumber, setRoundNumber] = useState(0);

  useEffect(() => {
    socket.on("pageNavigation", path => controlRouteFromServer(path));
    socket.on("roundHasFinished", () => {
      controlRouteFromServer("/play/score");
    });
    socket.on("messageAndNav", data => {
      console.log("message and nav", data.message);
      setGameMessage(data.message);

      if (data.roundNumber) {
        setRoundNumber(data.roundNumber);
      }
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
      controlRouteFromServer("/play/team");
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
    socket.on("teamColor", color => {
      controlRouteFromServer("/play/holding");
      setTeamColor(color);
    });
    socket.on("cardMessage", serverCard => {
      setCard({ gotCard: true, ...serverCard });
      setIsSubmitAllowed(false);
      setliveCardUpdates({
        1: [],
        2: [],
        3: [],
        4: []
      });
      controlRouteFromServer("/play/card");
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
    socket.on("updateCounter", count =>
      setServerCounter({ ...serverCounter, ...count })
    );
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
    socket.emit("makeGameRoom", {
      numberOfTeams,
      uid: firebaseAppAuth.currentUser.uid
    });
  }
  function enterGameRoom() {
    socket.emit("enterGameRoom", {
      roomId: roomInput,
      uid: firebaseAppAuth.currentUser.uid
    });
  }

  function joinTeam(team, name) {
    socket.emit("joinTeam", {
      roomId: joinedRoom.id,
      team,
      name,
      uid: firebaseAppAuth.currentUser.uid
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
      uid: firebaseAppAuth.currentUser.uid,
      i
    });
  }

  function controlRouteFromServer(path) {
    try {
      props.history.push(path);
    } catch (err) {
      console.log(err);
    }
  }

  function abortGame() {
    socket.emit("abort", joinedRoom.id);
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
              roundNumber={roundNumber}
            />
          )}
        />
        <Route
          path="/play"
          render={routerProps => (
            <PlayerRouter
              {...routerProps}
              appProps={props}
              enterGameRoom={enterGameRoom}
              roomInput={roomInput}
              setRoomInput={setRoomInput}
              joinTeam={joinTeam}
              teamOptions={teamOptions}
              joinedRoom={joinedRoom}
              teamColor={teamColor}
              card={card}
              sendliveCardUpdates={sendliveCardUpdates}
              liveCardUpdates={liveCardUpdates}
              submitTeamAnswer={submitTeamAnswer}
              isSubmitAllowed={isSubmitAllowed}
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
          path="/oldjoin"
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
      <button onClick={abortGame}>ABORT GAME</button>
    </>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
