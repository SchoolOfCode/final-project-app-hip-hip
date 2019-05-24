import React from "react";

import { storiesOf } from "@storybook/react";

import HostScoreBoard from "./index";

const props = {
  joinedRoom: {
    id: 1234,
    scoresTotal: {
      team1: 110,
      team2: 11000,
      team3: 50,
      team4: 11111100000
    }
  },
  teamOptions: ["team1", "team2", "team3", "team4"]
};

storiesOf("host score board", module).add("Card", () => (
  <HostScoreBoard {...props} />
));
