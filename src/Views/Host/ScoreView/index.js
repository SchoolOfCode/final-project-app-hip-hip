import React, { useEffect } from "react";
import ScoreBoard from "../../../Components/ScoreBoard/index";
import css from "./ScoreView.module.css";
import useAudio from "../../../Hooks/UseAudio";

// import HostScoreBoard from "../../../Components/HostScoreBoard";
export default function({ teamOptions, joinedRoom }) {
  const [playing, toggle] = useAudio(`${process.env.PUBLIC_URL}/winner.mp3`);

  useEffect(() => {
    toggle();
  }, []);

  return (
    <div>
      <h1 className={css.title}>The Scores...</h1>
      <ScoreBoard teamOptions={teamOptions} joinedRoom={joinedRoom} />
    </div>
  );
}
