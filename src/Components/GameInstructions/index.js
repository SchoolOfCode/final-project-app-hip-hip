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
                        So the aim of the game is to order your phone, so that the answers
                        are in the right order when everyone submits. </p>
                    <button onClick={this.props.onClose}>Close</button>
                </div>
            </div>,
            document.body
        );
    }
}

export default Instruction;