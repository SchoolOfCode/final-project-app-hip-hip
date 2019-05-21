import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../../Components/Login";
import EnterRoomView from "../../Views/Player/EnterRoomView";
import JoinTeamView from "../../Views/Player/JoinTeamView";
import Holding from "../../Views/Player/HoldingPageView";
import CardView from "../../Views/Player/CardView";
import PlayerScoreView from "../../Views/Player/PlayerScore";

export default function({
  match,
  appProps,
  enterGameRoom,
  roomInput,
  setRoomInput,
  joinTeam,
  teamOptions,
  joinedRoom,
  teamColor,
  submitTeamAnswer,
  isSubmitAllowed,
  sendliveCardUpdates,
  liveCardUpdates,
  card,
  serverCounter,
  answerFeedback,
  showPoints,
  gameMessage
}) {
  return !appProps.user ? (
    <Login appProps={appProps} />
  ) : (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={() => (
          <EnterRoomView
            enterGameRoom={enterGameRoom}
            roomInput={roomInput}
            setRoomInput={setRoomInput}
          />
        )}
      />
      <Route
        path={`${match.url}/team`}
        render={() => (
          <JoinTeamView joinTeam={joinTeam} teamOptions={teamOptions} />
        )}
      />
      <Route
        path={`${match.url}/holding`}
        render={() => <Holding joinedRoom={joinedRoom} teamColor={teamColor} />}
      />
      <Route
        path={`${match.url}/card`}
        render={() => (
          <CardView
            serverCounter={serverCounter}
            card={card}
            sendliveCardUpdates={sendliveCardUpdates}
            liveCardUpdates={liveCardUpdates}
            submitTeamAnswer={submitTeamAnswer}
            isSubmitAllowed={isSubmitAllowed}
            answerFeedback={answerFeedback}
            showPoints={showPoints}
          />
        )}
      />
      <Route
        path={`${match.url}/score`}
        render={() => (
          <PlayerScoreView
            joinedRoom={joinedRoom}
            teamColor={teamColor}
            gameMessage={gameMessage}
          />
        )}
      />

      <Route render={() => <div>component not found...</div>} />
    </Switch>
  );
}
