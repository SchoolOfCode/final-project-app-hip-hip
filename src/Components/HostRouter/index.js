import React from "react";
import { Route, Switch } from "react-router-dom";

import MakeGameRoom from "../../Views/MakeGameRoom";
import Login from "../../Components/Login";

export default function({ match, appProps, makeGameRoom }) {
  console.log(match);
  return !appProps.user ? (
    <Login appProps={appProps} />
  ) : (
    <Switch>
      <Route
        path={`${match.url}/makeroom`}
        render={() => <MakeGameRoom makeGameRoom={makeGameRoom} />}
      />
      <Route
        path={`${match.url}/124`}
        render={() => <div>i am a 124 route</div>}
      />
      <Route exact path={match.url} render={() => <div>i am a route</div>} />
      <Route render={() => <div>componet not found...</div>} />
    </Switch>
  );
}
