import React from "react";
import EndPage from "../../../Components/EndPage";
import css from "./EndPage.module.css";

export default function({ joinedRoom }) {
    return (
        <div>
            <h2 className={css.title}>
                The Kings and Queens of
                <span>Collaborate</span> are...
            </h2>
            <br />
            <EndPage joinedRoom={joinedRoom} />
        </div>
    );
}
