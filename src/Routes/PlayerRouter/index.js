import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../../Components/Login";
import EnterRoomView from "../../Views/Player/EnterRoomView";
import JoinTeamView from "../../Views/Player/JoinTeamView";
import Holding from "../../Views/Player/HoldingPageView";
import CardView from "../../Views/Player/CardView";
import PlayerScoreView from "../../Views/Player/PlayerScore";
import PictureRoundView from "../../Views/Player/PictureRoundView";
import RoundView from "../../Views/Player/RoundView";
import GameMessageView from "../../Views/Player/GameMessageView";

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
  gameMessage,
  pictureUrl,
  pictureAnswer,
  sendLivePictureAnswer,
  roundNumber,
  nameInput,
  setNameInput,
  isTeamCaptain,
  submitPictureAnswer,
  setIsSubmitAllowed
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
            nameInput={nameInput}
            setNameInput={setNameInput}
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
            isTeamCaptain={isTeamCaptain}
            setIsSubmitAllowed={setIsSubmitAllowed}
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
      <Route
        path={`${match.url}/picture`}
        render={() => (
          <PictureRoundView
            pictureUrl={pictureUrl}
            pictureAnswer={pictureAnswer}
            sendLivePictureAnswer={sendLivePictureAnswer}
            gameMessage={gameMessage}
            isSubmitAllowed={isSubmitAllowed}
            submitTeamAnswer={submitTeamAnswer}
            submitPictureAnswer={submitPictureAnswer}
            isTeamCaptain={isTeamCaptain}
            setIsSubmitAllowed={setIsSubmitAllowed}
          />
        )}
      />
      <Route
        path={`${match.url}/round`}
        render={() => (
          <RoundView roundNumber={roundNumber} gameMessage={gameMessage} />
        )}
      />
      <Route
        path={`${match.url}/message`}
        render={() => <GameMessageView gameMessage={gameMessage} />}
      />

      <Route render={() => <div>component not found...</div>} />
    </Switch>
  );
}
