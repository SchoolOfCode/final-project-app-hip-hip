import React, { useState } from "react";

import EnterRoom from "../EnterRoom";
import JoinTeam from "../JoinTeam";
import Card from "../Card";

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
  setRoomInput
}) {
  const [hasJoinedTeam, setHasJoinedTeam] = useState(false);

  return (
    <div>
      <h3 style={{ backgroundColor: teamColor }}>{gameMessage}</h3>
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
      <br />
      {card.gotCard && (
        <Card card={card} sendAnswerToServer={sendAnswerToServer} />
      )}
    </div>
  );
}

export default Player;
