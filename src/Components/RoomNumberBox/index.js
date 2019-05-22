import React from "react";
import css from "./RoomNumberBox.module.css";

const RoomNumberBox = ({ joinedRoom }) => {
    return (
        <div className={css.roomNumber}>
            <span className={css.text}>Room Code</span>
            <span className={css.number}>{joinedRoom.id && joinedRoom.id}</span>
        </div>
    );
};

export default RoomNumberBox;
