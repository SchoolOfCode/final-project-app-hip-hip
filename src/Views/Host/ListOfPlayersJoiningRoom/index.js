import React from "react";

// import TeamBoxes from "../../../Components/HostTeamJoiningBoxes";
import CorrelateLogo from "../../../Components/Branding";

import PhoneIcon from "../../../Components/PhoneIcon";
import css from "./ListOfPlayersJoiningRoom.module.css";

const defaultPlayers = [
	{ name: "poo po  poop" },
	{ name: "greg" },
	{ name: "benjamin" },
	{ name: "greg" },
	{ name: "poo po  poop" },
	{ name: "greg" },
	{ name: "benjamin" },
	{ name: "greg" },
	{ name: "poo po  poop" },
	{ name: "greg" },
	{ name: "benjamin" },
	{ name: "greg" },
	{ name: "poo po  poop" },
	{ name: "greg" },
	{ name: "benjamin" },
	{ name: "greg" },
	{ name: "poo po  poop" },
	{ name: "greg" },
	{ name: "benjamin" },
	{ name: "greg" }
];

function ListOfPlayersView({ joinedRoom, deleteGameRoom, startGame }) {
	const players = getPlayers();

	function getPlayers() {
		if (joinedRoom.players) {
			return joinedRoom.players;
		} else {
			return defaultPlayers;
		}
	}

	return (
		<main>
			<CorrelateLogo />
			<div className={css.roomCodeContainer}>
				<p className={css.p1}>Room Code:</p>
				<p className={css.p2}>{joinedRoom.id}</p>
			</div>
			<div className={css.buttonContainer}>
				<button className={css.startGame} onClick={startGame}>
					Start Game
				</button>

				<button className={css.deleteRoom} onClick={deleteGameRoom}>
					Delete Room
				</button>
			</div>
			<div className={css.playersList}>
				{players.map(({ name }) => (
					<PhoneIcon name={name} />
				))}
			</div>
		</main>
	);
}

export default ListOfPlayersView;
