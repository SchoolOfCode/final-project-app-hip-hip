import React, { useEffect } from "react";

import EndPageTeams from "../../../Components/EndPageTeams";
import css from "./EndPage.module.css";

import useAudio from "../../../Hooks/UseAudio";

export default function({ joinedRoom }) {
	const [playing, toggle] = useAudio(
		`${process.env.PUBLIC_URL}/music/endPage.mp3`
	);

	useEffect(() => {
		toggle();
	}, []);

	return (
		<div>
			<h2 className={css.title}>And the winners are...</h2>
			<br />
			<EndPageTeams {...joinedRoom} />
		</div>
	);
}
