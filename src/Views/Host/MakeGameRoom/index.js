import React from "react";

import CorrelateLogo from "../../../Components/Branding";
import GameInstructions from "../../../Components/GameInstructions";
import css from "./MakeGameRoom.module.css";

export default function({ makeGameRoom, isShow, toggle, appProps, setIsShow }) {
	return (
		<div>
			<div className={css.logo}>
				<CorrelateLogo />
			</div>
			<br />
			<button className={css.gameButton} onClick={makeGameRoom}>
				Create A Game Room
			</button>
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
		</div>
	);
}
