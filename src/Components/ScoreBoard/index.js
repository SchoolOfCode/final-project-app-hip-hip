import React from "react";
import "./ScoreBoard.css";

export default function ScoreBoard({ teamOptions, joinedRoom }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Team 1</td>
            <td>121</td>
          </tr>
          <tr>
            <td>Team 2</td>
            <td>112</td>
          </tr>
          <tr>
            <td>Team 3</td>
            <td>86</td>
          </tr>
          <tr>
            <td>Team 4</td>
            <td>48</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

{
  /* <div>
  {teamOptions.map((color, i) => (
    <div
      key={i}
      style={{ backgroundColor: color }}
      className={css.gridItem}
    >
      <h3>{color}</h3>
      <p>{joinedRoom.roundScores[color]}</p>
    </div>
  ))}
</div> */
}
