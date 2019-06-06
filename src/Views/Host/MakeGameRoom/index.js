import React from "react";

import CorrelateLogo from "../../../Components/Branding";
import css from "./MakeGameRoom.module.css";

export default function({ makeGameRoom }) {
  return (
    <div>
      <div className={css.logo}>
        <CorrelateLogo />
      </div>
      <br />
      <button className={css.gameButton} onClick={makeGameRoom}>
        Create A Game Room
      </button>
    </div>
  );
}
