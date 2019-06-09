import React from "react";
import HostAnswer from "../../../Components/HostAnswer";
import css from "./PictureAnswerView.module.css";

export default function({ joinedRoom, gameMessage, pictureUrl }) {
	return (
		<div>
			<h2 className={css.question}>{gameMessage}</h2>

			<img className={css.picture} src={pictureUrl} alt="not telling..." />
		</div>
	);
}
