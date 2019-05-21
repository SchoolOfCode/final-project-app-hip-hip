import React from "react";

import css from "./PlayerScore.module.css";

export default function() {
  return (
    <div className={css.textContainer}>
      <span>well done!</span>
      you may have scored some points
    </div>

// import PhoneScoreBoard from "../../../Components/PhoneScoreBoard";

// export default function({ joinedRoom, teamColor, gameMessage }) {
//   return (
//     <PhoneScoreBoard
//       joinedRoom={joinedRoom}
//       teamColor={teamColor}
//       gameMessage={gameMessage}
//     />

  );
}
