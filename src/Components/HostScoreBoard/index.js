import React from "react";
import css from "./HostScoreBoard.module.css";
import RoomNumberBox from "../../Components/RoomNumberBox";

export default function({ joinedRoom }) {
	return (
		<div>
			{joinedRoom.teamsArray.map((color, i) => (
				<div
					key={i}
					style={{ backgroundColor: color }}
					className={css.gridItem}
				>
					<h3>{color}</h3>
					<p>{joinedRoom.scoresTotal[color]}</p>
				</div>
			))}

			<RoomNumberBox joinedRoom={joinedRoom.id} />
		</div>
	);
}
