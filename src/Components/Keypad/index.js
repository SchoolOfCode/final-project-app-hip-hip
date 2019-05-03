import React, { Component } from "react";
import KeypadImput from "../KeypadImput";

class Keypad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ""
    };
  }

  onClick = button => {
    if (button === "CE") {
      this.reset();
    } else if (button === "C") {
      this.backspace();
    } else {
      this.props.roomInput.length < 4 &&
        this.props.setRoomInput(this.props.roomInput + button);
    }
  };

  reset = () => {
    this.props.setRoomInput("");
  };

  backspace = () => {
    this.props.setRoomInput(this.props.roomInput.slice(0, -1));
  };
  render() {
    return (
      <div>
        <KeypadImput onClick={this.onClick} result={this.props.roomInput} />
      </div>
    );
  }
}

export default Keypad;
