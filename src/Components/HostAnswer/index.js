import React from "react";

import css from "./HostAnswer.module.css";

export default function({ joinedRoom }) {
	let correctOrder = joinedRoom.currentQuestionCards.sort(
		(a, b) => a.order - b.order
	);
	return (
		<div className={css.cardsWrapper}>
			{correctOrder.map((item, i) => (
				<div className={css.cards} key={i}>
					{item.text}
				</div>
			))}
		</div>
	);
}
