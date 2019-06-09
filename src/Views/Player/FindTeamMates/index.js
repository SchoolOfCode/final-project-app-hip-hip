import React from "react";
import phone from "./phone.png";
import css from "./FindTeamMates.module.css";

function FindTeamMates({ teamColor, gameMessage }) {
	return (
		<div className={css.container} style={{ backgroundColor: teamColor }}>
			<div className={css.phoneWrapper}>
				<img className={css.phone} src={phone} />
				<img className={css.phone} src={phone} />
				<img className={css.phone} src={phone} />
				<img className={css.phone} src={phone} />
			</div>
			<p className={css.text}>{gameMessage}</p>
		</div>
	);
}

export default FindTeamMates;
