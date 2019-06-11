import React from "react";
import phone from "./phone.png";
import css from "./PhoneIcon.module.css";

function PhoneIcon({ name }) {
  return (
    <div className={css.wrapper}>
      <img className={css.phoneSideSmall} src={phone} />
      <p className={css.name}>{name}</p>
    </div>
  );
}
export default PhoneIcon;
