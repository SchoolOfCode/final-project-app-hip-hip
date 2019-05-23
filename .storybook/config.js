import { configure } from "@storybook/react";

// const req = require.context("../src/Components", true, /\.stories\.js$/);
const req = require.context("../src/Views", true, /\.stories\.js$/);

function loadStories() {
  // req.keys().forEach(filename => req(filename));
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
