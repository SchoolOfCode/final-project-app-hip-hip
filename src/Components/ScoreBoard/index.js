import React from "react";
import posed from "react-pose";
import "../css/index.css";

const Box = posed.div({
  draggable: "x",
  dragBounds: { left: "0%", right: "1000%" }
});

// const Box = posed.div({
//   left: { x: -100 },
//   right: { x: 100 }
// });

export default function ScoreBoard({ score }) {
  return (
    <div>
      {/* <header>SCORE PAGE TEST</header> */}
      <Box className="box" score={score}>
        ben
      </Box>
      <Box className="box" score={score} />
      <Box className="box" score={score} />
      <Box className="box" score={score} />
    </div>
  );
}
