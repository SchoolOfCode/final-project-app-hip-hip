import React, { useEffect } from "react";
import HostAnswer from "../../../Components/HostAnswer";
import css from "./AnswerView.module.css";
import useAudio from "../../../Hooks/UseAudio";

export default function({ joinedRoom, gameMessage }) {
  const [playing, toggle] = useAudio(
    `${process.env.PUBLIC_URL}/music/goFindTeams.mp3`
  );
  useEffect(() => {
    toggle();
  }, []);
  return (
    <div>
      <h2 className={css.question}>{gameMessage}</h2>
      <div className={css.answerWrapper}>
        <h1 className={css.answer}>The correct answer is...</h1>
        <HostAnswer joinedRoom={joinedRoom} />
      </div>
    </div>
  );
}
