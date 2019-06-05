import React, { useState, useEffect } from "react";

import openSocket from "socket.io-client";
import initialState from "../../Routes/App/initialState";

let socket = openSocket(process.env.REACT_APP_SERVER_URL);

export default function useGame(props) {
    const [roomInput, setRoomInput] = useState("");
    const [nameInput, setNameInput] = useState("");

    const [joinedRoom, setJoinedRoom] = useState({});
    const [gameMessage, setGameMessage] = useState("");
    const [teamOptions, setTeamOptions] = useState([]);

    const [teamColor, setTeamColor] = useState("orange");
    const [card, setCard] = useState({ gotCard: false });
    const [liveCardUpdates, setliveCardUpdates] = useState(
        initialState.liveCardUpdates
    );
    const [tidbit, setTidbit] = useState("");
    const [isSubmitAllowed, setIsSubmitAllowed] = useState(false);
    const [teamMessage, setTeamMessage] = useState("");
    const [teamsThatHaveSubmitted, setTeamsThatHaveSubmitted] = useState([]);
    const [hasJoinedTeam, setHasJoinedTeam] = useState(false);
    const [serverCounter, setServerCounter] = useState({
        question: 0,
        round: 0
    });
    const [roundNumber, setRoundNumber] = useState(0);
    const [answerFeedback, setAnswerFeedback] = useState(
        initialState.answerColors
    );
    const [showPoints, setShowPoints] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [pictureUrl, setPictureUrl] = useState("");
    const [pictureAnswer, setPictureAnswer] = useState("");
    const [isTeamCaptain, setIsTeamCaptain] = useState(false);

    useEffect(() => {
        socket.on("roomNumber", number => {
            setRoomInput(number);
        });
        socket.on("pictureAnswerNav", ({ path, message, url }) => {
            setGameMessage(message);
            setPictureUrl(url);
            controlRouteFromServer(path);
        });
        socket.on("teamCaptain", () => {
            setIsTeamCaptain(true);
        });
        // socket.on("livePictureAnswer", text => {
        // 	setPictureAnswer(text);
        // });
        socket.on("answerFeedback", data => {
            setAnswerFeedback(data.feedback);
            setShowPoints(true);
        });
        socket.on("pictureAnswerFeedback", message => setGameMessage(message));
        socket.on("pageNavigation", path => controlRouteFromServer(path));
        socket.on("roundHasFinished", ({ message }) => {
            controlRouteFromServer("/play/score");
            setGameMessage(message);
        });
        socket.on("messageAndNav", data => {
            console.log("message and nav", data.message);
            if (data.message) {
                setGameMessage(data.message);
            }

            if (data.roundNumber) {
                setRoundNumber(data.roundNumber);
            }
            controlRouteFromServer(data.path);
            setTeamsThatHaveSubmitted([]);
        });

        socket.on("whoAreYou", () => {
            console.log("who am i?");
            if (props.firebaseAppAuth.currentUser) {
                socket.emit("login", props.firebaseAppAuth.currentUser.uid);
                console.log("logged in");
            } else {
                socket.emit("notGotIdYet");
                console.log(props.firebaseAppAuth.currentUser);
                console.log("not logged in yet");
            }
        });
        socket.on("rejoinMidGame", () => {
            setHasJoinedTeam(true);
        });
        socket.on("makeGameRoom", data => {
            console.log("new Game Room: ", data);
            setJoinedRoom(data);
            let options = Object.keys(data.teams);
            setTeamOptions(options);
            controlRouteFromServer("/host/teams");
        });

        socket.on("enterGameRoom", data => {
            console.log("Entered Room", data);
            let options = Object.keys(data.teams);
            setTeamOptions(options);
            setJoinedRoom(data);
            controlRouteFromServer("/play/team");
        });
        socket.on("updateHostRoom", room => {
            setJoinedRoom(room);
        });
        socket.on("gameMessage", message => {
            setGameMessage(message);
        });
        socket.on("teamColor", color => {
            // controlRouteFromServer("/play/holding");
            setTeamColor(color);
        });
        socket.on("cardMessage", serverCard => {
            setCard({ gotCard: true, ...serverCard });
            setIsSubmitAllowed(true);
            setliveCardUpdates(initialState.liveCardUpdates);
            setAnswerFeedback(initialState.answerColors);
            setShowPoints(false);
            controlRouteFromServer("/play/card");
            console.log(serverCard);
        });
        socket.on("pictureMessage", ({ url }) => {
            setIsSubmitAllowed(true);
            setPictureUrl(url);
            setGameMessage("");
            setPictureAnswer("");
            controlRouteFromServer("/play/picture");
        });
        socket.on("updateCardOptions", cards => {
            if (cards) {
                setliveCardUpdates(cards);
            }
        });
        socket.on("tidbit", bit => setTidbit(bit));
        socket.on("scoreMessage", score => console.log("scoreMessage", score));
        // socket.on("submitAllowed", boolean => setIsSubmitAllowed(boolean));
        socket.on("scoreUpdateMessage", message => setTeamMessage(message));
        socket.on("liveTeamSubmitUpdate", teams =>
            setTeamsThatHaveSubmitted(teams)
        );
        socket.on("updateCounter", count =>
            setServerCounter({ ...serverCounter, ...count })
        );
    }, []);

    useEffect(() => {
        if (props.firebaseAppAuth.currentUser) {
            socket.emit("login", props.firebaseAppAuth.currentUser.uid);
            console.log("logged in");
        } else {
            socket.emit("notGotIdYet");
            console.log(props.firebaseAppAuth.currentUser);
            console.log("not logged in yet");
        }
    }, []);
    function pauseGame() {
        socket.emit("pauseGame");
    }

    function getCurrentScore() {
        socket.emit("getCurrentScore", joinedRoom.id);
    }

    function makeGameRoom() {
        socket.emit("makeGameRoom", {
            uid: props.firebaseAppAuth.currentUser.uid
        });
    }
    function enterGameRoom() {
        socket.emit("enterGameRoom", {
            roomId: roomInput,
            uid: props.firebaseAppAuth.currentUser.uid,
            name: nameInput
        });
    }

    function joinTeam(team, name) {
        socket.emit("joinTeam", {
            roomId: joinedRoom.id,
            team,
            name,
            uid: props.firebaseAppAuth.currentUser.uid
        });
    }

    function startGame() {
        console.log("startgame message sent");
        socket.emit("startGame", joinedRoom.id);
    }

    function sendNextQuestion() {
        socket.emit("sendNextQuestion", joinedRoom.id);
    }

    function deleteGameRoom() {
        socket.emit("deleteGameRoom", joinedRoom.id);
        setJoinedRoom({});
        setTeamOptions([]);
        controlRouteFromServer("/host/makeroom");
    }

    function sendAnswerToServer(answerNumber) {
        socket.emit("sendAnswer", {
            roomId: roomInput,
            team: teamColor,
            playersAnswer: answerNumber,
            correctAnswer: card.order
        });
    }

    function submitTeamAnswer() {
        socket.emit("submitTeamAnswer", {
            roomId: roomInput,
            team: teamColor
        });
    }

    function submitPictureAnswer() {
        socket.emit("submitPictureAnswer", {
            roomId: roomInput,
            team: teamColor,
            answer: pictureAnswer
        });
    }

    function sendliveCardUpdates(answer, card) {
        socket.emit("updateCardOptions", {
            answer,
            cardText: card.text,
            correctAnswer: card.order,
            roomId: roomInput,
            team: teamColor
        });
    }

    function deleteTeamMember(i, team) {
        socket.emit("removeUser", {
            roomId: joinedRoom.id,
            team,
            uid: props.firebaseAppAuth.currentUser.uid,
            i
        });
    }

    function controlRouteFromServer(path) {
        try {
            props.history.push(path);
        } catch (err) {
            console.log(err);
        }
    }

    function abortGame() {
        socket.emit("abort", joinedRoom.id);
    }

    function toggle() {
        setIsShow(!isShow);
    }

    function sendLivePictureAnswer(text) {
        // socket.emit("livePictureAnswer", {
        // 	text,
        // 	roomId: joinedRoom.id,
        // 	team: teamColor
        // });
        setPictureAnswer(text.toUpperCase());
    }

    return [
        {
            joinedRoom,
            gameMessage,
            teamOptions,
            teamColor,
            card,
            liveCardUpdates,
            tidbit,
            isSubmitAllowed,
            teamMessage,
            teamsThatHaveSubmitted,
            hasJoinedTeam,
            serverCounter,
            roundNumber,
            answerFeedback,
            showPoints,
            isShow,
            pictureUrl,
            pictureAnswer,
            roomInput,
            nameInput,
            isTeamCaptain
        },
        {
            setRoomInput,
            getCurrentScore,
            makeGameRoom,
            enterGameRoom,
            joinTeam,
            startGame,
            sendNextQuestion,
            deleteGameRoom,
            sendAnswerToServer,
            submitTeamAnswer,
            sendliveCardUpdates,
            deleteTeamMember,
            controlRouteFromServer,
            abortGame,
            toggle,
            sendLivePictureAnswer,
            setNameInput,
            setIsTeamCaptain,
            pauseGame,
            submitPictureAnswer,
            setIsSubmitAllowed
        }
    ];
}
