import React, { useEffect } from "react";
import ScoreBoard from "../../../Components/ScoreBoard/index";
import css from "./ScoreView.module.css";
import useAudio from "../../../Hooks/UseAudio";
import bot2 from "../../../Components/images/bot2.png";

// import HostScoreBoard from "../../../Components/HostScoreBoard";

export default function({ joinedRoom }) {
  const [playing, toggle] = useAudio(`${process.env.PUBLIC_URL}/winner.mp3`);


    useEffect(() => {
        toggle();
    }, []);


    return (
        <div>
            <img
                className={(css.bot2 = " " + css.botAfter)}
                src={bot2}
                alt="bot2"
            />
            <div className={css.container}>
                <span className={css.T + " " + css.letter}>T</span>
                <span className={css.H + " " + css.letter}>H</span>
                <span className={css.E + " " + css.letter}>E</span>
                <span className={css.space + " " + css.letter}>_</span>
                <span className={css.S + " " + css.letter}>S</span>
                <span className={css.C + " " + css.letter}>C</span>
                <span className={css.O + " " + css.letter}>O</span>
                <span className={css.R + " " + css.letter}>R</span>
                <span className={css.E + " " + css.letter}>E</span>
                <span className={css.S + " " + css.letter}>S</span>
            </div>
            <ScoreBoard joinedRoom={joinedRoom} />
        </div>
    );

}
