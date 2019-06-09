import React from "react";
import phone from "./phone.png";
import css from "./PhoneIcon.module.css";

function PhoneIcon({ name }) {
  return (
    <div className={css.wrapper}>
      <img
        className={
          name.length < 5
            ? css.phone
            : name.length > 9
            ? css.phoneSideBig
            : css.phoneSideSmall
        }
        src={phone}
      />
      <p className={name.length < 9 ? css.name : css.nameBig}>{name}</p>
    </div>
  );
}
export default PhoneIcon;
