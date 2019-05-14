import React, { useState } from "react";

import EnterRoom from "../EnterRoom";
import JoinTeam from "../JoinTeam";
import Card from "../Card";
import Login from "../Login";

function Player({
  roomInput,
  enterGameRoom,
  joinTeam,
  gameMessage,
  teamOptions,
  gotNameAndInRoom,
  teamColor,
  sendAnswerToServer,
  card,
  setRoomInput,
  setHasAnswered,
  setHasSubmitted,
  hasAnswered,
  hasSubmitted,
  liveCardUpdates,
  sendliveCardUpdates,
  getRoundScore,
  appProps,
  isSubmitAllowed,
  submitTeamAnswer
}) {
  const [hasJoinedTeam, setHasJoinedTeam] = useState(false);

  return (
    <>
      {!appProps.user ? (
        <Login appProps={appProps} />
      ) : (
        <div>
          {!card.gotCard && (
            <h3 style={{ backgroundColor: teamColor }}>{gameMessage}</h3>
          )}
          {!gotNameAndInRoom ? (
            <EnterRoom
              enterGameRoom={enterGameRoom}
              roomInput={roomInput}
              setRoomInput={setRoomInput}
            />
          ) : (
            <>
              {!hasJoinedTeam && (
                <JoinTeam
                  setHasJoinedTeam={setHasJoinedTeam}
                  joinTeam={joinTeam}
                  teamOptions={teamOptions}
                />
              )}
            </>
          )}
          {card.gotCard && (
            <Card
              submitTeamAnswer={submitTeamAnswer}
              isSubmitAllowed={isSubmitAllowed}
              sendliveCardUpdates={sendliveCardUpdates}
              liveCardUpdates={liveCardUpdates}
              hasAnswered={hasAnswered}
              hasSubmitted={hasSubmitted}
              setHasAnswered={setHasAnswered}
              setHasSubmitted={setHasSubmitted}
              card={card}
              sendAnswerToServer={sendAnswerToServer}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Player;
