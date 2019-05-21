import React, { Component } from "react";
import css from "./Keypad.module.css";

class KeyPadComponent extends Component {
  render() {
    let { result } = this.props;
    return (
      <div className={css.keypad}>
        <br />
        <button
          className={css.button}
          name="1"
          onClick={e => this.props.onClick(e.target.name)}
        >
          1
        </button>
        <button
          className={css.button}
          name="2"
          onClick={e => this.props.onClick(e.target.name)}
        >
          2
        </button>
        <button
          name="3"
          className={css.button}
          onClick={e => this.props.onClick(e.target.name)}
        >
          3
        </button>
        <br />

        <button
          name="4"
          className={css.button}
          onClick={e => this.props.onClick(e.target.name)}
        >
          4
        </button>
        <button
          name="5"
          className={css.button}
          onClick={e => this.props.onClick(e.target.name)}
        >
          5
        </button>
        <button
          name="6"
          className={css.button}
          onClick={e => this.props.onClick(e.target.name)}
        >
          6
        </button>

        <br />

        <button
          name="7"
          className={css.button}
          onClick={e => this.props.onClick(e.target.name)}
        >
          7
        </button>
        <button
          name="8"
          className={css.button}
          onClick={e => this.props.onClick(e.target.name)}
        >
          8
        </button>
        <button
          name="9"
          className={css.button}
          onClick={e => this.props.onClick(e.target.name)}
        >
          9
        </button>

        <br />

        <button
          className={css.button}
          name="CE"
          onClick={e => this.props.onClick(e.target.name)}
        >
          CE
        </button>
        <button
          name="0"
          className={css.button}
          onClick={e => this.props.onClick(e.target.name)}
        >
          0
        </button>
        <button
          className={css.button}
          name="C"
          onClick={e => this.props.onClick(e.target.name)}
        >
          ←
        </button>
        <br />
      </div>
    );
  }
}

export default KeyPadComponent;
