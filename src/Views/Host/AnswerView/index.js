import React from "react";
import CorrectAnswer from "../../../Components/CorrectAnswer";

export default function() {
  return (
    <div>
      <CorrectAnswer card={liveCardUpdates()} />
    </div>
  );
}
