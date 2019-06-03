import React from "react";

import EnterRoom from "../../../Components/EnterRoom";

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
		<div>
			{/* <EnterRoom
        enterGameRoom={enterGameRoom}
        roomInput={roomInput}
        setRoomInput={setRoomInput}
      /> */}

			<input
				type="number"
				placeholder="room number"
				value={roomInput}
				onChange={handleNumberChange}
			/>

			<input
				type="text"
				placeholder="name"
				value={nameInput}
				onChange={e => setNameInput(e.target.value)}
			/>
			<button onClick={enterGameRoom}>enter room</button>
		</div>
	);
}
