import React from "react";

import { storiesOf } from "@storybook/react";

import ScoreView from "./index";

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

storiesOf("Score View", module).add("Card", () => <ScoreView {...props} />);
