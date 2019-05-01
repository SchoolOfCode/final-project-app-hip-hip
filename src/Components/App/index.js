import React, { useEffect } from "react";
import openSocket from "socket.io-client";

import Button from "../Button";
const socket = openSocket("192.168.0.74:6000");

function App() {
    useEffect(() => {
        socket.emit(`makeGameRoom`);
    }, []);

    return (
        <>
            <Button />
        </>
    );
}

export default App;
