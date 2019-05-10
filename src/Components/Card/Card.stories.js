import React from "react";

import { storiesOf } from "@storybook/react";

import Card from "./index";

storiesOf("Card", module).add("Card", () => (
  <Card
    card={{ text: "question" }}
    sendAnswerToServer={() => console.log("poop")}
    hasAnswered={true}
    hasSubmitted={true}
    isAnswerAlreadySubmitted={{ 1: true, 2: false, 3: false, 4: false }}
  />
));
