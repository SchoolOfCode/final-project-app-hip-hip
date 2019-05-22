import React from "react";
import PictureCard from "../../../Components/PictureCard";
export default function({
  pictureUrl,
  pictureAnswer,
  sendLivePictureAnswer,
  gameMessage,
  isSubmitAllowed,
  submitTeamAnswer
}) {
  function handleChange(e) {
    sendLivePictureAnswer(e.target.value);
  }

  return (
    <div>
      <h3>{gameMessage}</h3>
      <div>
        <input type="text" value={pictureAnswer} onChange={handleChange} />
        {isSubmitAllowed && <button onClick={submitTeamAnswer}>submit</button>}
      </div>
      <PictureCard pictureUrl={pictureUrl} />
    </div>
  );
}
