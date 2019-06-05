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
// import RoomNumberBox from "../../Components/RoomNumberBox";

export default function(props) {
    console.log(props.match);

    return !props.appProps.user ? (
        <Login appProps={props.appProps} />
    ) : (
        <div>
            <Switch>
                <Route
                    path={`${props.match.url}/makeroom`}
                    render={() => <MakeGameRoom {...props} />}
                />
                <Route
                    path={`${props.match.url}/teams`}
                    render={() => <ListOfPlayersJoiningRoom {...props} />}
                />
                <Route
                    path={`${props.match.url}/roundcard`}
                    render={() => <RoundCard {...props} />}
                />

                <Route
                    path={`${props.match.url}/question`}
                    render={() => <Question {...props} />}
                />

                <Route
                    path={`${props.match.url}/answer`}
                    render={() => <AnswerView {...props} />}
                />
                <Route
                    path={`${props.match.url}/pictureanswer`}
                    render={() => <PictureAnswerView {...props} />}
                />

                <Route
                    path={`${props.match.url}/score`}
                    render={() => <ScoreView {...props} />}
                />
                <Route
                    path={`${props.match.url}/endpage`}
                    render={() => <EndPageView {...props} />}
                />

                <Route render={() => <div>component not found...</div>} />
            </Switch>

            {/* {props.match.path !== "/host/makeroom" && (
                <RoomNumberBox {...props} />
            )} */}
            {/* <button onClick={props.pauseGame}>pause</button> */}
        </div>
    );
}
