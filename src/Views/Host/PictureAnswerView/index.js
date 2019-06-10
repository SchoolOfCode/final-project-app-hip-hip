import React from "react";
import useAudio from "../../../Hooks/UseAudio";

import css from "./PictureAnswerView.module.css";

export default function({ joinedRoom, gameMessage, pictureUrl }) {
  const [playing, toggle] = useAudio(
    `${process.env.PUBLIC_URL}/music/goFindTeams.mp3`
  );
  useEffect(() => {
    toggle();
  }, []);
  return (
    <div>
      <h2 className={css.question}>{gameMessage}</h2>

      <img className={css.picture} src={pictureUrl} alt="not telling..." />
    </div>
  );
}
