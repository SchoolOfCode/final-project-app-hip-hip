import React from "react";

import CorrelateLogo from "../../Components/Branding";
import RoomNumberPicker from "../../Components/RoomNumberPicker";
// import HostTeamJoiningBoxes from "../../Components/HostTeamJoiningBoxes";

export default function({ makeGameRoom }) {
  return (
    <div>
      <CorrelateLogo />
      <br />
      <RoomNumberPicker makeGameRoom={makeGameRoom} />
    </div>
  );
}
