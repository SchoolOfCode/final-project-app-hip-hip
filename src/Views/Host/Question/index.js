import React, { useEffect } from "react";

import Timer from "../../../Components/CountdownTimer";
import useAudio from "../../../Hooks/UseAudio";
import css from "./Question.module.css";
import bot2 from "../../../Components/images/bot2.png";
import padlock from "./padlock.svg";
import cn from "classnames";

export default function({
	gameMessage,
	serverCounter,
	teamsThatHaveSubmitted,
	joinedRoom,
	questionType
}) {
	const [playing, toggle] = useAudio(
		`${process.env.PUBLIC_URL}/music/${
			questionType === "order" ? "orderRound.mp3" : "pictureRound.mp3"
		}`
	);
	// const teamsArray = ["red", "blue"];
	useEffect(() => {
		toggle();
	}, []);

	return (
		<div>
			<img className={(css.bot2 = " " + css.bot2After)} src={bot2} alt="bot2" />
			<h1 className={css.question}>{gameMessage}</h1>
			{serverCounter.question === 0 ? (
				<>
					<h2 className={css.letsCollaborate}>COLLABORATE!</h2>
					<Timer counter={serverCounter.round} />
				</>
			) : (
				<h2 className={css.letsCollaborate}> {serverCounter.question}</h2>
			)}

			{serverCounter.question === 0 && (
				<div className={css.teamBoxContainer}>
					{joinedRoom.teamsArray.map((team, i) => (
						<div
							style={{ backgroundColor: team }}
							className={cn(
								css.teamBox,
								!teamsThatHaveSubmitted.some(item => item === team) &&
									css.wiggle
							)}
							key={i}
						>
							{teamsThatHaveSubmitted.some(item => item === team) && (
								<img className={css.padlock} src={padlock} />
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
