import React from "react";
import PictureCard from "../../../Components/PictureCard";
export default function({
	pictureUrl,
	pictureAnswer,
	sendLivePictureAnswer,
	gameMessage,
	isSubmitAllowed,
	submitTeamAnswer,
	isTeamCaptain,
	submitPictureAnswer
}) {
	function handleChange(e) {
		sendLivePictureAnswer(e.target.value);
	}

	return (
		<div>
			<h3>{gameMessage}</h3>
			<div>
				<input type="text" value={pictureAnswer} onChange={handleChange} />
				{isTeamCaptain && <button onClick={submitPictureAnswer}>submit</button>}
			</div>
			<PictureCard pictureUrl={pictureUrl} />
		</div>
	);
}
