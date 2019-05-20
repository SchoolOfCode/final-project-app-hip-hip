import React from "react";
import css from "./CountDownTimer.module.css";

const Timer = props => {
  return (
    <div className={css.counter} style={{ counter }}>
      {props.counter}
    </div>
  );
};

export default Timer;
