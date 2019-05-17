import React from "react";

import Card from "../../../Components/Card";

export default function({
  card,
  liveCardUpdates,
  sendliveCardUpdates,
  isSubmitAllowed,
  submitTeamAnswer,
  serverCounter
}) {
  return (
    <div>
      {serverCounter.round}
      <Card
        card={card}
        sendliveCardUpdates={sendliveCardUpdates}
        liveCardUpdates={liveCardUpdates}
        isSubmitAllowed={isSubmitAllowed}
        submitTeamAnswer={submitTeamAnswer}
      />
    </div>
  );
}