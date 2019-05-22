import React from "react";
import Keypad from "../Keypad";
import css from "./enterroom.module.css";

export default function({ enterGameRoom, roomInput, setRoomInput }) {
  return (
    <div>
      <h3 className={css.room}>ENTER ROOM NUMBER</h3>
      <Keypad roomInput={roomInput} setRoomInput={setRoomInput} />

      <button
        className={css.enterRoom}
        onClick={() => {
          enterGameRoom();
        }}
      >
        ENTER ROOM
      </button>
    </div>
  );
}
