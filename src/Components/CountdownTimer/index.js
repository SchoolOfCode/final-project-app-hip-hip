import React from "react";
import css from "./CountDownTimer.module.css";

const Timer = props => {
  return <div className={css.counter}>{props.counter}</div>;
};

export default Timer;
