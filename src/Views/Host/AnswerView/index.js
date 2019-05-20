import React from "react";
import HostAnswer from "../../../Components/HostAnswer";

export default function({ joinedRoom }) {
  return (
    <div>
      <h1>the correct answer was...</h1>
      <HostAnswer joinedRoom={joinedRoom} />
    </div>
  );
}
