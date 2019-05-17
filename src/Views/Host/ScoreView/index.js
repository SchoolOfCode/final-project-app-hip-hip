import React from "react";

import HostScoreBoard from "../../../Components/HostScoreBoard";
export default function({ teamOptions, joinedRoom }) {
  return (
    <div>
      <h1>the scores</h1>
      <HostScoreBoard teamOptions={teamOptions} joinedRoom={joinedRoom} />
    </div>
  );
}
