import React, { useState } from "react";
import css from "./roomnumberpicker.module.css";

export default function({
    makeGameRoom,
    setHasMadeRoom,
    setIsGameReadyToStart
}) {
    const [numberOfTeams, setNumberOfTeams] = useState(1);

    function changeNumberOfTeams(num) {
        if (num === 1) {
            if (numberOfTeams < 4) {
                setNumberOfTeams(numberOfTeams + num);
            }
        } else {
            if (numberOfTeams > 1) {
                setNumberOfTeams(numberOfTeams + num);
            }
        }
    }

    return (
        <>
            <div className={css.buttonContainer}>
                <button
                    className={css.chooseNumberOfTeamsLess}
                    onClick={() => {
                        changeNumberOfTeams(-1);
                    }}
                >
                    -
                </button>
                <button
                    className={css.chooseNumberOfTeams}
                    onClick={() => {
                        makeGameRoom(numberOfTeams);
                        setHasMadeRoom(true);
                        setIsGameReadyToStart(true);
                    }}
                >
                    Make room with {numberOfTeams} teams
                </button>
                <button
                    className={css.chooseNumberOfTeamsMore}
                    onClick={() => {
                        changeNumberOfTeams(1);
                    }}
                >
                    +
                </button>
            </div>
        </>
    );
}
