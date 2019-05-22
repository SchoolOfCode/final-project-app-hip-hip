import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { Route, Switch } from "react-router-dom";
import initialState from "./initialState";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";

import HostRouter from "../HostRouter";
import PlayerRouter from "../PlayerRouter";

import RoomNumberBox from "../RoomNumberBox";

import GameInstructions from "../GameInstructions";

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
  const [roomInput, setRoomInput] = useState("");
  const [joinedRoom, setJoinedRoom] = useState({});
  const [gameMessage, setGameMessage] = useState("");
  const [teamOptions, setTeamOptions] = useState([]);

  const [teamColor, setTeamColor] = useState("orange");
  const [card, setCard] = useState({ gotCard: false });
  const [liveCardUpdates, setliveCardUpdates] = useState(
    initialState.liveCardUpdates
  );
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
  const [answerFeedback, setAnswerFeedback] = useState(
    initialState.answerColors
  );
  const [showPoints, setShowPoints] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [pictureUrl, setPictureUrl] = useState("");

  useEffect(() => {
    socket.on("answerFeedback", data => {
      setAnswerFeedback(data.feedback);
      setShowPoints(true);
    });
    socket.on("pageNavigation", path => controlRouteFromServer(path));
    socket.on("roundHasFinished", ({ message }) => {
      controlRouteFromServer("/play/score");
      setGameMessage(message);
    });
    socket.on("messageAndNav", data => {
      console.log("message and nav", data.message);
      if (data.message) {
        setGameMessage(data.message);
      }

      if (data.roundNumber) {
        setRoundNumber(data.roundNumber);
      }
      controlRouteFromServer(data.path);
      setTeamsThatHaveSubmitted([]);
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
      controlRouteFromServer("/play/team");
    });
    socket.on("updateHostRoom", room => {
      setJoinedRoom(room);
    });
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
      setliveCardUpdates(initialState.liveCardUpdates);
      setAnswerFeedback(initialState.answerColors);
      setShowPoints(false);
      controlRouteFromServer("/play/card");
      console.log(serverCard);
    });
    socket.on("pictureMessage", ({ url }) => {
      setPictureUrl(url);
      controlRouteFromServer("/play/picture");
    });
    socket.on("updateCardOptions", cards => {
      if (cards) {
        setliveCardUpdates(cards);
      }
    });
    socket.on("tidbit", bit => setTidbit(bit));
    socket.on("scoreMessage", score => console.log("scoreMessage", score));
    socket.on("submitAllowed", boolean => setIsSubmitAllowed(boolean));
    socket.on("scoreUpdateMessage", message => setTeamMessage(message));
    socket.on("liveTeamSubmitUpdate", teams =>
      setTeamsThatHaveSubmitted(teams)
    );
    socket.on("updateCounter", count =>
      setServerCounter({ ...serverCounter, ...count })
    );
  }, []);

  useEffect(() => {
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
    socket.emit("submitTeamAnswer", {
      roomId: joinedRoom.id,
      team: teamColor
    });
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

  function toggle() {
    setIsShow(!isShow);
  }

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <button onClick={() => controlRouteFromServer("/host/makeroom")}>
                make room
              </button>
              <button onClick={() => controlRouteFromServer("/play")}>
                join room
              </button>
            </div>
          )}
        />

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
              teamsThatHaveSubmitted={teamsThatHaveSubmitted}
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
              answerFeedback={answerFeedback}
              showPoints={showPoints}
              gameMessage={gameMessage}
              pictureUrl={pictureUrl}
            />
          )}
        />
      </Switch>

      {/* <button onClick={props.signOut}>sign out</button> */}
      {/* <button onClick={abortGame}>QUIT</button> */}

      <button onClick={props.signOut}>sign out</button>

      <button onClick={abortGame}>QUIT</button>

      <button onClick={abortGame}>ABORT GAME</button>
      <br />
      <br />
      <br />
      <div>
        <button onClick={setIsShow}>Show</button>
        {isShow && <GameInstructions onClose={toggle} />}
      </div>

    </>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
