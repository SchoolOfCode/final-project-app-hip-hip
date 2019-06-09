import React from "react";

import GameInstructions from "../../../Components/GameInstructions";

import css from "./EnterRoomView.module.css";

export default function({
	enterGameRoom,
	roomInput,
	setRoomInput,
	nameInput,
	setNameInput,
	appProps,
	setIsShow,
	isShow,
	toggle
}) {
	function handleNumberChange(e) {
		if (e.target.value.length <= 4) {
			setRoomInput(e.target.value);
		}
	}

	return (
		<>
			<div className={css.welcomeMessage}>
				Welcome to Collaborate <br />
				Please enter your name and the room number.
			</div>
			<div className={css.container}>
				<input
					className={css.text}
					type="text"
					placeholder="name"
					value={nameInput}
					onChange={e => setNameInput(e.target.value)}
				/>
				<input
					className={css.number}
					type="number"
					placeholder="room number"
					value={roomInput}
					onChange={handleNumberChange}
				/>
			</div>
			<div>
				<button className={css.enter} onClick={enterGameRoom}>
					Enter Room
				</button>
			</div>
			<div
				style={{
					position: "absolute",
					bottom: 20,
					left: "50vw",
					transform: "translateX(-50%)"
				}}
			>
				<button onClick={appProps.signOut}>sign out</button>
				<button onClick={setIsShow}>more info</button>
				{isShow && <GameInstructions onClose={toggle} />}
			</div>
		</>
	);
}
