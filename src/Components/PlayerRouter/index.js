import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../../Components/Login";
import EnterRoom from "../../Components/EnterRoom";
import JoinTeam from "../..//Components/JoinTeam";

export default function({
  match,
  appProps,
  enterGameRoom,
  roomInput,
  setRoomInput,
  joinTeam,
  teamOptions
}) {
  return !appProps.user ? (
    <Login appProps={appProps} />
  ) : (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={() => (
          <EnterRoom
            enterGameRoom={enterGameRoom}
            roomInput={roomInput}
            setRoomInput={setRoomInput}
          />
        )}
      />
      <Route
        path={`${match.url}/team`}
        render={() => (
          <JoinTeam joinTeam={joinTeam} teamOptions={teamOptions} />
        )}
      />
      <Route render={() => <div>component not found...</div>} />
    </Switch>
  );
}
