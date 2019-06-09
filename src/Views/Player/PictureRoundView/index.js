import React from "react";
import PictureCard from "../../../Components/PictureCard";
export default function({
	pictureUrl,
	pictureAnswer,
	sendLivePictureAnswer,
	gameMessage,
	isSubmitAllowed,
	isTeamCaptain,
	submitPictureAnswer,
	setIsSubmitAllowed,
	teamColor
}) {
	function handleChange(e) {
		sendLivePictureAnswer(e.target.value);
	}

	return (
		<div>
			<h3>{gameMessage}</h3>
			<div>
				<PictureCard pictureUrl={pictureUrl} teamColor={teamColor} />
			</div>

			{isTeamCaptain && isSubmitAllowed && (
				<div>
					<input type="text" value={pictureAnswer} onChange={handleChange} />
					<button
						onClick={() => {
							submitPictureAnswer();
							setIsSubmitAllowed(false);
						}}
					>
						submit
					</button>
				</div>
			)}
		</div>
	);
}
