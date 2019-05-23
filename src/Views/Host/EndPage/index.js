import React from "react";
import EndPageScoreboard from "../../../Components/EndPageScoreBoard";
import EndPageNavButtons from "../../../Components/EndPageNavButtons";

export default function({ teamOptions, joinedRoom }) {
  return (
    <>
      <div>
        <h2 className={css.winners}>
          The Kings and Queens of
          <span className={css.logoWriting}>Collaborate</span> are...
        </h2>
        <br />
        <EndPageScoreBoard teamOptions={teamOptions} joinedRoom={joinedRoom} />
      </div>
      <EndPageNavButtons />
    </>
  );
}
