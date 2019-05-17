import React from "react";

import EnterRoom from "../../../Components/EnterRoom";

export default function({ enterGameRoom, roomInput, setRoomInput }) {
  return (
    <div>
      <EnterRoom
        enterGameRoom={enterGameRoom}
        roomInput={roomInput}
        setRoomInput={setRoomInput}
      />
    </div>
  );
}
