import React, { useEffect, useState } from "react";

import { Route, Switch } from "react-router-dom";

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";

import withFirebaseAuth from "react-with-firebase-auth";

import HostRouter from "../HostRouter";
import PlayerRouter from "../PlayerRouter";

import GameInstructions from "../../Components/GameInstructions";

import useGame from "../../Hooks/UseGame";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
  twitterProvider: new firebase.auth.TwitterAuthProvider()
};

// const props = { user: { uid: Math.random() } };

// change to your ip address

function App(props) {
  const [game, setGame] = useGame({ ...props, firebaseAppAuth });

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <button
                onClick={() =>
                  setGame.controlRouteFromServer(
                    "/host/makeroom"
                  )
                }
              >
                make room
                            </button>
              <button
                onClick={() =>
                  setGame.controlRouteFromServer("/play")
                }
              >
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
              appProps={props}
              {...game}
              {...setGame}
            />
          )}
        />
        <Route
          path="/play"
          render={routerProps => (
            <PlayerRouter
              {...routerProps}
              appProps={props}
              {...game}
              {...setGame}
            />
          )}
        />
      </Switch>
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50vw",
          transform: "translateX(-50%)"
        }}
      >
        <button onClick={props.signOut}>sign out</button>
        <button onClick={setGame.setIsShow}>more info</button>
        {game.isShow && <GameInstructions onClose={setGame.toggle} />}
      </div>
    </>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
