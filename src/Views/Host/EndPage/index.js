import React from "react";
import EndPage from "../../../Components/EndPage";

export default function({ teamOptions, joinedRoom }) {
  return (
    <div>
      <h2 className={css.winners}>
        The Kings and Queens of
        <span className={css.logoWriting}>Collaborate</span> are...
      </h2>
      <br />
      <EndPage teamOptions={teamOptions} joinedRoom={joinedRoom} />
    </div>
  );
}
