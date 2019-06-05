import React from "react";
import EndPageTeams from "../../../Components/EndPageTeams";

export default function({ joinedRoom }) {
  return (
    <div>
      <h2>And the winners are...</h2>
      <br />
      <EndPageTeams {...joinedRoom} />
    </div>
  );
}
