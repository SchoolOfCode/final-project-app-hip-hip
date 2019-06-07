import React, { useEffect } from "react";
import RoundCard from "../../../Components/Rounds/index";
import useAudio from "../../../Hooks/UseAudio";

export default function({ gameMessage, roundNumber }) {
	const [playing, toggle] = useAudio(
		`${process.env.PUBLIC_URL}/music/gong.mp3`
	);
	useEffect(() => {
		toggle();
	}, []);

	return (
		<div>
			<RoundCard gameMessage={gameMessage} roundNumber={roundNumber} />
		</div>
	);
}
