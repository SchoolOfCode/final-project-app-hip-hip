import React from "react";
import reactDOM from "react-dom";

import css from "./Game.module.css";

class Instruction extends React.Component {
	render() {
		return reactDOM.createPortal(
			<div onClick={this.props.onClose} className={css.container}>
				<div
					onClick={event => {
						event.stopPropagation();
					}}
					className={css.instruction}
				>
					<h2>Correlate Game Instructions</h2>
					<p>
						Collaborate with your fellow players to score points. If you have
						trouble connecting please refresh.
					</p>
					<button onClick={this.props.onClose}>Close</button>
				</div>
			</div>,
			document.body
		);
	}
}

export default Instruction;
