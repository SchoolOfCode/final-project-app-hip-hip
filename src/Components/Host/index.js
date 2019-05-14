import React, { useState, useEffect } from "react";
import RoomNumberPicker from "../RoomNumberPicker";
import HostTeamJoiningBoxes from "../HostTeamJoiningBoxes";
import HostScoreBoard from "../HostScoreBoard";
// import ScoreBoard from "../ScoreBoard"; // branch
import css from "./host.module.css";
import Logo from "../Branding/index";

export default function Host({
    makeGameRoom,
    startGame,
    joinedRoom,
    deleteGameRoom,
    gameMessage,
    teamOptions,
    sendNextQuestion,
    tidbit
}) {
    const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
    const [hasGameStarted, setHasGameStarted] = useState(false);
    const [isTidbitShown, setIsTidbitShown] = useState(false);
    const [isItQuestionTime, setIsItQuestionTime] = useState(true);

    return (
        <div className={css.background}>
            {!hasGameStarted && (
                <>
                    <h3>Go To</h3>
                    <h2 className={css.ipAddress}>192.168.0.74:3000/join</h2>
                    <h3>To Enter Room</h3>
                    number: <br />
                    {joinedRoom.id}
                    <h6>{gameMessage}</h6>
                </>
            )}
            <div>
                {!hasGameStarted && (
                    <>
                        {" "}
                        {hasJoinedRoom ? (
                            <button
                                className={css.makeRoom}
                                onClick={() => {
                                    setHasJoinedRoom(false);
                                    deleteGameRoom();
                                    setHasGameStarted(false);
                                }}
                            >
                                make another room
                            </button>
                        ) : (
                            <RoomNumberPicker
                                setHasJoinedRoom={setHasJoinedRoom}
                                makeGameRoom={makeGameRoom}
                            />
                        )}
                    </>
                )}

                <br />
                {!hasGameStarted ? (
                    <button
                        className={css.startGame}
                        onClick={() => {
                            startGame();
                            setHasGameStarted(true);
                            sendNextQuestion();
                        }}
                    >
                        start game
                    </button>
                ) : (
                    !isItQuestionTime && (
                        <button
                            onClick={() => {
                                sendNextQuestion();
                                setIsTidbitShown(false);
                                setIsItQuestionTime(true);
                            }}
                        >
                            send next question
                        </button>
                    )
                )}
            </div>
            {!hasGameStarted ? (
                <HostTeamJoiningBoxes
                    teamOptions={teamOptions}
                    joinedRoom={joinedRoom}
                />
            ) : isItQuestionTime ? (
                <>
                    <button onClick={() => setIsItQuestionTime(false)}>
                        show scores
                    </button>
                    <h1>{gameMessage}</h1>
                </>
            ) : (
                <>
                    {isTidbitShown ? (
                        tidbit
                    ) : (
                        <button onClick={() => setIsTidbitShown(true)}>
                            FUN FACT
                        </button>
                    )}
                    <HostScoreBoard
                        teamOptions={teamOptions}
                        joinedRoom={joinedRoom}
                    />
                </>
            )}
        </div>
    );
}
