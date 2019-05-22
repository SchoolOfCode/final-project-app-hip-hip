import React from "react";
import PictureCard from "../../../Components/PictureCard";
export default function({ pictureUrl }) {
  return (
    <div>
      <PictureCard pictureUrl={pictureUrl} />
    </div>
  );
}
