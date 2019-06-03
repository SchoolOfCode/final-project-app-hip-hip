import React from "react";
import HostAnswer from "../../../Components/HostAnswer";
import css from "./AnswerView.module.css";

export default function({ joinedRoom, gameMessage }) {
	return (
		<div>
			<h2 className={css.question}>{gameMessage}</h2>
			<h1>The correct answer is...</h1>
			<HostAnswer joinedRoom={joinedRoom} />
		</div>
	);
}
