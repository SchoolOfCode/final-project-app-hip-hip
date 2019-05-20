import React from "react";

import Card from "../../../Components/Card";
import Timer from "../../../Components/CountdownTimer";

export default function({
  card,
  liveCardUpdates,
  sendliveCardUpdates,
  isSubmitAllowed,
  submitTeamAnswer,
  serverCounter,
  answerFeedback
}) {
  return (
    <div>
      <Card
        card={card}
        sendliveCardUpdates={sendliveCardUpdates}
        liveCardUpdates={liveCardUpdates}
        isSubmitAllowed={isSubmitAllowed}
        submitTeamAnswer={submitTeamAnswer}
        answerFeedback={answerFeedback}
      />

      <Timer counter={serverCounter.round} />
    </div>
  );
}
