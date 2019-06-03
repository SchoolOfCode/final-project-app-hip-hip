import React from "react";
import { Route, Switch } from "react-router-dom";

import MakeGameRoom from "../../Views/Host/MakeGameRoom";
import PopulateTeams from "../../Views/Host/PopulateTeams";
import Question from "../../Views/Host/Question";
import RoundCard from "../../Views/Host/RoundCard";
import ScoreView from "../../Views/Host/ScoreView";
import AnswerView from "../../Views/Host/AnswerView";
import EndPageView from "../../Views/Host/EndPage";
import ListOfPlayersJoiningRoom from "../../Views/Host/ListOfPlayersJoiningRoom";
import PictureAnswerView from "../../Views/Host/PictureAnswerView";

import Login from "../../Components/Login";
import RoomNumberBox from "../../Components/RoomNumberBox";

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
	serverCounter,
	roundNumber,
	teamsThatHaveSubmitted,
	pauseGame,
	pictureUrl
}) {
	console.log(match);

	return !appProps.user ? (
		<Login appProps={appProps} />
	) : (
		<div>
			<Switch>
				<Route
					path={`${match.url}/makeroom`}
					render={() => <MakeGameRoom makeGameRoom={makeGameRoom} />}
				/>
				{/* <Route
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
				/> */}
				<Route
					path={`${match.url}/teams`}
					render={() => (
						<ListOfPlayersJoiningRoom
							startGame={startGame}
							teamOptions={teamOptions}
							joinedRoom={joinedRoom}
							deleteTeamMember={deleteTeamMember}
							deleteGameRoom={deleteGameRoom}
						/>
					)}
				/>
				<Route
					path={`${match.url}/roundcard`}
					render={() => (
						<RoundCard roundNumber={roundNumber} gameMessage={gameMessage} />
					)}
				/>

				<Route
					path={`${match.url}/question`}
					render={() => (
						<Question
							gameMessage={gameMessage}
							serverCounter={serverCounter}
							teamsThatHaveSubmitted={teamsThatHaveSubmitted}
						/>
					)}
				/>

				<Route
					path={`${match.url}/answer`}
					render={() => (
						<AnswerView joinedRoom={joinedRoom} gameMessage={gameMessage} />
					)}
				/>
				<Route
					path={`${match.url}/pictureanswer`}
					render={() => (
						<PictureAnswerView
							joinedRoom={joinedRoom}
							gameMessage={gameMessage}
							pictureUrl={pictureUrl}
						/>
					)}
				/>

				<Route
					path={`${match.url}/score`}
					render={() => (
						<ScoreView teamOptions={teamOptions} joinedRoom={joinedRoom} />
					)}
				/>
				<Route
					path={`${match.url}/endpage`}
					render={() => (
						<EndPageView teamOptions={teamOptions} joinedRoom={joinedRoom} />
					)}
				/>

				<Route render={() => <div>component not found...</div>} />
			</Switch>
			{match.path !== "/host/makeroom" && (
				<RoomNumberBox joinedRoom={joinedRoom} />
			)}
			<button onClick={pauseGame}>pause</button>
		</div>
	);
}
