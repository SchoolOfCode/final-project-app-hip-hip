import React from "react";
import Keypad from "../Keypad";

export default function({ enterGameRoom, roomInput, setRoomInput }) {
  return (
    <div>
      <h3>enter room number</h3>
      <Keypad roomInput={roomInput} setRoomInput={setRoomInput} />

      <button
        onClick={() => {
          enterGameRoom();
        }}
      >
        enter room
      </button>
    </div>
  );
}
