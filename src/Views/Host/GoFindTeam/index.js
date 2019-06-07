import React, { useEffect } from "react";

import HostTeamJoiningBoxes from "../../../Components/HostTeamJoiningBoxes";

import css from "./GoFindTeam.module.css";

import useAudio from "../../../Hooks/UseAudio";

function GoFindTeam({ joinedRoom }) {
	const [playing, toggle] = useAudio(
		`${process.env.PUBLIC_URL}/music/goFindTeams.mp3`
	);
	useEffect(() => {
		toggle();
	}, []);

	return (
		<div className={css.wrapper}>
			<h1 className={css.title} data-text="Find Your Team Mates!">
				Find Your Team Mates!
			</h1>
			<div className={css.boxes}>
				<HostTeamJoiningBoxes {...joinedRoom} />
			</div>
		</div>
	);
}

export default GoFindTeam;
