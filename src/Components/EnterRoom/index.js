import React, { useState } from "react";
import Keypad from "../Keypad";

export default function({ enterGameRoom, roomInput, setRoomInput }) {
  const [name, setName] = useState("");
  return (
    <div>
      <h3>enter room number and name</h3>
      <Keypad roomInput={roomInput} setRoomInput={setRoomInput} />

      <input
        type="text"
        placeholder="whats your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <button
        onClick={() => {
          enterGameRoom(name);
        }}
      >
        enter room
      </button>
    </div>
  );
}
