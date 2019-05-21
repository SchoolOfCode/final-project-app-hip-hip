import React from "react";
import css from "./RoomNumberBox.module.css";

const RoomNumberBox = props => {
  return (
    <div className={css.roomNumber}>
      <span className={css.text}>Room</span>
      <span className={css.number}>{props.joinedRoom}</span>
    </div>
  );
};

export default RoomNumberBox;
