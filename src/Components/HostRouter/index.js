import React from "react";
import { Route, Switch } from "react-router-dom";

import MakeGameRoom from "../../Views/Host/MakeGameRoom";
import PopulateTeams from "../../Views/Host/PopulateTeams";
import Question from "../..//Views/Host/Question";
import RoundCard from "../..//Views/Host/RoundCard";

import Login from "../../Components/Login";

export default function({
    match,
    appProps,
    makeGameRoom,
    teamOptions,
    joinedRoom,
    deleteTeamMember,
    deleteGameRoom,
    startGame,
    gameMessage,
    serverCounter
}) {
    return !appProps.user ? (
        <Login appProps={appProps} />
    ) : (
        <Switch>
            <Route
                path={`${match.url}/makeroom`}
                render={() => <MakeGameRoom makeGameRoom={makeGameRoom} />}
            />
            <Route
                path={`${match.url}/teams`}
                render={() => (
                    <PopulateTeams
                        startGame={startGame}
                        teamOptions={teamOptions}
                        joinedRoom={joinedRoom}
                        deleteTeamMember={deleteTeamMember}
                        deleteGameRoom={deleteGameRoom}
                    />
                )}
            />
            <RoundCard path={`${match.url}/roundcard`} />
            <Route
                path={`${match.url}/question`}
                render={() => (
                    <Question
                        gameMessage={gameMessage}
                        serverCounter={serverCounter}
                    />
                )}
            />

            <Route
                exact
                path={match.url}
                render={() => <div>i am a route</div>}
            />
            <Route render={() => <div>componet not found...</div>} />
        </Switch>
    );
}
