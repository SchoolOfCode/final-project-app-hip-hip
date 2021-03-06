import React from "react";

import { storiesOf } from "@storybook/react";

import ScoreBoard from "./index";

const props = {
  joinedRoom: {
    id: 1234,
    scoresTotal: {
      red: 110,
      blue: 11000,
      yellow: 50,
      lime: 11111100000
    }
  },
  teamOptions: ["red", "blue", "yellow", "lime"]
};

storiesOf("Scoreboard", module).add("Card", () => <ScoreBoard {...props} />);
