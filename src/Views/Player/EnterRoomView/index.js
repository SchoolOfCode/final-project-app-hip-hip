import React from "react";
import css from "./EnterRoomView.module.css";

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
        </>
    );
}
