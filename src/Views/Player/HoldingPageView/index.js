import React from "react";

export default function({ joinedRoom, teamColor }) {
  return (
    <div>
      YAY! you are on the {teamColor} team in {joinedRoom.id} so just chill
      whilst everyone else gets their act together
    </div>
  );
}
