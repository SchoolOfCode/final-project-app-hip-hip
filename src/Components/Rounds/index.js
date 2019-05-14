import React from "react";
import css from "../Rounds/Rounds.module.css";

const RoundCard = () => {
    // function sound(src) {
    //     this.sound = document.createElement("audio");
    //     this.sound.src = src;
    //     this.sound.setAttribute("preload", "auto");
    //     this.sound.setAttribute("controls", "none");
    //     this.sound.style.display = "none";
    //     document.body.appendChild(this.sound);
    //     this.play = function () {
    //         this.sound.play();
    //     }
    //     this.stop = function () {
    //         this.sound.pause();
    //     }
    // }

    return (
        <div className={css.cardContainer}>
            <h2 className={css.roundName}>Round</h2>
            <h1 className={css.roundNumber}>2</h1>
            <h2 className={css.roundMessage}>How far???</h2>
        </div>
    );
};

export default RoundCard;
