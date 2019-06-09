import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../../Components/Login";
import EnterRoomView from "../../Views/Player/EnterRoomView";

import Holding from "../../Views/Player/HoldingPageView";
import CardView from "../../Views/Player/CardView";
import PlayerScoreView from "../../Views/Player/PlayerScore";
import PictureRoundView from "../../Views/Player/PictureRoundView";
import RoundView from "../../Views/Player/RoundView";
import GameMessageView from "../../Views/Player/GameMessageView";
import FindTeamMates from "../../Views/Player/FindTeamMates";

export default function(props) {
	return !props.appProps.user ? (
		<Login appProps={props.appProps} />
	) : (
		<Switch>
			<Route
				exact
				path={`${props.match.url}`}
				render={() => <EnterRoomView {...props} />}
			/>
			<Route
				path={`${props.match.url}/holding`}
				render={() => <Holding {...props} />}
			/>
			<Route
				path={`${props.match.url}/card`}
				render={() => <CardView {...props} />}
			/>
			<Route
				path={`${props.match.url}/score`}
				render={() => <PlayerScoreView {...props} />}
			/>
			<Route
				path={`${props.match.url}/picture`}
				render={() => <PictureRoundView {...props} />}
			/>
			<Route
				path={`${props.match.url}/round`}
				render={() => <RoundView {...props} />}
			/>
			<Route
				path={`${props.match.url}/message`}
				render={() => <GameMessageView {...props} />}
			/>
			<Route
				path={`${props.match.url}/findteam`}
				render={() => <FindTeamMates {...props} />}
			/>

			<Route render={() => <div>component not found...</div>} />
		</Switch>
	);
}
