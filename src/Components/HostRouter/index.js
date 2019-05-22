import React from "react";
import { Route, Switch } from "react-router-dom";

import MakeGameRoom from "../../Views/Host/MakeGameRoom";
import PopulateTeams from "../../Views/Host/PopulateTeams";
import Question from "../../Views/Host/Question";
import RoundCard from "../../Views/Host/RoundCard";
import ScoreView from "../../Views/Host/ScoreView";
import AnswerView from "../../Views/Host/AnswerView";

import Login from "../../Components/Login";
import RoomNumberBox from "../RoomNumberBox";

export default function({
  match,
  appProps,
  makeGameRoom,
  teamOptions,
  joinedRoom,
  deleteTeamMember,
  deleteGameRoom,
  startGame,
  gameMessage,
  serverCounter,
  roundNumber,
  teamsThatHaveSubmitted,
  abortGame
}) {
  return !appProps.user ? (
    <Login appProps={appProps} />
  ) : (
    <div>
      <Switch>
        <Route
          path={`${match.url}/makeroom`}
          render={() => <MakeGameRoom makeGameRoom={makeGameRoom} />}
        />
        <Route
          path={`${match.url}/teams`}
          render={() => (
            <PopulateTeams
              startGame={startGame}
              teamOptions={teamOptions}
              joinedRoom={joinedRoom}
              deleteTeamMember={deleteTeamMember}
              deleteGameRoom={deleteGameRoom}
            />
          )}
        />
        <Route
          path={`${match.url}/roundcard`}
          render={() => (
            <RoundCard roundNumber={roundNumber} gameMessage={gameMessage} />
          )}
        />

        <Route
          path={`${match.url}/question`}
          render={() => (
            <Question
              gameMessage={gameMessage}
              serverCounter={serverCounter}
              teamsThatHaveSubmitted={teamsThatHaveSubmitted}
            />
          )}
        />

        <Route
          path={`${match.url}/answer`}
          render={() => (
            <AnswerView joinedRoom={joinedRoom} gameMessage={gameMessage} />
          )}
        />

        <Route
          path={`${match.url}/score`}
          render={() => (
            <ScoreView teamOptions={teamOptions} joinedRoom={joinedRoom} />
          )}
        />

        <Route render={() => <div>componet not found...</div>} />
      </Switch>
      <RoomNumberBox joinedRoom={joinedRoom} />
      <button onClick={abortGame}>ABORT GAME</button>
    </div>
  );
}
