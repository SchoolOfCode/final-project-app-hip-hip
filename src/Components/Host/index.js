import React, { useState, useEffect } from "react";
import RoomNumberPicker from "../RoomNumberPicker";
import HostTeamJoiningBoxes from "../HostTeamJoiningBoxes";
import HostScoreBoard from "../HostScoreBoard";
import Login from "../Login";
// import ScoreBoard from "../ScoreBoard"; // branch
import css from "./host.module.css";
import CorrelateLogo from "../Branding/index";
import QuestionHostCard from "../QuestionHostCard";

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

  getCurrentScore,
  appProps,
  teamsThatHaveSubmitted,
  setTeamsThatHaveSubmitted

}) {
  const [hasMadeRoom, setHasMadeRoom] = useState(false);
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
          {!hasGameStarted && <CorrelateLogo />}
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
                {!hasMadeRoom && (
                  <RoomNumberPicker
                    setHasMadeRoom={setHasMadeRoom}
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
              <QuestionHostCard
                setTeamsThatHaveSubmitted={setTeamsThatHaveSubmitted}
                getCurrentScore={getCurrentScore}
                setIsItQuestionTime={setIsItQuestionTime}
                gameMessage={gameMessage}
              />
              <ol>
                {teamsThatHaveSubmitted.map((team, i) => (
                  <li key={i}>{team} has answered</li>
                ))}
              </ol>
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
                  className={css.showScores}
                  onClick={() => {
                    sendNextQuestion();
                    setIsTidbitShown(false);
                    setIsItQuestionTime(true);
                  }}
                >
                  send next question
                </button>
              )}
          <br />
          {hasMadeRoom && (
            <button
              onClick={() => {
                setHasMadeRoom(false);
                deleteGameRoom();
                setHasGameStarted(false);
                setIsGameReadyToStart(false);
              }}
            >
              make another room
            </button>
          )}
          {appProps.user && (
            <button onClick={appProps.signOut}>sign out</button>
          )}
        </div>
      )}
    </>
  );
}
