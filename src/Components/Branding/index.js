import React from "react";
import css from "./branding.module.css";
import bot from "../images/bot.png";

const Logo = () => {
    return (
        <>
            <img
                className={(css.bot = " " + css.botAfter)}
                src={bot}
                alt="bot"
            />
            <div className={css.container}>
                <span className={css.C + " " + css.letter}>C</span>
                <span className={css.O + " " + css.letter}>O</span>
                <span className={css.L + " " + css.letter}>L</span>
                <span className={css.L + " " + css.letter}>L</span>
                <span className={css.A + " " + css.letter}>A</span>
                <span className={css.B + " " + css.letter}>B</span>
                <span className={css.O + " " + css.letter}>O</span>
                <span className={css.R + " " + css.letter}>R</span>
                <span className={css.A + " " + css.letter}>A</span>
                <span className={css.T + " " + css.letter}>T</span>
                <span className={css.E + " " + css.letter}>E</span>
            </div>
        </>
    );
};

export default Logo;
