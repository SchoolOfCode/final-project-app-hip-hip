import React from "react";
import KeypadImput from "../KeypadImput";
import css from "./Keypad.module.css";

function Keypad(props) {
  function onClick(button) {
    if (button === "CE") {
      reset();
    } else if (button === "C") {
      backspace();
    } else {
      props.roomInput.length < 4 &&
        props.setRoomInput(props.roomInput + button);
    }
  }

  function reset() {
    props.setRoomInput("");
  }

  function backspace() {
    props.setRoomInput(props.roomInput.slice(0, -1));
  }

  function handleChange(e) {
    e.persist();
    if (e.nativeEvent.inputType === "deleteContentBackward") {
      backspace();
    } else if (props.roomInput.length < 4) {
      props.setRoomInput(e.target.value);
    }
  }

  return (
    <div>
      <input
        className={css.result}
        type="number"
        value={props.roomInput}
        onChange={handleChange}
      />
      <KeypadImput onClick={onClick} result={props.roomInput} />
    </div>
  );
}

export default Keypad;
