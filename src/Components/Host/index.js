import React, { useState, useEffect } from "react";
import RoomNumberPicker from "../RoomNumberPicker";
import HostTeamJoiningBoxes from "../HostTeamJoiningBoxes";
import HostScoreBoard from "../HostScoreBoard";
import Login from "../Login";
// import ScoreBoard from "../ScoreBoard"; // branch
import css from "./host.module.css";

export default function Host({
  makeGameRoom,
  startGame,
  joinedRoom,
  deleteGameRoom,
  gameMessage,
  teamOptions,
  sendNextQuestion,
  tidbit,
  getRoundScore,
  appProps
}) {
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isTidbitShown, setIsTidbitShown] = useState(false);
  const [isItQuestionTime, setIsItQuestionTime] = useState(true);

  return (
    <>
      {" "}
      {!appProps.user ? (
        <Login appProps={appProps} />
      ) : (
        <div>
          {!hasGameStarted && (
            <>
              <h3>
                please go to 192.168.0.74:3000/join and enter room number:{" "}
                <br />
                {joinedRoom.id}
              </h3>
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
              <button
                onClick={() => {
                  getRoundScore();
                  setIsItQuestionTime(false);
                }}
              >
                show scores
              </button>
              <h1>{gameMessage}</h1>
            </>
          ) : (
            <>
              {isTidbitShown ? (
                tidbit
              ) : (
                <button onClick={() => setIsTidbitShown(true)}>FUN FACT</button>
              )}
              <HostScoreBoard
                teamOptions={teamOptions}
                joinedRoom={joinedRoom}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
