import React from "react";

export default function({ joinedRoom, teamColor, gameMessage }) {
  const style = { backgroundColor: teamColor };
  console.log("joined room in phone score board", joinedRoom);

  return <div style={style}>{gameMessage}</div>;
}
