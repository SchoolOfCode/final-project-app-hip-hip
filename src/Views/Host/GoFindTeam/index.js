import React from "react";

import HostTeamJoiningBoxes from "../../../Components/HostTeamJoiningBoxes";

import css from "./GoFindTeam.module.css";

function GoFindTeam({ joinedRoom }) {
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
