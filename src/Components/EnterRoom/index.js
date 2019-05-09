import React from "react";
import Keypad from "../Keypad";
import css from "./enterroom.module.css";

export default function({ enterGameRoom, roomInput, setRoomInput }) {
  return (
    <div>
      <h3>enter room number</h3>
      <Keypad roomInput={roomInput} setRoomInput={setRoomInput} />

      <button
      className={css.enterRoom}
        onClick={() => {
          enterGameRoom();
        }}
      >
        enter room
      </button>
    </div>
  );
}
