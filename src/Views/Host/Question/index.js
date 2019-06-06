import React, { useEffect } from "react";

import Timer from "../../../Components/CountdownTimer";
import useAudio from "../../../Hooks/UseAudio";
import css from "./Question.module.css";
import bot2 from "../../../Components/images/bot2.png";

export default function({
    gameMessage,
    serverCounter,
    teamsThatHaveSubmitted
}) {
    const [playing, toggle] = useAudio(
        `${process.env.PUBLIC_URL}/question.mp3`
    );

    useEffect(() => {
        toggle();
    }, []);

    return (
        <div>
            <img
                className={(css.bot2 = " " + css.bot2After)}
                src={bot2}
                alt="bot2"
            />
            <h1 className={css.question}>{gameMessage}</h1>
            {serverCounter.question === 0 ? (
                <>
                    <h2 className={css.letsCollaborate}>LET'S COLLABORATE!</h2>
                    <Timer counter={serverCounter.round} />
                </>
            ) : (
                <h2> {serverCounter.question}</h2>
            )}

            <ol>
                {teamsThatHaveSubmitted.map((team, i) => (
                    <li key={i}>{team}</li>
                ))}
            </ol>
        </div>
    );
}
