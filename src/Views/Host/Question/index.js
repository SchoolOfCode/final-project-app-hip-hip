import React from "react";

export default function({ gameMessage, serverCounter }) {
  return (
    <div>
      <h1>{gameMessage}</h1>
      <h2>{serverCounter}</h2>
    </div>
  );
}
