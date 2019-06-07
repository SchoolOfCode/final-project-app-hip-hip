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
	submitPictureAnswer,
	setIsSubmitAllowed
}) {
	function handleChange(e) {
		sendLivePictureAnswer(e.target.value);
	}

	return (
		<div>
			<h3>{gameMessage}</h3>
			<div>
				<PictureCard pictureUrl={pictureUrl} />

				{isTeamCaptain && isSubmitAllowed && (
					<>
						<input type="text" value={pictureAnswer} onChange={handleChange} />
						<button
							onClick={() => {
								submitPictureAnswer();
								setIsSubmitAllowed(false);
							}}
						>
							submit
						</button>
					</>
				)}
			</div>
		</div>
	);
}
