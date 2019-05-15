import React, { useState, useEffect } from "react";
import RoomNumberPicker from "../RoomNumberPicker";
import HostTeamJoiningBoxes from "../HostTeamJoiningBoxes";
import HostScoreBoard from "../HostScoreBoard";
import Login from "../Login";
// import ScoreBoard from "../ScoreBoard"; // branch
import css from "./host.module.css";
import CorrelateLogo from "../Branding/index";

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
  appProps,
  DeleteTeamMember
}) {
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isTidbitShown, setIsTidbitShown] = useState(false);
  const [isItQuestionTime, setIsItQuestionTime] = useState(true);
  const [isGameReadyToStart, setIsGameReadyToStart] = useState(false);

  return (
    <>
      {" "}
      {!appProps.user ? (
        <Login appProps={appProps} />
      ) : (
        <div>
          <CorrelateLogo />
          {!hasGameStarted && (
            <>
              <h3> Your room number is:</h3>
              <h1>{joinedRoom.id}</h1>
              <h6>{gameMessage}</h6>
            </>
          )}
          <div>
            {!hasGameStarted && (
              <>
                {" "}
                {hasJoinedRoom ? (
                  <button
                    onClick={() => {
                      setHasJoinedRoom(false);
                      deleteGameRoom();
                      setHasGameStarted(false);
                      setIsGameReadyToStart(false);
                    }}
                  >
                    make another room
                  </button>
                ) : (
                  <RoomNumberPicker
                    setHasJoinedRoom={setHasJoinedRoom}
                    makeGameRoom={makeGameRoom}
                    setIsGameReadyToStart={setIsGameReadyToStart}
                  />
                )}
              </>
            )}
          </div>
          {!hasGameStarted ? (
            <HostTeamJoiningBoxes
              teamOptions={teamOptions}
              joinedRoom={joinedRoom}
              DeleteTeamMember={DeleteTeamMember}
            />
          ) : isItQuestionTime ? (
            <>
              <button
                className={css.startGame}
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
              {/* {isTidbitShown ? (
                tidbit
              ) : (
                <button onClick={() => setIsTidbitShown(true)}>FUN FACT</button>
              )} */}
              <HostScoreBoard
                teamOptions={teamOptions}
                joinedRoom={joinedRoom}
              />
            </>
          )}

          {!hasGameStarted
            ? isGameReadyToStart && (
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
              )
            : !isItQuestionTime && (
                <button
                  className={css.startGame}
                  onClick={() => {
                    sendNextQuestion();
                    setIsTidbitShown(false);
                    setIsItQuestionTime(true);
                  }}
                >
                  send next question
                </button>
              )}
        </div>
      )}
    </>
  );
}
