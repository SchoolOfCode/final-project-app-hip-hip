import React from "react";
import KeypadImput from "../KeypadImput";

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

  return (
    <div>
      <KeypadImput onClick={onClick} result={props.roomInput} />
    </div>
  );
}

export default Keypad;
