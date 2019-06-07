import React from "react";

import css from "./EnterRoomView.module.css";
import cn from "classnames";

export default function({
	enterGameRoom,
	roomInput,
	setRoomInput,
	nameInput,
	setNameInput
}) {
	function handleNumberChange(e) {
		if (e.target.value.length <= 4) {
			setRoomInput(e.target.value);
		}
	}

	return (
		<div className={css.container}>
			<h1>Welcome to Collaborate</h1>
			<input
				className={css.inputs}
				type="number"
				placeholder="room number"
				value={roomInput}
				onChange={handleNumberChange}
			/>

			<input
				className={css.inputs}
				type="text"
				placeholder="name"
				value={nameInput}
				onChange={e => setNameInput(e.target.value)}
			/>
			<button className={cn(css.inputs, css.enterRoom)} onClick={enterGameRoom}>
				join
			</button>
		</div>
	);
}
